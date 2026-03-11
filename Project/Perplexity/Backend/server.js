import dotenv from "dotenv";
import { app } from "./src/app.js";
import connectDB from "./src/config/database.js";

dotenv.config({
    path: './.env'
});

const PORT = process.env.PORT || 8000;

connectDB()
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    });

app.listen(PORT, () => {
    console.log(`⚙️ Server is running at port : ${PORT}`);
});