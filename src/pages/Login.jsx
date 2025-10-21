import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import "./Style.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(saved || (prefersDark ? "dark" : "light"));
  }, []);

  // Apply theme to document body
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handle = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-root">
       {/* 🌗 Theme Toggle Button */}
      <button
        className="theme-toggle"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please login to continue</p>
        </div>

        <form className="login-form" onSubmit={handle}>
          <input
            type="email"
            placeholder="Email address"
            className="login-input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="small-row" style={{ marginTop: 12 }}>
          <span>Don’t have an account?</span>
          <Link to="/register" className="login-link">
            Register
          </Link>
        </div>
      </div>
      {/* Footer */}
      <footer className="login-footer">
        © 2025 Designed By <strong>AMIT YADAV</strong> | All Rights Reserved
      </footer>
    </div>
  );
}
