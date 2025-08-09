// models/Review.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  gig:     { type: mongoose.Schema.Types.ObjectId, ref: 'Gig', required: true },
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating:  { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
