import express from 'express';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { validateAddToCart, validateIncrementCartQuantity, validateDecrementCartQuantity } from '../validator/cart.validator.js';
import cartController from '../controllers/cart.controller.js';

const router = express.Router();


/**
 * @route POST /api/cart/add/:productId/:variantId
 * @desc Add item to cart
 * @access Private
 * @argument productId - ID of the product to add
 * @argument variantId - ID of the variant to add
 * @argument quantity - Quantity of the item to add (optional, default: 1)
 */
router.post("/add/:productId/:variantId", authenticateUser, validateAddToCart, cartController.addToCart);
router.post("/add/:productId", authenticateUser, validateAddToCart, cartController.addToCart);

/**
 * @route GET /api/cart
 * @desc Get cart items for logged in user
 * @access Private
 */
router.get("/", authenticateUser, cartController.getCart);

/**
 * @route PATCH /api/cart/quantity/increment/:productId/:variantId
 * @route PATCH /api/cart/quantity/increment/:productId
 * @desc Increment cart item quantity
 * @access Private
 * @argument productId - ID of the product to update
 * @argument variantId - ID of the variant to update
 */
router.patch("/quantity/increment/:productId/:variantId", authenticateUser, validateIncrementCartQuantity, cartController.incrementCartQuantity);
router.patch("/quantity/increment/:productId", authenticateUser, validateIncrementCartQuantity, cartController.incrementCartQuantity);

/**
 * @route PATCH /api/cart/quantity/decrement/:productId/:variantId
 * @route PATCH /api/cart/quantity/decrement/:productId
 * @desc Decrement cart item quantity
 * @access Private
 * @argument productId - ID of the product to update
 * @argument variantId - ID of the variant to update
 */
router.patch("/quantity/decrement/:productId/:variantId", authenticateUser, validateDecrementCartQuantity, cartController.decrementCartQuantity);
router.patch("/quantity/decrement/:productId", authenticateUser, validateDecrementCartQuantity, cartController.decrementCartQuantity);

/**
 * @route DELETE /api/cart/remove/:cartItemId
 * @desc Remove cart item from cart
 * @access Private
 * @argument cartItemId - ID of the cart item to remove
 */
router.delete("/remove/:cartItemId", authenticateUser, cartController.removeFromCart);

/**
 * @route DELETE /api/cart/clear
 * @desc Clear all items from cart
 * @access Private
 */
router.delete("/clear", authenticateUser, cartController.clearCart);

export default router;