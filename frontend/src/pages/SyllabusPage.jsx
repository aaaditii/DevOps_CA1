// src/pages/SyllabusPage.jsx
const SUBJECTS = [
  {
    name: "1. Engineering Mathematics",
    topics: [
      "Discrete Mathematics: Propositional and first order logic; Sets, relations, functions, partial orders and lattices; Monoids, Groups; Graphs – connectivity, matching, colouring; Combinatorics – counting, recurrence relations, generating functions.",
      "Linear Algebra: Matrices, determinants, system of linear equations, eigenvalues and eigenvectors, LU decomposition.",
      "Calculus: Limits, continuity and differentiability, Maxima and minima, Mean value theorem, Integration.",
      "Probability and Statistics: Random variables; Uniform, normal, exponential, Poisson and binomial distributions; Mean, median, mode and standard deviation; Conditional probability and Bayes theorem.",
    ],
  },
  {
    name: "2. Digital Logic",
    topics: [
      "Boolean algebra.",
      "Combinational and sequential circuits.",
      "Minimization.",
      "Number representations and computer arithmetic – fixed and floating point.",
    ],
  },
  {
    name: "3. Computer Organization and Architecture",
    topics: [
      "Machine instructions and addressing modes.",
      "ALU, datapath and control unit.",
      "Instruction pipelining, pipeline hazards.",
      "Memory hierarchy – cache, main memory and secondary storage; I/O interface – interrupt and DMA mode.",
    ],
  },
  {
    name: "4. Programming and Data Structures",
    topics: [
      "Programming in C.",
      "Recursion.",
      "Arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, graphs.",
    ],
  },
  {
    name: "5. Algorithms",
    topics: [
      "Searching, sorting, hashing.",
      "Asymptotic worst case time and space complexity.",
      "Algorithm design techniques – greedy, dynamic programming and divide-and-conquer.",
      "Graph traversals, minimum spanning trees, shortest paths.",
    ],
  },
  {
    name: "6. Theory of Computation",
    topics: [
      "Regular expressions and finite automata.",
      "Context-free grammars and push-down automata.",
      "Regular and context-free languages, pumping lemma.",
      "Turing machines and undecidability.",
    ],
  },
  {
    name: "7. Compiler Design",
    topics: [
      "Lexical analysis, parsing, syntax-directed translation.",
      "Runtime environments.",
      "Intermediate code generation.",
      "Local optimization; Data flow analyses – constant propagation, liveness analysis, common subexpression elimination.",
    ],
  },
  {
    name: "8. Operating System",
    topics: [
      "System calls, processes, threads, inter-process communication, concurrency and synchronization.",
      "Deadlock.",
      "CPU and I/O scheduling.",
      "Memory management and virtual memory.",
      "File systems.",
    ],
  },
  {
    name: "9. Databases",
    topics: [
      "ER-model.",
      "Relational model – relational algebra, tuple calculus, SQL.",
      "Integrity constraints, normal forms.",
      "File organization, indexing (e.g., B and B+ trees).",
      "Transactions and concurrency control.",
    ],
  },
  {
    name: "10. Computer Networks",
    topics: [
      "Concept of layering – OSI and TCP/IP Protocol Stacks.",
      "Basics of packet, circuit and virtual circuit-switching.",
      "Data link layer – framing, error detection, Medium Access Control, Ethernet bridging.",
      "Routing protocols – shortest path, flooding, distance vector and link state routing.",
      "Fragmentation and IP addressing – IPv4, CIDR notation; Basics of IP support protocols – ARP, DHCP, ICMP; Network Address Translation (NAT).",
      "Transport layer – flow control and congestion control, UDP, TCP, sockets.",
      "Application layer protocols – DNS, SMTP, HTTP, FTP, Email.",
    ],
  },
];

function SyllabusPage({ topicStatuses = [], toggleTopic = () => {} }) {
  // One boolean per topic across all subjects
  const totalTopics = SUBJECTS.reduce((acc, s) => acc + s.topics.length, 0);

  const completedTopics = topicStatuses.filter(Boolean).length;
  const completionPercentage =
    totalTopics === 0 ? 0 : ((completedTopics / totalTopics) * 100).toFixed(1);

  return (
    <div>
      <h2 style={{ marginBottom: "1.5rem", fontSize: "1.75rem" }}>
        Subject & Syllabus
      </h2>
      <p style={{ marginBottom: "1.5rem", color: "#9ca3af" }}></p>

      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
        }}
      >
        {SUBJECTS.map((subj, subjIndex) => {
          const offsetBefore = SUBJECTS.slice(0, subjIndex).reduce(
            (acc, s) => acc + s.topics.length,
            0,
          );

          return (
            <div
              key={subj.name}
              style={{
                borderRadius: "1rem",
                padding: "1.5rem",
                background: "#020617",
                border: "1px solid #374151",
                minHeight: "320px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3
                style={{
                  margin: "0 0 1rem 0",
                  fontSize: "1.25rem",
                  color: "#22c55e",
                }}
              >
                {subj.name}
              </h3>

              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {subj.topics.map((topic, idx) => {
                  const globalIndex = offsetBefore + idx;
                  const checked = topicStatuses[globalIndex];

                  return (
                    <label
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        cursor: "pointer",
                        padding: "0.5rem 0.4rem",
                        borderRadius: "0.5rem",
                        background: checked ? "#0f172a" : "transparent",
                        transition: "background 0.15s ease",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleTopic(globalIndex)}
                        style={{
                          // FIX: force uniform size
                          width: "18px",
                          height: "18px",
                          minWidth: "18px",
                          minHeight: "18px",
                          marginTop: "2px",
                          cursor: "pointer",
                          accentColor: "#22c55e",
                          appearance: "auto",
                        }}
                      />
                      <span
                        style={{
                          lineHeight: "1.4",
                          color: "#e5e7eb",
                          fontSize: "0.95rem",
                        }}
                      >
                        {topic}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom overall progress summary */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem 1.5rem",
          borderRadius: "1rem",
          background: "#020617",
          border: "1px solid #374151",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <div style={{ fontSize: "1.1rem" }}>
          Overall progress:{" "}
          <span style={{ color: "#22c55e", fontWeight: 600 }}>
            {completedTopics}/{totalTopics} topics
          </span>
        </div>
        <div
          style={{
            fontSize: "1.2rem",
            fontWeight: 600,
            color:
              completionPercentage >= 70
                ? "#22c55e"
                : completionPercentage >= 40
                  ? "#f59e0b"
                  : "#ef4444",
          }}
        >
          {completionPercentage}%
        </div>
      </div>
    </div>
  );
}

export default SyllabusPage;
