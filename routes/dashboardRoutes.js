import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import {
  getClientDashboard,
  getFreelancerDashboard
} from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/client', protect, authorizeRoles('client'), getClientDashboard);
router.get('/freelancer', protect, authorizeRoles('freelancer'), getFreelancerDashboard);

export default router;
