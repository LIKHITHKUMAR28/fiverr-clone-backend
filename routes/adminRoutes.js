import express from 'express';
import {
  getAllUsers,
  getAllGigs,
  getAllOrders,
  getAllReviews,
  deleteUser,
  deleteGig,
  deleteOrder,
  deleteReview
} from '../controllers/adminController.js';

import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, authorizeRoles('admin'));

router.get('/users', getAllUsers);
router.get('/gigs', getAllGigs);
router.get('/orders', getAllOrders);
router.get('/reviews', getAllReviews);

router.delete('/users/:id', deleteUser);
router.delete('/gigs/:id', deleteGig);
router.delete('/orders/:id', deleteOrder);
router.delete('/reviews/:id', deleteReview);

export default router;
