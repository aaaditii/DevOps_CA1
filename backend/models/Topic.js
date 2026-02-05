// backend/models/Topic.js
const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    subject: String,
    title: String,
    completed: { type: Boolean, default: false },
    userId: { type: String, default: "user1" }, // Simple user ID (expand later)
  },
  { timestamps: true },
);

module.exports;
