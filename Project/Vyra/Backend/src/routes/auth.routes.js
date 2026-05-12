import express from "express";
import { authController } from "../controllers/auth.controller.js";
import { validateLoginUser, validateRegisterUser } from "../validator/auth.validator.js";
import passport from "passport";

const router = express.Router();

router.post("/register", validateRegisterUser, authController.register);
router.post("/login", validateLoginUser, authController.login);

// /api/auth/google
router.get("/google", 
    passport.authenticate("google", { scope: ["email", "profile"] }),
)
router.get("/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/login"
    }
    ),
    authController.googleCallback
)

router.get("/getme", authController.getMe);
router.post("/logout", authController.logout);

export default router;