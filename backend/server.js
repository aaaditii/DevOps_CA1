// backend/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const topicRoutes = require("./routes/topics");
const taskRoutes = require("./routes/tasks");
const authRoutes = require("./routes/auth");

const app = express();

// Middlewares
app.use(cors()); // Allow React frontend to connect
app.use(express.json()); // Parse JSON bodies

// Error handling middleware for JSON parsing
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: "Invalid JSON" });
  }
  next(err);
});

// Test endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Routes
app.use("/api/auth", authRoutes); // Authentication
app.use("/api/topics", topicRoutes); // Syllabus checkboxes
app.use("/api/tasks", taskRoutes); // Daily tasks

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✓ MongoDB Connected"))
  .catch((err) => {
    console.error("✗ MongoDB Error:", err.message);
    console.error("Make sure MongoDB is running on", process.env.MONGO_URI);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

