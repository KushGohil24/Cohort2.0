import mongoose from 'mongoose';
import priceSchema from "./price.schema.js";

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    category: { 
        type: String,
        enum: ['Necklaces', 'Rings', 'Earrings', 'Bracelets', 'Anklets', 'Bangles', 'Pendants', 'Chains', 'Nose Pins', 'Hair Accessories', 'Brooches', 'Sets'],
        required: true
    },
    metal: { 
        type: String,
        enum: ['Brass', 'Base Metal', 'Silver', 'Copper', 'Yellow Gold', 'White Gold', 'Platinum', 'Rose Gold', 'Stainless Steel', 'Sterling Silver', 'Precious Metal', 'Pearl', 'Plastic', 'Bamboo', 'Ceramic', 'Enamel', 'Fabric', 'Lac', 'Leather', 'Resin', 'Rubber', 'Shell', 'Wood', 'Mother of Pearl'],
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    bestseller: { type: Boolean, default: false },
    tags: [String],
    price: {
        type: priceSchema,
        required: true
    },
    images: [
        {
            url: {
                type: String,
                required: true
            }
        }
    ],
    variants: [
        {
            images: [
                {
                    url: {
                        type: String,
                        required: true
                    }
                }
            ],
            stock: {
                type: Number,
                default: 0
            },
            attributes: {
                type: Map,
                of: String
            },
            price: {
                type: priceSchema,
            }
        },

    ]
}, { timestamps: true })


const productModel = mongoose.model('product', productSchema);

export default productModel;