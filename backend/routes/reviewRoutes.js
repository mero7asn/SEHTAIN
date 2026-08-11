import express from 'express';
import { createReview, getReviews, getAllReviewsAdmin, updateReviewStatus, deleteReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createReview)
  .get(getReviews);

router.route('/all')
  .get(protect, admin, getAllReviewsAdmin);

router.route('/:id')
  .put(protect, admin, updateReviewStatus)
  .delete(protect, admin, deleteReview);

export default router;

