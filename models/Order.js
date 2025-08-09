// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  gig:       { type: mongoose.Schema.Types.ObjectId, ref: 'Gig', required: true },
  buyer:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seller:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price:     { type: Number, required: true },
  status:    {
    type: String,
    enum: ['pending', 'in progress', 'delivered', 'completed'],
    default: 'pending'
  },
  paymentIntentId: { type: String },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
