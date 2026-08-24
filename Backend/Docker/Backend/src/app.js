import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
    res.json("This is my first Server running in docker")
})

app.get("/api", (req, res) => {
    res.json("API is working");
});

export default app;