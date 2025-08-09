// controllers/gigController.js
import Gig from '../models/Gig.js';

export const createGig = async (req, res) => {
  try {
    const { title, description, price, category, deliveryTime, imageUrl } = req.body;

    const newGig = await Gig.create({
      title,
      description,
      price,
      category,
      deliveryTime,
      imageUrl,
      freelancer: req.user.userId
    });

    res.status(201).json(newGig);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create gig', error: err.message });
  }
};

export const getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find().populate('freelancer', 'username role');
    res.status(200).json(gigs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching gigs' });
  }
};

export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate('freelancer', 'username role');
    if (!gig) return res.status(404).json({ message: 'Gig not found' });
    res.status(200).json(gig);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching gig' });
  }
};

export const updateGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: 'Gig not found' });

    if (gig.freelancer.toString() !== req.user.userId)
      return res.status(403).json({ message: 'You can only update your own gigs' });

    const updatedGig = await Gig.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedGig);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update gig' });
  }
};

export const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: 'Gig not found' });

    if (gig.freelancer.toString() !== req.user.userId)
      return res.status(403).json({ message: 'You can only delete your own gigs' });

    await gig.deleteOne();
    res.status(200).json({ message: 'Gig deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete gig' });
  }
};
