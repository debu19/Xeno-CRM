import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    order_id: { type: String, required: true, unique: true },
    customer_id: { type: String, required: true },
    product_name: { type: String, required: true },
    amount: { type: Number, required: true },
    order_date: { type: Date, required: true }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;