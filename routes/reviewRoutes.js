// routes/reviewRoutes.js
import express from 'express';
import {
  addReview,
  getReviewsByGig,
  getReviewsByUser
} from '../controllers/reviewController.js';

import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorizeRoles('client'), addReview);
router.get('/gig/:gigId', getReviewsByGig);
router.get('/user/:userId', getReviewsByUser);

export default router;
