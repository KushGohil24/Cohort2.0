import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI) {
    throw new Error("Please provide MONGO_URI");
}
if (!process.env.JWT_SECRET) {
    throw new Error("Please provide JWT_SECRET");
}
if(!process.env.GOOGLE_CLIENT_ID){
    throw new Error("Please provide GOOGLE_CLIENT_ID");
}
if(!process.env.GOOGLE_CLIENT_SECRET){
    throw new Error("Please provide GOOGLE_CLIENT_SECRET");
}
if(!process.env.GOOGLE_CALLBACK_URL){
    throw new Error("Please provide GOOGLE_CALLBACK_URL");
}
export const config = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV || "development",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
}