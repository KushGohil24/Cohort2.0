const mongoose = require("mongoose");

let isConnected = false; 

async function connectToDB() {
    // If we're already connected (warm lambda), reuse the connection
    if (isConnected) {
        console.log("Using existing database connection");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000 // Error quickly instead of waiting 10s if blocked
        });
        isConnected = db.connections[0].readyState === 1;
        console.log("Database connected successfully");
    } catch (err) {
        console.log("Error connecting to DB:", err);
    }
}

module.exports = connectToDB;