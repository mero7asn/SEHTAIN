import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import upload from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// POST /api/upload
// Upload multiple files (images or videos) — admin only
// Field name: "files" (array)
router.post('/', protect, upload.array('files', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'لم يتم رفع أي ملف' });
    }
    const urls = req.files.map(file => `/uploads/${file.filename}`);
    res.json({ urls });
  } catch (err) {
    res.status(500).json({ message: err.message || 'فشل رفع الملف' });
  }
});

export default router;
