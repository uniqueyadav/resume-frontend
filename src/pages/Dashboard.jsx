import React, { useEffect, useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);
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

  const fetchResumes = async () => {
    try {
      const { data } = await api.get("/resumes");
      setResumes(data);
    } catch (err) {
      console.error("Failed to load resumes", err);
    } finally {
      setLoading(false);
    }
  };

  const createNew = async () => {
    const template = {
      name: "Your Name",
      headline: "Software Developer",
      summary: "A passionate developer.",
      skills: ["JavaScript", "React"],
      experiences: [],
      education: [],
    };
    try {
      const { data } = await api.post("/resumes", template);
      navigate(`/resume/${data._id}/edit`);
    } catch (err) {
      alert("Failed to create resume");
    }
  };
  console.log(createNew);

  // 🗑️ Delete resume
  const deleteResume = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;
    try {
      await api.delete(`/resumes/${id}`);
      setResumes(resumes.filter((r) => r._id !== id)); 
    } catch (err) {
      console.error("Failed to delete resume", err);
      alert("Failed to delete resume");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="dashboard-root">
      {/* 🌗 Theme Toggle Button */}
      <button
        className="theme-toggle"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Your Resumes</h2>
          <button className="dashboard-btn" onClick={createNew}>
            + Create New
          </button>
        </div>

        {loading ? (
          <p className="dashboard-loading">Loading your resumes...</p>
        ) : resumes.length === 0 ? (
          <p className="dashboard-empty">No resumes found. Create one!</p>
        ) : (
          <div className="resume-list">
            {resumes.map((r) => (
              <div className="resume-card" key={r._id}>
                <h3>{r.headline || "Untitled Resume"}</h3>
                <p className="resume-summary">{r.summary || "No summary added yet."}</p>
                <div className="resume-actions">
                  <Link to={`/resume/${r._id}/edit`} className="login-link">
                    Edit
                  </Link>
                  <span>|</span>
                  <Link to={`/resume/${r._id}/preview`} className="login-link">
                    Preview
                  </Link>
                  <span>|</span>
                  <button
                    className="delete-btn"
                    onClick={() => deleteResume(r._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="dashboard-footer">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
       {/* Footer */}
      <footer className="login-footer">
        © 2025 Designed By <strong>AMIT YADAV</strong> | All Rights Reserved
      </footer>
    </div>
  );
}
