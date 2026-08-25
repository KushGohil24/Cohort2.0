import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static("public"))

app.get("/", (req, res)=>{
    res.json("This is my first Server running in docker")
})

app.get("/api", (req, res) => {
    res.json("API is working");
});

app.get("/api/users", (req, res) => {
    const users = [
        {
            id: 1,
            name: "Aman"
        },
        {
            id: 2,
            name: "Ram"
        },
        {
            id: 3,
            name: "Shyam"
        }
    ]
    res.json({
        success: true,
        users: users
    });
})

app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

export default app;