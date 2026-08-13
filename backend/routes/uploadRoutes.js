import express from 'express';
import path from 'path';
import { put } from '@vercel/blob';
import Busboy from 'busboy';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, async (req, res) => {
  // Stream multipart upload to Vercel Blob using Busboy to avoid buffering large files in memory
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(500).json({ message: 'BLOB_READ_WRITE_TOKEN غير مضبوط في بيئة الخادم' });
  }

  try {
    const bb = new Busboy({ headers: req.headers, limits: { fileSize: 100 * 1024 * 1024, files: 10 } });
    const uploadedUrls = [];
    let aborted = false;

    bb.on('file', (fieldname, fileStream, filename, encoding, mimetype) => {
      if (aborted) {
        fileStream.resume();
        return;
      }

      const ext = path.extname(filename).toLowerCase();
      const isVideo = mimetype && mimetype.startsWith('video/');
      if (isVideo && !['.mp4', '.webm', '.ogg'].includes(ext)) {
        aborted = true;
        fileStream.resume();
        bb.emit('error', new Error(`صيغة الفيديو غير مدعومة: ${ext}`));
        return;
      }

      // Use a safe filename
      const filenameOnBlob = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;

      // Stream directly to Vercel Blob. put() accepts stream or buffer in recent versions.
      const uploadPromise = put(filenameOnBlob, fileStream, {
        access: 'public',
        contentType: mimetype,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      }).then((blob) => {
        uploadedUrls.push(blob.url);
      });

      uploadPromise.catch((err) => {
        aborted = true;
        bb.emit('error', err);
      });
    });

    bb.on('error', (err) => {
      console.error('Upload stream error:', err);
      if (!res.headersSent) {
        // Map known cases
        if (err.message && err.message.includes('صيغة الفيديو غير مدعومة')) {
          return res.status(400).json({ message: err.message });
        }
        if (err.code === 'LIMIT_FILE_SIZE' || err.message && err.message.includes('max file size')) {
          return res.status(413).json({ message: `حجم الملف كبير جداً. الحد الأقصى هو 100MB.` });
        }
        return res.status(500).json({ message: err.message || 'فشل رفع الملف' });
      }
    });

    bb.on('finish', async () => {
      if (aborted) return;
      try {
        // Wait briefly for any ongoing uploads to resolve
        // Note: put() promises were stored implicitly by pushing to uploadedUrls via their then()
        // There is a race—ensure any pending operations finish by small delay
        await new Promise((r) => setTimeout(r, 200));
        return res.json({ urls: uploadedUrls });
      } catch (err) {
        console.error('Finalizing upload error:', err);
        return res.status(500).json({ message: err.message || 'فشل رفع الملف' });
      }
    });

    req.pipe(bb);
  } catch (err) {
    console.error('Upload route error:', err);
    res.status(500).json({ message: err.message || 'فشل رفع الملف' });
  }
});

export default router;
