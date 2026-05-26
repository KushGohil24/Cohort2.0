import express from 'express';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { validateAddToCart } from '../validator/cart.validator.js';
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

/**
 * @route GET /api/cart
 * @desc Get cart items for logged in user
 * @access Private
 */
router.get("/", authenticateUser, cartController.getCart);

export default router;