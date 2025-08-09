import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';

export const uploadImage = async (req, res) => {
  try {
    const file = req.file.path;

    const result = await cloudinary.uploader.upload(file, {
      folder: 'gigs'
    });

    // Delete local temp file
    fs.unlinkSync(file);

    res.status(200).json({
      imageUrl: result.secure_url
    });
  } catch (err) {
    res.status(500).json({ message: 'Image upload failed', error: err.message });
  }
};
