import Razorpay from "razorpay";
import crypto from "crypto";
import { config } from "../config/config.js";

const razorpay = new Razorpay({
    key_id: config.RAZORPAY_KEY_ID,
    key_secret: config.RAZORPAY_KEY_SECRET
});

export const createOrder = async ({ amount, currency = "INR" }) => {
    const options = {
        amount: amount * 100, // amount in the smallest currency unit
        currency,
    };

    const order = await razorpay.orders.create(options);

    return order;
};

export const validatePaymentVerification = (orderData, signature, secret) => {
    const { order_id, payment_id } = orderData;
    const body = order_id + "|" + payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(body.toString())
        .digest("hex");
        
    return expectedSignature === signature;
};
