import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import userModel from "../models/user.model.js";

const authenticateSeller = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decodedToken = jwt.verify(token, config.JWT_SECRET);
        const user = await userModel.findById(decodedToken.id);
        
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if(user.role !== 'seller') {
            return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
        }
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        console.log("Error in authentication", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export { authenticateSeller }