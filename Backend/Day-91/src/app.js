const express = require("express");
const noteModel = require("./model/notes.model");
const { default: mongoose } = require("mongoose");

const app = express();

app.use(express.json());

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;
  const note = await noteModel.create({
    title,
    description,
  });
  res.status(201).json({
    message: "note created successfully",
    note,
  });
});

app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();
  res.status(200).json({
    message: "notes fetched successfully",
    notes,
  });
});

module.exports = app;