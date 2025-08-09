// models/Gig.js
import mongoose from 'mongoose';

const gigSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  description:  { type: String, required: true },
  price:        { type: Number, required: true },
  category:     { type: String, required: true },
  deliveryTime: { type: Number, required: true }, // in days
  imageUrl:     { type: String }, // optional for now
  freelancer:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Gig', gigSchema);
