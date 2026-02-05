import { useState } from "react";
import { loginUser, registerUser } from "../services/authService";

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await loginUser(email, password);
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      onLoginSuccess(result.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: "linear-gradient(135deg, #050816 0%, #0f172a 100%)",
        color: "#e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
      }}
    >
      <div
        style={{
          background: "#0f172a",
          borderRadius: "16px",
          border: "1px solid #1f2933",
          padding: "2.5rem 3rem",
          width: "90%",
          maxWidth: "500px",
          boxSizing: "border-box",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "0.5rem",
            marginTop: 0,
            fontSize: "2rem",
            letterSpacing: "-0.025em",
            fontWeight: "700",
          }}
        >
          GATE Tracker
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#9ca3af",
            marginBottom: "2rem",
            marginTop: 0,
            fontSize: "0.95rem",
          }}
        >
          {showRegisterForm ? "Create your account" : "Login to your account"}
        </p>

        {error && (
          <div
            style={{
              background: "#7f1d1d",
              color: "#fca5a5",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1.5rem",
              fontSize: "0.9rem",
              border: "1px solid #991b1b",
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          <div>
            <label
              style={{
                marginBottom: "0.5rem",
                fontSize: "0.9rem",
                color: "#d1d5db",
                display: "block",
                fontWeight: "600",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                width: "100%",
                padding: "0.75rem",
                background: "#1e293b",
                border: "2px solid #475569",
                borderRadius: "8px",
                color: "#e5e7eb",
                fontSize: "0.95rem",
                boxSizing: "border-box",
                transition: "all 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
              onBlur={(e) => (e.target.style.borderColor = "#475569")}
            />
          </div>

          <div>
            <label
              style={{
                marginBottom: "0.5rem",
                fontSize: "0.9rem",
                color: "#d1d5db",
                display: "block",
                fontWeight: "600",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "0.75rem",
                background: "#1e293b",
                border: "2px solid #475569",
                borderRadius: "8px",
                color: "#e5e7eb",
                fontSize: "0.95rem",
                boxSizing: "border-box",
                transition: "all 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
              onBlur={(e) => (e.target.style.borderColor = "#475569")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "0.8rem",
              background: "#22c55e",
              color: "#020617",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "all 0.3s",
              marginTop: "0.5rem",
            }}
            onMouseEnter={(e) =>
              !loading && (e.target.style.background = "#16a34a")
            }
            onMouseLeave={(e) =>
              !loading && (e.target.style.background = "#22c55e")
            }
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            onClick={() => {
              setShowRegisterForm(true);
              setError("");
            }}
            style={{
              padding: "0.8rem",
              background: "transparent",
              color: "#22c55e",
              border: "2px solid #22c55e",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#1e2817")}
            onMouseLeave={(e) => (e.target.style.background = "transparent")}
          >
            Create New Account
          </button>
        </form>

        {showRegisterForm && (
          <RegisterForm
            onSuccess={onLoginSuccess}
            onCancel={() => {
              setShowRegisterForm(false);
              setError("");
              setEmail("");
              setPassword("");
            }}
          />
        )}
      </div>
    </div>
  );
}

function RegisterForm({ onSuccess, onCancel }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await registerUser(email, password, name);
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      onSuccess(result.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
        marginTop: "1.5rem",
        paddingTop: "1.5rem",
        borderTop: "2px solid #1f2933",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: 0,
          fontSize: "1.3rem",
          fontWeight: "700",
        }}
      >
        Register
      </h3>

      {error && (
        <div
          style={{
            background: "#7f1d1d",
            color: "#fca5a5",
            padding: "0.75rem",
            borderRadius: "8px",
            fontSize: "0.85rem",
            border: "2px solid #991b1b",
          }}
        >
          {error}
        </div>
      )}

      <div>
        <label
          style={{
            marginBottom: "0.5rem",
            fontSize: "0.9rem",
            color: "#d1d5db",
            display: "block",
            fontWeight: "600",
          }}
        >
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "#1e293b",
            border: "2px solid #475569",
            borderRadius: "8px",
            color: "#e5e7eb",
            fontSize: "0.95rem",
            boxSizing: "border-box",
            transition: "all 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
          onBlur={(e) => (e.target.style.borderColor = "#475569")}
        />
      </div>

      <div>
        <label
          style={{
            marginBottom: "0.5rem",
            fontSize: "0.9rem",
            color: "#d1d5db",
            display: "block",
            fontWeight: "600",
          }}
        >
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "#1e293b",
            border: "2px solid #475569",
            borderRadius: "8px",
            color: "#e5e7eb",
            fontSize: "0.95rem",
            boxSizing: "border-box",
            transition: "all 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
          onBlur={(e) => (e.target.style.borderColor = "#475569")}
        />
      </div>

      <div>
        <label
          style={{
            marginBottom: "0.5rem",
            fontSize: "0.9rem",
            color: "#d1d5db",
            display: "block",
            fontWeight: "600",
          }}
        >
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "#1e293b",
            border: "2px solid #475569",
            borderRadius: "8px",
            color: "#e5e7eb",
            fontSize: "0.95rem",
            boxSizing: "border-box",
            transition: "all 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
          onBlur={(e) => (e.target.style.borderColor = "#475569")}
        />
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            flex: 1,
            padding: "0.8rem",
            background: "#22c55e",
            color: "#020617",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "700",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) =>
            !loading && (e.target.style.background = "#16a34a")
          }
          onMouseLeave={(e) =>
            !loading && (e.target.style.background = "#22c55e")
          }
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          style={{
            flex: 1,
            padding: "0.8rem",
            background: "transparent",
            color: "#9ca3af",
            border: "2px solid #475569",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#1e293b")}
          onMouseLeave={(e) => (e.target.style.background = "transparent")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
