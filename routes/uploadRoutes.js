import express from 'express';
import multer from 'multer';
import { uploadImage } from '../controllers/uploadController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Store temp file in /uploads
const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post('/', protect, authorizeRoles('freelancer'), upload.single('image'), uploadImage);

export default router;
