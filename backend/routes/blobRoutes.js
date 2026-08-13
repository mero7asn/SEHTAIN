import express from 'express';
import path from 'path';
import { issueSignedToken, presignUrl, parseStoreIdFromPresignedUrl } from '@vercel/blob';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/presign', protect, async (req, res) => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(500).json({ message: 'BLOB_READ_WRITE_TOKEN غير مضبوط في بيئة الخادم' });
  }

  try {
    const { filename, contentType, size } = req.body || {};
    if (!filename || !contentType) {
      return res.status(400).json({ message: 'filename و contentType مطلوبان' });
    }

    const maxSize = 100 * 1024 * 1024;
    if (typeof size === 'number' && size > maxSize) {
      return res.status(413).json({ message: `حجم الملف كبير جداً. الحد الأقصى هو ${maxSize / 1024 / 1024}MB.` });
    }

    const ext = path.extname(filename).toLowerCase();
    const isVideo = contentType.startsWith('video/');
    if (isVideo && !['.mp4', '.webm', '.ogg', '.mov'].includes(ext)) {
      return res.status(400).json({ message: `صيغة الفيديو غير مدعومة: ${ext}` });
    }

    const pathname = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;

    const issued = await issueSignedToken({
      token: process.env.BLOB_READ_WRITE_TOKEN,
      pathname,
      operations: ['put'],
      validUntil: Date.now() + 10 * 60 * 1000,
      allowedContentTypes: [contentType],
      maximumSizeInBytes: maxSize,
    });

    const { presignedUrl } = await presignUrl(
      { clientSigningToken: issued.clientSigningToken, delegationToken: issued.delegationToken },
      {
        operation: 'put',
        pathname,
        access: 'public',
        validUntil: issued.validUntil,
        allowedContentTypes: [contentType],
        maximumSizeInBytes: maxSize,
        addRandomSuffix: false,
      }
    );

    const storeId = process.env.BLOB_STORE_ID || parseStoreIdFromPresignedUrl(presignedUrl);
    const blobUrl = storeId
      ? `https://${storeId}.public.blob.vercel-storage.com/${pathname}`
      : presignedUrl;

    return res.json({ presignedUrl, pathname, blobUrl });
  } catch (err) {
    console.error('[/api/blob/presign] error:', err);
    return res.status(500).json({ message: err.message || 'فشل في إنشاء رابط الرفع' });
  }
});

export default router;
