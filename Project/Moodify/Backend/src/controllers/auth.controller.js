const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache")
const handleRegister = async (req, res) => {
    const { username, email, password } = req.body;
    const isAlreadyRegistered = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })

    if (isAlreadyRegistered) {
        return res.status(400).json({
            message: "User with the same email or username already exists"
        })
    }

    const hash = bcrypt.hashSync(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    })
    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, {
        expiresIn: "3d"
    })
    res.cookie("token", token)
    return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}
const handleLogin = async (req, res) => {
    const { email, username, password } = req.body;
    const user = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    }).select("+password")

    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, {
        expiresIn: "3d"
    })

    res.cookie("token", token);

    return res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

const getMe = async (req, res) => {
    const user = await userModel.findById(req.user.id);
    return res.status(200).json({
        message: "User fetched successfully",
        user
    })
}

const handleLogout = async (req, res) => {
    const token = req.cookies.token;
    res.clearCookie('token');
    
    await redis.set(token, Date.now().toString(), "EX", 60 * 60);

    return res.status(200).json({
        message: "Logout successfully"
    })
}
module.exports = {
    handleRegister,
    handleLogin,
    getMe,
    handleLogout
}