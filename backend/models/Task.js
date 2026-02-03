const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    done: { type: Boolean, default: false },
    date: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    }, // YYYY-MM-DD
  },
  { timestamps: true },
);

module.exports = mongoose.model("Task", taskSchema);
