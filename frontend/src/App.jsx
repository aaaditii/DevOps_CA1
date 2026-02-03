import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import SyllabusPage from "./pages/SyllabusPage";
import ProgressBoardPage from "./pages/ProgressBoardPage";

function App() {
  const [activeTab, setActiveTab] = useState("syllabus");

  // 1. SHARED STATE: Syllabus completion tracker (persisted to localStorage)
  // Total topics = 44 (based on the GATE CS 2026 syllabus provided)
  const [topicStatuses, setTopicStatuses] = useLocalStorage(
    "gateTrackerTopics",
    Array(44).fill(false)
  );

  // 2. HELPER: Calculate progress to pass to ProgressBoard
  const syllabusProgress = {
    completed: topicStatuses.filter(Boolean).length,
    total: 44,
  };

  // 3. HELPER: Function to update status (passed to SyllabusPage)
  const toggleTopic = (index) => {
    const updated = [...topicStatuses];
    updated[index] = !updated[index];
    setTopicStatuses(updated);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050816",
        color: "#e5e7eb",
        margin: 0,
        padding: 0,
        width: "100vw",
        overflowX: "hidden", // Prevent horizontal scroll
      }}
    >
      {/* Header - Full width */}
      <header
        style={{
          padding: "1.5rem 3rem",
          borderBottom: "1px solid #1f2933",
          width: "100%",
        }}
      >
        <h1 style={{ fontSize: "2rem", margin: 0 }}>GATE Tracker</h1>
        <p
          style={{
            margin: "0.25rem 0 0 0",
            color: "#9ca3af",
            fontSize: "1.1rem",
          }}
        ></p>
      </header>

      {/* Main content - Full width with max content width */}
      <main
        style={{
          padding: "2rem 3rem",
          width: "100%",
          maxWidth: "1400px", // Max width for readability
          margin: "0 auto", // Center on ultra-wide screens
        }}
      >
        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "2rem",
            flexWrap: "wrap", // Responsive on smaller screens
          }}
        >
          <button
            onClick={() => setActiveTab("syllabus")}
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "12px",
              border: "2px solid #22c55e",
              cursor: "pointer",
              background: activeTab === "syllabus" ? "#22c55e" : "transparent",
              color: activeTab === "syllabus" ? "#020617" : "#e5e7eb",
              fontSize: "1rem",
              fontWeight: 500,
              minWidth: "200px",
              transition: "all 0.2s",
            }}
          >
            📚 Subject & Syllabus
          </button>
          <button
            onClick={() => setActiveTab("progress")}
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "12px",
              border: "2px solid #22c55e",
              cursor: "pointer",
              background: activeTab === "progress" ? "#22c55e" : "transparent",
              color: activeTab === "progress" ? "#020617" : "#e5e7eb",
              fontSize: "1rem",
              fontWeight: 500,
              minWidth: "200px",
              transition: "all 0.2s",
            }}
          >
            📈 Progress Board
          </button>
        </div>

        {/* Page content - Passing shared state as props */}
        {activeTab === "syllabus" ? (
          <SyllabusPage
            topicStatuses={topicStatuses}
            toggleTopic={toggleTopic}
          />
        ) : (
          <ProgressBoardPage syllabusProgress={syllabusProgress} />
        )}
      </main>
    </div>
  );
}

export default App;
