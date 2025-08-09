// controllers/orderController.js
import { Stripe } from 'stripe'; // ✅ updated import for ESM
import Gig from '../models/Gig.js';
import Order from '../models/Order.js';

// ✅ Stripe setup with ESM support
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// 1. Create Stripe Checkout
export const createCheckoutSession = async (req, res) => {
  try {
    const { gigId } = req.body;
    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: 'Gig not found' });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: gig.title,
            },
            unit_amount: gig.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancelled`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('❌ Stripe checkout failed:', err);
    res.status(500).json({ message: 'Stripe checkout failed', error: err.message });
  }
};

// 2. Create Order after payment success
export const createOrder = async (req, res) => {
  try {
    const { gigId, paymentIntentId } = req.body;

    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: 'Gig not found' });

    const newOrder = await Order.create({
      gig: gig._id,
      buyer: req.user.userId,
      seller: gig.freelancer,
      price: gig.price,
      status: 'pending',
      paymentIntentId,
    });

    res.status(201).json(newOrder);
  } catch (err) {
    console.error('❌ Order creation failed:', err);
    res.status(500).json({ message: 'Order creation failed', error: err.message });
  }
};

// 3. Get all orders (role-based)
export const getMyOrders = async (req, res) => {
  try {
    const filter =
      req.user.role === 'client'
        ? { buyer: req.user.userId }
        : { seller: req.user.userId };

    const orders = await Order.find(filter)
      .populate('gig')
      .populate('buyer', 'username')
      .populate('seller', 'username');

    res.status(200).json(orders);
  } catch (err) {
    console.error('❌ Fetch orders failed:', err);
    res.status(500).json({ message: 'Could not fetch orders', error: err.message });
  }
};

// 4. Update order status (optional)
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = req.body.status || order.status;
    await order.save();

    res.status(200).json({ message: 'Order status updated', order });
  } catch (err) {
    console.error('❌ Update order failed:', err);
    res.status(500).json({ message: 'Failed to update order', error: err.message });
  }
};
