const express = require('express');

const app = express();
app.use(express.json());
const notes = [];

app.get("/", (req, res)=>{
    res.send("notes api is working");
});

app.get("/notes", (req, res)=>{
    res.send(notes);
});

app.post("/notes", (req, res)=>{
    console.log(req.body);
    notes.push(req.body);
    res.send("note created");
});

app.delete("/notes/:index", (req, res)=>{
    delete notes[req.params.index]
    res.send("note deleted successfully")
});

app.patch("/notes/:index", (req, res)=>{
    notes[req.params.index].description = req.body.description
    res.send("note updated successfully")
})
module.exports = app;