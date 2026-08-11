import express from 'express';
import { createCharityRequest, getCharityRequests, updateCharityStatus } from '../controllers/charityController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createCharityRequest)
  .get(protect, admin, getCharityRequests);

router.route('/:id')
  .put(protect, admin, updateCharityStatus);

export default router;
