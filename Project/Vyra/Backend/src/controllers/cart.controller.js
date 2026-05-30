import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

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

export default {
    addToCart,
    getCart,
    incrementCartQuantity,
    decrementCartQuantity,
    removeFromCart,
    clearCart
}