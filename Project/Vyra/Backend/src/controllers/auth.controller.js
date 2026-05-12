import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { config } from "../config/config.js";

async function sendToken(user, res, message, statusCode) {
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(statusCode).json({ message, success: true,
        user: {
            id: user.id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role,
        }
     });
}

async function register(req, res) {
    const { email, password, contact, fullname, isSeller } = req.body;
    try {
        const existingUser = await userModel.findOne({
            $or: [{ email }, { contact }]
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email or contact" });
        }

        // save user

        const user = await userModel.create({ email, password, contact, fullname, role: isSeller ? "seller" : "buyer" });

        await sendToken(user, res, "User registered successfully", 201)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await user.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        await sendToken(user, res, "User logged in successfully", 200);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function googleCallback(req, res) {
    const { id, displayName, emails, photos } = req.user
    const email = emails[ 0 ].value;
    const profilePic = photos[ 0 ].value;   

    let user = await userModel.findOne({email});
    if (!user) {
        user = await userModel.create({
            email,
            fullname: displayName,
            googleId: id,
        })        
    }
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.redirect(config.FRONTEND_URL || "http://localhost:5173/");
}

async function getMe(req, res) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Not authenticated", success: false });
        }

        const decoded = jwt.verify(token, config.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        res.status(200).json({
            message: "User fetched successfully",
            success: true,
            user: {
                id: user._id,
                email: user.email,
                contact: user.contact,
                fullname: user.fullname,
                role: user.role
            }
        });
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token", success: false });
    }
}

async function logout(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });
    res.status(200).json({ message: "Logged out successfully", success: true });
}

export const authController = {
    register,
    login,
    googleCallback,
    getMe,
    logout
};