// routes/gigRoutes.js
import express from 'express';
import {
  createGig,
  getAllGigs,
  getGigById,
  updateGig,
  deleteGig
} from '../controllers/gigController.js';

import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllGigs);
router.get('/:id', getGigById);
router.post('/', protect, authorizeRoles('freelancer'), createGig);
router.put('/:id', protect, authorizeRoles('freelancer'), updateGig);
router.delete('/:id', protect, authorizeRoles('freelancer'), deleteGig);

export default router;
