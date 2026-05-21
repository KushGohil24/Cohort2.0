import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    },
    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            enum: ['USD', 'INR'],
            default: 'INR'
        }
    },
    images: [{
        url: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            required: false
        }
    }],
    category: {
        type: String,
        required: false
    },
    subCategory: {
        type: String,
        required: false
    },
    sizes: {
        type: [String],
        default: []
    },
    bestseller: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
})

const productModel = mongoose.model("product", productSchema);
export default productModel;