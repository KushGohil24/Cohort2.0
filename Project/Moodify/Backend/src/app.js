const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

/**
 * Routes
 */
const authRoutes = require("./routes/auth.routes");
const songRoutes = require("./routes/song.routes");
const path = require("path");

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);

// --- DEPLOYMENT FRONTEND SETUP ---
// 1. Serve static files from the 'dist' folder (which you will move into Backend/dist)
app.use(express.static(path.join(__dirname, "../dist")));

// 2. Catch-all route to serve index.html for React Router (must be after API routes)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

module.exports = app;