// controllers/dashboardController.js
import Gig from '../models/Gig.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

export const getClientDashboard = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.userId })
      .populate('gig')
      .populate('seller', 'username');

    res.status(200).json({
      role: 'client',
      totalOrders: orders.length,
      orders
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load client dashboard', error: err.message });
  }
};

export const getFreelancerDashboard = async (req, res) => {
  try {
    const gigs = await Gig.find({ freelancer: req.user.userId });
    const orders = await Order.find({ seller: req.user.userId });

    // Total earnings from completed orders
    const earnings = orders
      .filter(order => order.status === 'completed')
      .reduce((acc, order) => acc + order.price, 0);

    res.status(200).json({
      role: 'freelancer',
      totalGigs: gigs.length,
      totalOrders: orders.length,
      earnings,
      gigs,
      orders
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load freelancer dashboard', error: err.message });
  }
};
