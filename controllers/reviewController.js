// controllers/reviewController.js
import Review from '../models/Review.js';
import Order from '../models/Order.js';

export const addReview = async (req, res) => {
  try {
    const { gigId, rating, comment } = req.body;

    // Optional: Ensure user actually purchased this gig
    const hasOrdered = await Order.findOne({
      gig: gigId,
      buyer: req.user.userId,
      status: 'completed'
    });

    if (!hasOrdered) {
      return res.status(403).json({ message: 'You can only review completed gigs you purchased' });
    }

    const alreadyReviewed = await Review.findOne({
      gig: gigId,
      user: req.user.userId
    });

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You have already reviewed this gig' });
    }

    const newReview = await Review.create({
      gig: gigId,
      user: req.user.userId,
      rating,
      comment
    });

    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add review', error: err.message });
  }
};

export const getReviewsByGig = async (req, res) => {
  try {
    const reviews = await Review.find({ gig: req.params.gigId })
      .populate('user', 'username');
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get reviews', error: err.message });
  }
};

export const getReviewsByUser = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.params.userId })
      .populate('gig', 'title');
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get user reviews', error: err.message });
  }
};
