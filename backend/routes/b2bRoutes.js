import express from 'express';
import { createB2BRequest, getB2BRequests, updateB2BStatus } from '../controllers/b2bController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createB2BRequest)
  .get(protect, admin, getB2BRequests);

router.route('/:id')
  .put(protect, admin, updateB2BStatus);

export default router;
