const API_URL = "http://localhost:5000/api";

export const registerUser = async (email, password, name) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      try {
        const data = JSON.parse(errorText);
        throw new Error(data.message || "Registration failed");
      } catch (e) {
        throw new Error(`Registration failed: ${response.status} ${errorText}`);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      try {
        const data = JSON.parse(errorText);
        throw new Error(data.message || "Login failed");
      } catch (e) {
        throw new Error(`Login failed: ${response.status} ${errorText}`);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await fetch(`${API_URL}/auth/verify`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data.valid;
  } catch (error) {
    console.error("Token verification error:", error);
    return false;
  }
};
