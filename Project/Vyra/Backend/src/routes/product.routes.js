import express from "express";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import { productController } from "../controllers/product.controller.js";
import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
})
const router = express.Router();

/**
 * @route POST /api/products
 * @description Create a new product
 * @access Private (Seller only)
 */
router.post('/', authenticateSeller, upload.array('images', 7), productController.createProduct);

/**
 * @route GET '/api/products/seller'
 * @description Get all products by seller
 * @access Private (Seller only)
 */
router.get('/seller', authenticateSeller, productController.getSellerProducts);

/**
 * @route GET '/'
 * @description Get all products
 * @access Public
 */
router.get('/', productController.getAllProducts);

/**
 * @route GET '/:id'
 * @description Get product by id
 * @access Public
 */
router.get('/:id', productController.getProduct);

/**
 * @route POST '/api/products/:id/variants'
 * @description Add a variant to a product
 * @access Private (Seller only)
 */
router.post('/:id/variants', authenticateSeller, upload.array('images', 5), productController.addVariant);

export default router;