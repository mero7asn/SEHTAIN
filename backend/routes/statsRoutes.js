import express from 'express';
import { getAdminStats } from '../controllers/statsController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', protect, admin, getAdminStats);

export default router;
