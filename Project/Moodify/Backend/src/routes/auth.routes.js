const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware");

// @route   POST /api/auth/register
// @desc    Register user route
// @access  Public
router.post('/register', authController.handleRegister);

// @route   POST /api/auth/login
// @desc    Login user route
// @access  Public
router.post('/login', authController.handleLogin);

// @route   GET /api/auth/get-me
// @desc    Gives user details
// @access  Private
router.get("/get-me", authMiddleware.authUser, authController.getMe)

// @route   POST /api/auth/logout
// @desc    Logout user route
// @access  Private
router.post('/logout', authController.handleLogout);
module.exports = router;