import cartModel from "../models/cart.model.js";
import mongoose from "mongoose";

export async function getCartDetails(userId) {
    let cart = (await cartModel.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(userId)
            }
        },
        // Unwind items array, keeping empty carts intact
        {
            $unwind: { path: '$items', preserveNullAndEmptyArrays: true }
        },
        // Lookup the product details
        {
            $lookup: {
                from: 'products',
                localField: 'items.product',
                foreignField: '_id',
                as: 'items.product'
            }
        },
        // Unwind product array, keeping items where product might be missing intact
        {
            $unwind: { path: '$items.product', preserveNullAndEmptyArrays: true }
        },
        // Find matching variant
        {
            $addFields: {
                "items.matchingVariant": {
                    $filter: {
                        input: { $ifNull: ['$items.product.variants', []] },
                        as: 'variant',
                        cond: { $eq: ['$$variant._id', '$items.variant'] }
                    }
                }
            }
        },
        {
            $addFields: {
                "items.selectedVariant": { $arrayElemAt: ['$items.matchingVariant', 0] }
            }
        },
        // Override price and images with variant ones, fallback to product
        {
            $addFields: {
                "items.price": {
                    $cond: {
                        if: { $and: ['$items.selectedVariant', '$items.selectedVariant.price', { $ne: ['$items.selectedVariant.price.amount', null] }] },
                        then: '$items.selectedVariant.price',
                        else: '$items.product.price'
                    }
                },
                "items.images": {
                    $cond: {
                        if: { $and: ['$items.selectedVariant', { $gt: [{ $size: { $ifNull: ['$items.selectedVariant.images', []] } }, 0] }] },
                        then: '$items.selectedVariant.images',
                        else: '$items.product.images'
                    }
                }
            }
        },
        // Group back into a cart object
        {
            $group: {
                _id: '$_id',
                user: { $first: '$user' },
                totalPrice: { 
                    $sum: { 
                        $multiply: ['$items.quantity', '$items.price.amount'] 
                    } 
                },
                currency: {
                    $first: { $ifNull: ['$items.price.currency', 'INR'] }
                },
                items: { 
                    $push: {
                        $cond: [
                            { $not: ['$items.product'] },
                            '$$REMOVE',
                            {
                                product: '$items.product',
                                variant: '$items.variant',
                                quantity: '$items.quantity',
                                price: '$items.price',
                                images: '$items.images',
                                _id: '$items._id'
                            }
                        ]
                    }
                }
            }
        }
    ]))[0];

    return cart;
}