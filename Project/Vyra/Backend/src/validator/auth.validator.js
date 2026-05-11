import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const validateRegisterUser = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("contact").matches(/^\d{10}$/).withMessage("Contact must be at least 10 digits long"),
    body("fullname").isLength({ min: 3 }).withMessage("Full name must be at least 3 characters long"),
    body("role").isIn(["buyer", "seller"]).withMessage("Role must be either buyer or seller"),
    validateRequest,
];

export const validateLoginUser = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
    validateRequest,
];