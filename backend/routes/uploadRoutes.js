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
    const urls = await Promise.all(
      req.files.map(async (file) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
        const blob = await put(filename, file.buffer, {
          access: 'public',
          contentType: file.mimetype,
        });
        return blob.url;
      })
    );
    res.json({ urls });
  } catch (err) {
    res.status(500).json({ message: err.message || 'فشل رفع الملف' });
  }
});

export default router;
