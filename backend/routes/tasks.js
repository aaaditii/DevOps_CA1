const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET all tasks for today
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADD a new task
router.post("/", async (req, res) => {
  const task = new Task({ text: req.body.text });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// TOGGLE task status
router.patch("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.done = !task.done;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
