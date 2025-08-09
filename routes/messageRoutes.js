import express from 'express';
import { sendMessage, getMessagesBetweenUsers } from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, sendMessage);
router.get('/:userId', protect, getMessagesBetweenUsers);

export default router;
