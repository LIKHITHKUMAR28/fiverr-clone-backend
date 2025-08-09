import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Stripe from 'stripe';
import Gig from '../models/Gig.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', protect, async (req, res) => {
  try {
    const gig = await Gig.findById(req.body.gigId);
    if (!gig) return res.status(404).json({ message: 'Gig not found' });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: gig.title },
            unit_amount: gig.price * 100
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/payment-success`,
      cancel_url: `${process.env.FRONTEND_URL}/gigs/${gig._id}`
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
