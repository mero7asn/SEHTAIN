import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedImage = /jpeg|jpg|png|gif|webp|avif/;
  const allowedVideo = /mp4|webm|ogg|mov/;
  const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
  if (allowedImage.test(ext) || allowedVideo.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('نوع الملف غير مدعوم. يُسمح فقط بالصور والفيديوهات.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB max
});

export default upload;
