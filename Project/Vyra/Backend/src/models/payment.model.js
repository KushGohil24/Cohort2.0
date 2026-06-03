import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    variantId: { type: mongoose.Schema.Types.ObjectId, required: false },
    quantity: { type: Number, required: true },
    images: [{ type: String }],
    description: { type: String },
    price: {
        amount: { type: Number, required: true },
        currency: { type: String, default: "INR" }
    }
});

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    razorpay: {
        orderId: { type: String, required: true },
        paymentId: { type: String },
        signature: { type: String }
    },
    price: {
        amount: { type: Number, required: true },
        currency: { type: String, default: "INR" }
    },
    orderItems: [orderItemSchema],
    status: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    }
}, { timestamps: true });

const paymentModel = mongoose.model("Payment", paymentSchema);
export default paymentModel;