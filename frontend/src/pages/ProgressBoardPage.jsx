// src/pages/ProgressBoardPage.jsx - VERSION WITH PROGRESS BAR + DATABASE INTEGRATION
import { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const API_URL = "http://localhost:5000/api/tasks";

function daysUntilExam(examDateStr) {
  const today = new Date();
  const examDate = new Date(examDateStr);
  const diffMs = examDate - today;
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

function ProgressBoardPage({ syllabusProgress = { completed: 0, total: 44 } }) {
  // Exam Date State (persisted to localStorage)
  const [examDate, setExamDate] = useLocalStorage("gateExamDate", "2026-02-01");
  const [isEditingDate, setIsEditingDate] = useState(false);
  const daysLeft = daysUntilExam(examDate);

  // Daily Tasks State - Fetch from database
  const [todayTasks, setTodayTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");

  // Fetch tasks from database on page load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTodayTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  const addTask = async () => {
    if (newTaskText.trim() === "") return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newTaskText.trim() }),
      });
      const newTask = await res.json();
      setTodayTasks([...todayTasks, newTask]);
      setNewTaskText("");
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const toggleTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
      });
      const updatedTask = await res.json();
      setTodayTasks(
        todayTasks.map((task) => (task._id === id ? updatedTask : task)),
      );
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      setTodayTasks(todayTasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const completedTasks = todayTasks.filter((task) => task.done).length;

  // Syllabus Progress Calculation
  const percentage =
    syllabusProgress.total > 0
      ? ((syllabusProgress.completed / syllabusProgress.total) * 100).toFixed(1)
      : 0;

  return (
    <div
      style={{ display: "grid", gap: "2rem", gridTemplateColumns: "1fr 1fr" }}
    >
      {/* Left Column: Countdown + Daily Tasks */}
      <div>
        <h2 style={{ marginBottom: "1.5rem", fontSize: "1.75rem" }}>
          Daily Progress
        </h2>

        {/* Exam Countdown Card */}
        <div
          style={{
            marginBottom: "2rem",
            padding: "1.5rem",
            borderRadius: "1rem",
            background: "#020617",
            border: "1px solid #374151",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.5rem",
              color: "#9ca3af",
            }}
          >
            <span>Target Exam Date:</span>
            {!isEditingDate ? (
              <>
                <span style={{ color: "#e5e7eb", fontWeight: 500 }}>
                  {examDate}
                </span>
                <button
                  onClick={() => setIsEditingDate(true)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#22c55e",
                    textDecoration: "underline",
                  }}
                >
                  Change
                </button>
              </>
            ) : (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  style={{
                    background: "#1e293b",
                    border: "1px solid #374151",
                    color: "#fff",
                    borderRadius: "0.25rem",
                    padding: "0.2rem",
                  }}
                />
                <button
                  onClick={() => setIsEditingDate(false)}
                  style={{
                    background: "#22c55e",
                    border: "none",
                    borderRadius: "0.25rem",
                    padding: "0.2rem 0.5rem",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Save
                </button>
              </div>
            )}
          </div>
          <div
            style={{
              fontSize: "3.5rem",
              fontWeight: "bold",
              color: daysLeft < 60 ? "#ef4444" : "#22c55e",
              margin: 0,
            }}
          >
            {daysLeft} days
          </div>
          <div style={{ fontSize: "1rem", color: "#9ca3af" }}>left</div>
        </div>

        {/* Tasks Section */}
        <div
          style={{
            padding: "1.5rem",
            borderRadius: "1rem",
            background: "#020617",
            border: "1px solid #374151",
          }}
        >
          <h3 style={{ margin: "0 0 1rem 0" }}>Add Task</h3>
          <div
            style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}
          >
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="What needs to be done?"
              style={{
                flex: 1,
                padding: "0.6rem",
                borderRadius: "0.5rem",
                background: "#111827",
                border: "1px solid #374151",
                color: "#fff",
              }}
              onKeyPress={(e) => e.key === "Enter" && addTask()}
            />
            <button
              onClick={addTask}
              style={{
                padding: "0.6rem 1.2rem",
                background: "#22c55e",
                border: "none",
                borderRadius: "0.5rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Add
            </button>
          </div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {todayTasks.length === 0 ? (
              <p style={{ color: "#9ca3af", textAlign: "center" }}>
                No tasks yet!
              </p>
            ) : (
              todayTasks.map((task) => (
                <li
                  key={task._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.8rem",
                    background: "#0f172a",
                    borderRadius: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task._id)}
                    style={{
                      width: "1.2rem",
                      height: "1.2rem",
                      accentColor: "#22c55e",
                    }}
                  />
                  <span
                    style={{
                      flex: 1,
                      textDecoration: task.done ? "line-through" : "none",
                      color: task.done ? "#6b7280" : "#fff",
                    }}
                  >
                    {task.text}
                  </span>
                  <button
                    onClick={() => deleteTask(task._id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#ef4444",
                      cursor: "pointer",
                      fontSize: "1.2rem",
                    }}
                  >
                    ×
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* Right Column: Syllabus Progress Bar */}
      <div>
        <h2 style={{ marginBottom: "1.5rem", fontSize: "1.75rem" }}>
          Syllabus Overview
        </h2>
        <div
          style={{
            padding: "2rem",
            borderRadius: "1rem",
            background: "#020617",
            border: "1px solid #374151",
            textAlign: "center",
          }}
        >
          <h3 style={{ marginBottom: "1.5rem", color: "#22c55e" }}>
            Overall Completion
          </h3>

          {/* Large Percentage Display */}
          <div
            style={{
              fontSize: "4.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            {percentage}%
          </div>

          {/* PROGRESS BAR CONTAINER */}
          <div
            style={{
              width: "100%",
              height: "24px",
              background: "#1f2933",
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "1.5rem",
              border: "1px solid #374151",
            }}
          >
            {/* ACTUAL PROGRESS FILL */}
            <div
              style={{
                width: `${percentage}%`,
                height: "100%",
                background: "linear-gradient(90deg, #22c55e, #4ade80)",
                transition: "width 0.5s ease-in-out",
                boxShadow: "0 0 10px rgba(34, 197, 94, 0.4)",
              }}
            />
          </div>

          <p style={{ color: "#9ca3af", fontSize: "1.1rem" }}>
            {syllabusProgress.completed} of {syllabusProgress.total} topics
            mastered
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProgressBoardPage;
