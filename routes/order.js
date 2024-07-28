const express = require('express');
const router = express.Router();
const Order = require('/models/Order');
const Cart = require('/models/Cart');

// Create an order
router.post('/', async (req, res) => {
    const { userId, total } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const order = new Order({
            user: userId,
            items: cart.items,
            total,
        });

        await order.save();
        await Cart.deleteOne({ user: userId });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
});

// Get orders for a user
router.get('/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
});

module.exports = router;
