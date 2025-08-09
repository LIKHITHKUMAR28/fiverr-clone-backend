import User from '../models/User.js';
import Gig from '../models/Gig.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';

// Get all records
export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

export const getAllGigs = async (req, res) => {
  const gigs = await Gig.find().populate('freelancer', 'username');
  res.json(gigs);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate('buyer seller', 'username')
    .populate('gig');
  res.json(orders);
};

export const getAllReviews = async (req, res) => {
  const reviews = await Review.find().populate('user', 'username').populate('gig', 'title');
  res.json(reviews);
};

// Delete operations
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
};

export const deleteGig = async (req, res) => {
  await Gig.findByIdAndDelete(req.params.id);
  res.json({ message: 'Gig deleted' });
};

export const deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: 'Order deleted' });
};

export const deleteReview = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: 'Review deleted' });
};
