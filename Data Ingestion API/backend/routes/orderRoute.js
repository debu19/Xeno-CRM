// routes/orders.js
import express from "express"
import Order from '../models/orderModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { order_id, customer_id, product_name, amount, order_date } = req.body;
    try {
        const order = new Order({ order_id, customer_id, product_name, amount, order_date });
        await order.save();
        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        res.status(400).json({ error: 'Error inserting order data' });
    }
});

export default router;
