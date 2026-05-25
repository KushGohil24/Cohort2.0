import { body, param, validationResult } from 'express-validator';

const validateRequest = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    next();
}

export const validateAddToCart = [
    param("productId")
        .notEmpty().withMessage("Product ID is required")
        .isMongoId().withMessage("Product ID is invalid"),
    param("variantId")
        .notEmpty().withMessage("Variant ID is required")
        .isMongoId().withMessage("Variant ID is invalid"),
    body("quantity")
        .optional()
        .isInt({ gt: 0 }).withMessage("Quantity must be greater than 0")
        .toInt(),
    validateRequest
]