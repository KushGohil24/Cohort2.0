import express from "express";
import { config } from "./config/config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const app = express();

app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: config.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.GOOGLE_CALLBACK_URL,  
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}))

import authRoutes from "./routes/auth.routes.js";

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.status(200).json({message:"Server is running"});
});

export default app;
