import express from 'express';
import path from 'path';
import { put } from '@vercel/blob';
import Busboy from 'busboy';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, async (req, res) => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(500).json({ message: 'BLOB_READ_WRITE_TOKEN غير مضبوط في بيئة الخادم' });
  }

  try {
    const bb = new Busboy({ headers: req.headers, limits: { fileSize: 100 * 1024 * 1024, files: 10 } });
    const uploadedUrls = [];
    let aborted = false;

    bb.on('filesLimit', () => console.warn('[/api/upload] Busboy filesLimit reached'));
    bb.on('fieldsLimit', () => console.warn('[/api/upload] Busboy fieldsLimit reached'));
    bb.on('partsLimit', () => console.warn('[/api/upload] Busboy partsLimit reached'));

    bb.on('file', (fieldname, fileStream, filename, encoding, mimetype) => {
      if (aborted) {
        fileStream.resume();
        return;
      }

      fileStream.on('limit', () => console.warn('[/api/upload] file stream emitted limit event for', filename));

      const ext = path.extname(filename).toLowerCase();
      const isVideo = mimetype && mimetype.startsWith('video/');
      if (isVideo && !['.mp4', '.webm', '.ogg'].includes(ext)) {
        aborted = true;
        fileStream.resume();
        bb.emit('error', new Error(`صيغة الفيديو غير مدعومة: ${ext}`));
        return;
      }

      const filenameOnBlob = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;

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
