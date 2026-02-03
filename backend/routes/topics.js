const express = require("express");
const router = express.Router();
const Topic = require("../models/Topic");

// GET all topic statuses
router.get("/", async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a topic status (toggle checkbox)
router.post("/toggle", async (req, res) => {
  const { index, completed } = req.body;
  try {
    let topic = await Topic.findOneAndUpdate(
      { index },
      { completed },
      { upsert: true, new: true },
    );
    res.json(topic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
