import mongoose from "mongoose";
import priceSchema from "./price.schema.js";
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true,
            },
            variant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product.variants',
                required: false,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            price: {
                type: priceSchema,
                required: true
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    totalQuantity: {
        type: Number,
        required: true,
        default: 0,
    },
})
const cartModel = new mongoose.model('cart', cartSchema);
export default cartModel;