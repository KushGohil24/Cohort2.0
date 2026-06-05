import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import paymentModel from "../models/payment.model.js";
import { getCartDetails } from "../dao/cart.dao.js";
import { createOrder, validatePaymentVerification } from "../services/payment.service.js";
import { config } from "../config/config.js";

const addToCart = async (req, res) => {
    let { productId, variantId } = req.params;
    
    if (variantId === 'undefined' || variantId === 'null') {
        variantId = undefined;
    }
    
    const { quantity = 1 } = req.body;
    const product = await productModel.findById(productId);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    let variant = null;
    if (variantId) {
        variant = product.variants.find((v) => v._id.toString() === variantId);
        if (!variant) {
            return res.status(404).json({ message: "Variant not found" });
        }
    }

    const stock = variant ? variant.stock : product.stock;
    const priceAmount = variant?.price?.amount || product.price?.amount;
    const priceCurrency = variant?.price?.currency || product.price?.currency || "INR";
    
    let cart = await cartModel.findOne({ user: req.user._id });
    if (!cart) {
        cart = await cartModel.create({ user: req.user._id });
    }
    
    const isProductAlreadyInCart = cart.items.some((item) => {
        const itemVarStr = item.variant ? item.variant.toString() : null;
        const targetVarStr = variantId || null;
        return item.product.toString() === productId && itemVarStr === targetVarStr;
    });

    if (isProductAlreadyInCart) {
        const quantityInCart = cart.items.find((item) => {
            const itemVarStr = item.variant ? item.variant.toString() : null;
            const targetVarStr = variantId || null;
            return item.product.toString() === productId && itemVarStr === targetVarStr;
        })?.quantity;
        
        const newTotalQuantity = quantityInCart + quantity;
        
        if (newTotalQuantity <= 0) {
            const pullQuery = { product: productId };
            if (variantId) pullQuery.variant = variantId;
            else pullQuery.variant = { $exists: false };

            await cartModel.findOneAndUpdate(
                { user: req.user._id },
                { $pull: { items: pullQuery } },
                { new: true }
            );
            return res.status(200).json({ success: true, message: "Item removed from cart" });
        }

        if (stock < newTotalQuantity) {
            return res.status(400).json({ message: "Stock is not enough", success: false });
        }
        
        const updateQuery = { user: req.user._id, "items.product": productId };
        if (variantId) updateQuery["items.variant"] = variantId;
        else updateQuery["items.variant"] = { $exists: false };

        await cartModel.findOneAndUpdate(
            updateQuery,
            { $inc: { "items.$.quantity": quantity } },
            { new: true }
        )
        return res.status(200).json({ success: true, message: "Cart updated successfully" })
    }
    if (quantity > stock) {
        return res.status(400).json({ message: "Stock is not enough", success: false });
    }
    
    const newItem = {
        product: productId,
        quantity: quantity,
        price: {
            amount: priceAmount,
            currency: priceCurrency
        }
    };
    if (variantId) newItem.variant = variantId;
    
    cart.items.push(newItem);
    await cart.save();
    return res.status(200).json({
        message: "Product added to cart successfully",
        success: true
    })
}

const getCart = async (req, res) => {
    const user = req.user;
    let cart = await getCartDetails(user._id);

    if(!cart){
        await cartModel.create({ user: user._id });
        cart = await getCartDetails(user._id);
    }

    return res.status(200).json({
        message:"Cart fetched successfully",
        success:true,
        cart
    })
}

const incrementCartQuantity = async (req, res) => {
    let { productId, variantId } = req.params;
    
    if (variantId === 'undefined' || variantId === 'null') {
        variantId = undefined;
    }
    
    const product = await productModel.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    
    let variant = null;
    if (variantId) {
        variant = product.variants.find((v) => v._id.toString() === variantId);
        if (!variant) {
            return res.status(404).json({ message: "Variant not found" });
        }
    }
    
    const stock = variant ? variant.stock : product.stock;
    
    let cart = await cartModel.findOne({ user: req.user._id });
    if (!cart) {
        cart = await cartModel.create({ user: req.user._id });
    }
    
    const isProductAlreadyInCart = cart.items.some((item) => {
        const itemVarStr = item.variant ? item.variant.toString() : null;
        const targetVarStr = variantId || null;
        return item.product.toString() === productId && itemVarStr === targetVarStr;
    });

    if (isProductAlreadyInCart) {
        const quantityInCart = cart.items.find((item) => {
            const itemVarStr = item.variant ? item.variant.toString() : null;
            const targetVarStr = variantId || null;
            return item.product.toString() === productId && itemVarStr === targetVarStr;
        })?.quantity;
        
        const newTotalQuantity = quantityInCart + 1;
        
        if (newTotalQuantity <= 0) {
            const pullQuery = { product: productId };
            if (variantId) pullQuery.variant = variantId;
            else pullQuery.variant = { $exists: false };

            await cartModel.findOneAndUpdate(
                { user: req.user._id },
                { $pull: { items: pullQuery } },
                { new: true }
            );
            return res.status(200).json({ success: true, message: "Item removed from cart" });
        }

        if (stock < newTotalQuantity) {
            return res.status(400).json({ message: "Stock is not enough", success: false });
        }
        
        const updateQuery = { user: req.user._id, "items.product": productId };
        if (variantId) updateQuery["items.variant"] = variantId;
        else updateQuery["items.variant"] = { $exists: false };

        await cartModel.findOneAndUpdate(
            updateQuery,
            { $inc: { "items.$.quantity": 1 } },
            { new: true }
        )
        return res.status(200).json({ success: true, message: "Cart updated successfully" })
    }
    
    return res.status(400).json({ message: "Product is not in cart", success: false });
}

const decrementCartQuantity = async (req, res) => {
    let { productId, variantId } = req.params;
    
    if (variantId === 'undefined' || variantId === 'null') {
        variantId = undefined;
    }
    
    const product = await productModel.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    
    let variant = null;
    if (variantId) {
        variant = product.variants.find((v) => v._id.toString() === variantId);
        if (!variant) {
            return res.status(404).json({ message: "Variant not found" });
        }
    }
    
    const stock = variant ? variant.stock : product.stock;
    
    let cart = await cartModel.findOne({ user: req.user._id });
    if (!cart) {
        cart = await cartModel.create({ user: req.user._id });
    }
    
    const isProductAlreadyInCart = cart.items.some((item) => {
        const itemVarStr = item.variant ? item.variant.toString() : null;
        const targetVarStr = variantId || null;
        return item.product.toString() === productId && itemVarStr === targetVarStr;
    });

    if (isProductAlreadyInCart) {
        const quantityInCart = cart.items.find((item) => {
            const itemVarStr = item.variant ? item.variant.toString() : null;
            const targetVarStr = variantId || null;
            return item.product.toString() === productId && itemVarStr === targetVarStr;
        })?.quantity;
        
        const newTotalQuantity = quantityInCart - 1;
        
        if (newTotalQuantity <= 0) {
            const pullQuery = { product: productId };
            if (variantId) pullQuery.variant = variantId;
            else pullQuery.variant = { $exists: false };

            await cartModel.findOneAndUpdate(
                { user: req.user._id },
                { $pull: { items: pullQuery } },
                { new: true }
            );
            return res.status(200).json({ success: true, message: "Item removed from cart" });
        }

        if (stock < newTotalQuantity) {
            return res.status(400).json({ message: "Stock is not enough", success: false });
        }
        
        const updateQuery = { user: req.user._id, "items.product": productId };
        if (variantId) updateQuery["items.variant"] = variantId;
        else updateQuery["items.variant"] = { $exists: false };

        await cartModel.findOneAndUpdate(
            updateQuery,
            { $inc: { "items.$.quantity": -1 } },
            { new: true }
        )
        return res.status(200).json({ success: true, message: "Cart updated successfully" })
    }
    
    return res.status(400).json({ message: "Product is not in cart", success: false });
}

const removeFromCart = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const cart = await cartModel.findOneAndUpdate(
            { user: req.user._id },
            { $pull: { items: { _id: cartItemId } } },
            { new: true }
        );
        return res.status(200).json({ success: true, message: "Item removed from cart", cart });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

const clearCart = async (req, res) => {
    try {
        const cart = await cartModel.findOneAndUpdate(
            { user: req.user._id },
            { items: [], totalQuantity: 0, totalPrice: 0 },
            { new: true }
        );
        return res.status(200).json({ success: true, message: "Cart cleared", cart });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

export const createOrderController = async (req, res) => {


    const cart = await getCartDetails(req.user._id)

    if (!cart) {
        return res.status(400).json({
            message: "Cart is empty",
            success: false
        })
    }

    const order = await createOrder({ amount: cart.totalPrice, currency: cart.currency })

    const payment = await paymentModel.create({
        user: req.user._id,
        razorpay: {
            orderId: order.id,
        },
        price: {
            amount: cart.totalPrice,
            currency: cart.currency
        },
        orderItems: cart.items.map(item => ({
            title: item.product.title,
            productId: item.product._id,
            variantId: item.variant,
            quantity: item.quantity,
            images: item.images ? item.images.map(img => img.url) : [], // Map live images to array of strings
            description: item.product.description,
            price: {
                amount: item.price.amount, // Live price populated by getCartDetails
                currency: item.price.currency
            }
        }))
    })

    return res.status(200).json({
        message: "Order created successfully",
        success: true,
        order,
        keyId: config.RAZORPAY_KEY_ID
    })
}

export const verifyOrderController = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    } = req.body

    const payment = await paymentModel.findOne({
        "razorpay.orderId": razorpay_order_id,
        status: "pending"
    })

    if (!payment) {
        return res.status(400).json({
            message: "Payment not found",
            success: false
        })
    }

    const isPaymentValid = validatePaymentVerification({
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
    }, razorpay_signature, config.RAZORPAY_KEY_SECRET)

    if (!isPaymentValid) {
        payment.status = "failed"
        await payment.save()

        return res.status(400).json({
            message: "Payment verification failed",
            success: false
        })
    }

    payment.status = "paid"

    payment.razorpay.paymentId = razorpay_payment_id
    payment.razorpay.signature = razorpay_signature

    await payment.save()

    return res.status(200).json({
        message: "Payment verified successfully",
        success: true
    })
}

export default {
    addToCart,
    getCart,
    incrementCartQuantity,
    decrementCartQuantity,
    removeFromCart,
    clearCart,
    createOrderController,
    verifyOrderController
}
