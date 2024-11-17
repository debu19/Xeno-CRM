// routes/customers.js
import express from "express"
import Customer from '../models/customerModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { customer_id, name, email, phone } = req.body;
    try {
        const customer = new Customer({ customer_id, name, email, phone });
        await customer.save();
        res.status(201).json({ message: 'Customer created successfully', customer });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Error inserting customer data' });
    }
});

export default router;
