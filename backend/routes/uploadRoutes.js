import express from 'express';
import path from 'path';
import { put } from '@vercel/blob';
import upload from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'لم يتم رفع أي ملف' });
    }
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return res.status(500).json({ message: 'BLOB_READ_WRITE_TOKEN غير مضبوط في بيئة الخادم' });
    }

    for (const file of req.files) {
      const ext = path.extname(file.originalname).toLowerCase();
      const isVideo = file.mimetype.startsWith('video/');
      if (isVideo && !['.mp4', '.webm', '.ogg'].includes(ext)) {
        return res.status(400).json({ message: `صيغة الفيديو غير مدعومة: ${ext}. يرجى رفع ملف MP4 بترميز H.264/AAC.` });
      }
    }

    const urls = await Promise.all(
      req.files.map(async (file) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
        const blob = await put(filename, file.buffer, {
          access: 'public',
          contentType: file.mimetype,
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
        return blob.url;
      })
    );
    res.json({ urls });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: err.message || 'فشل رفع الملف' });
  }
});

export default router;
