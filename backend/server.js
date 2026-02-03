// backend/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const topicRoutes = require("./routes/topics");
const taskRoutes = require("./routes/tasks");

const app = express();

// Middlewares
app.use(cors()); // Allow React frontend to connect
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/topics", topicRoutes); // Syllabus checkboxes
app.use("/api/tasks", taskRoutes); // Daily tasks

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
