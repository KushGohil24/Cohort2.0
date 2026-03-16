require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database");

// Initialize MongoDB connection pool
connectToDB();

// Only listen continuously if not running on Vercel
if (process.env.NODE_ENV !== "production") {
    app.listen(3000, () => {
        console.log("Local Server running on port 3000");
    });
}

// Critical: Export the Express app for Vercel Serverless routing
module.exports = app;