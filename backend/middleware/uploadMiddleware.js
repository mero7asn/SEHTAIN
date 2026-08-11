import multer from 'multer';
import path from 'path';

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
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }
});

export default upload;
