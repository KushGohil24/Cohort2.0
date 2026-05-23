import mongoose from "mongoose";

const METALS = [
    'Brass', 'Base Metal', 'Silver', 'Copper', 'Yellow Gold', 'White Gold',
    'Platinum', 'Rose Gold', 'Stainless Steel', 'Sterling Silver',
    'Precious Metal', 'Pearl', 'Plastic', 'Bamboo', 'Ceramic', 'Enamel',
    'Fabric', 'Lac', 'Leather', 'Resin', 'Rubber', 'Shell', 'Wood', 'Mother of Pearl'
];

const CATEGORIES = [
    'Necklaces', 'Rings', 'Earrings', 'Bracelets', 'Anklets', 'Bangles',
    'Pendants', 'Chains', 'Nose Pins', 'Hair Accessories', 'Brooches', 'Sets'
];

const priceSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        enum: ['USD', 'INR'],
        default: 'INR'
    }
}, { _id: false });

const variantSchema = new mongoose.Schema({
    images: [{
        url: {
            type: String,
            required: true
        }
    }],
    stock: {
        type: Number,
        default: 0
    },
    attributes: {
        type: Map,
        of: String
    },
    price: {
        type: priceSchema
    }
}, { _id: true });

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
        type: priceSchema,
        required: true
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
        enum: CATEGORIES,
        required: false
    },
    metal: {
        type: String,
        enum: METALS,
        required: false
    },
    stock: {
        type: Number,
        default: 0
    },
    bestseller: {
        type: Boolean,
        default: false
    },
    tags: {
        type: [String],
        default: []
    },
    variants: {
        type: [variantSchema],
        default: []
    }
}, {
    timestamps: true,
});

export { METALS, CATEGORIES };
const productModel = mongoose.model("product", productSchema);
export default productModel;