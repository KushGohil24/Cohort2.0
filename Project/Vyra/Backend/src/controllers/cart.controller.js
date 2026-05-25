import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model";
import { stockOfVariant } from "../dao/product.dao.js";

const addToCart = async (req, res) => {
    const { productId, variantId } = req.params;
    const { quantity = 1 } = req.body;
    const product = await productModel.findOne({
        _id: productId,
        "variants._id": variantId
    })

    if (!product) {
        return res.status(404).json({ message: "Product or variant not found" });
    }
    const stock = await stockOfVariant(productId, variantId)

    const cart = (await cartModel.findOne({ user: req.user._id })) || (await cartModel.create({ user: req.user._id }))
    const isProductAlreadyInCart = cart.items.some((item) => item.product.toString() === productId && item.variant?.toString() === variantId)

    if (isProductAlreadyInCart) {
        const quantityInCart = cart.items.find((item) => item.product.toString() === productId && item.variant?.toString() === variantId)?.quantity
        if (stock < (quantity + quantityInCart)) {
            return res.status(400).json({ message: "Stock is not enough", success: false });
        }
        await cartModel.findOneAndUpdate(
            { user: req.user._id, "items.product": productId, "items.variant": variantId },
            { $inc: { "items.$[item].quantity": quantity } },
            { new: true }
        )
        return res.status(200).json({ success: true, message: "Cart updated successfully", success: true })
    }
    if (quantity > stock) {
        return res.status(400).json({ message: "Stock is not enough", success: false });
    }
    cart.items.push({
        product: productId,
        variant: variantId,
        quantity: quantity,
        price: {
            amount: product.variants.find((variant) => variant._id.toString() === variantId)?.price?.amount,
            currency: product.variants.find((variant) => variant._id.toString() === variantId)?.price?.currency
        }
    })
    await cart.save();
    return res.status(200).json({
        message: "Product added to cart successfully",
        success: true
    })
}

export const cartController = {
    addToCart
}