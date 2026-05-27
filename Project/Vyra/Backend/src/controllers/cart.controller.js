import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import { stockOfVariant } from "../dao/product.dao.js";

const addToCart = async (req, res) => {
    let { productId, variantId } = req.params;
    
    const { quantity = 1 } = req.body;
    const product = await productModel.findById(productId);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    if (variantId === '000000000000000000000000') {
        variantId = undefined;
    }

    if (!variantId && product.variants && product.variants.length > 0) {
        variantId = product.variants[0]._id.toString();
    }

    let variant = null;
    if (variantId) {
        variant = product.variants.find((v) => v._id.toString() === variantId);
        if (!variant) {
            return res.status(404).json({ message: "Variant not found" });
        }
    }

    const stock = variant ? variant.stock : product.stock;
    const priceAmount = variant ? variant.price?.amount : product.price?.amount;
    const priceCurrency = variant ? variant.price?.currency : product.price?.currency;
    
    // DB schema requires a variant ObjectId, so use a dummy ID if none exists
    const dbVariantId = variantId || '000000000000000000000000';

    let cart = await cartModel.findOne({ user: req.user._id });
    if (!cart) {
        cart = await cartModel.create({ user: req.user._id });
    }
    
    const isProductAlreadyInCart = cart.items.some((item) => item.product.toString() === productId && item.variant?.toString() === dbVariantId)

    if (isProductAlreadyInCart) {
        const quantityInCart = cart.items.find((item) => item.product.toString() === productId && item.variant?.toString() === dbVariantId)?.quantity
        
        const newTotalQuantity = quantityInCart + quantity;
        
        if (newTotalQuantity <= 0) {
            await cartModel.findOneAndUpdate(
                { user: req.user._id },
                { $pull: { items: { product: productId, variant: dbVariantId } } },
                { new: true }
            );
            return res.status(200).json({ success: true, message: "Item removed from cart" });
        }

        if (stock < newTotalQuantity) {
            return res.status(400).json({ message: "Stock is not enough", success: false });
        }
        await cartModel.findOneAndUpdate(
            { user: req.user._id, "items.product": productId, "items.variant": dbVariantId },
            { $inc: { "items.$.quantity": quantity } },
            { new: true }
        )
        return res.status(200).json({ success: true, message: "Cart updated successfully" })
    }
    if (quantity > stock) {
        return res.status(400).json({ message: "Stock is not enough", success: false });
    }
    cart.items.push({
        product: productId,
        variant: dbVariantId,
        quantity: quantity,
        price: {
            amount: priceAmount,
            currency: priceCurrency
        }
    })
    await cart.save();
    return res.status(200).json({
        message: "Product added to cart successfully",
        success: true
    })
}

const getCart = async (req, res) => {
    const user = req.user;
    let cart = await cartModel.findOne({ user: user._id }).populate("items.product");

    if(!cart){
        cart = await cartModel.create({ user: user._id })
    }

    return res.status(200).json({
        message:"Cart fetched successfully",
        success:true,
        cart
    })
}

export default {
    addToCart,
    getCart
}