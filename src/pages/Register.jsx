import React, { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import "./Style.css";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/register", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="login-root">
      <div className="login-card">
        <div className="login-header">
          <h2>Create an Account</h2>
          <p>Join us and get started today</p>
        </div>

        <form className="login-form" onSubmit={handle}>
          <input
            type="text"
            placeholder="Full Name"
            className="login-input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
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
            Register
          </button>
        </form>

        <div className="small-row" style={{ marginTop: 12 }}>
          <span>Already have an account?</span>
          <Link to="/" className="login-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
