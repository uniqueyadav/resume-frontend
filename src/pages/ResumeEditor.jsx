import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";
import "./Style.css";

export default function ResumeEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  const [resume, setResume] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    headline: "",
    summary: "",
    skills: [],
    experiences: [],
    education: [],
    projects: [],
    certifications: [],
    other:[],
  });
  const [saving, setSaving] = useState(false);

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

  useEffect(() => {
    if (id) loadResume();
  }, [id]);

  async function loadResume() {
    try {
      const { data } = await api.get(`/resumes/${id}`);
      setResume({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        linkedin: data.linkedin || "",
        github: data.github || "",
        headline: data.headline || "",
        summary: data.summary || "",
        skills: data.skills || [],
        experiences: data.experiences || [],
        education: data.education || [],
        projects: data.projects || [],
        certifications: data.certifications || [],
        other: data.other || [],
      });
    } catch (err) {
      console.error("Failed to load resume", err);
    }
  }

  const saveResume = async () => {
    try {
      setSaving(true);
      await api.put(`/resumes/${id}`, resume);
      alert("Resume saved successfully!");
    } catch (err) {
      alert("Error saving resume. Try again!");
    } finally {
      setSaving(false);
    }
  };

  const handleArrayChange = (key, value, index) => {
    const arr = [...resume[key]];
    arr[index] = value;
    setResume({ ...resume, [key]: arr });
  };

  const addArrayItem = (key, template) => {
    setResume({ ...resume, [key]: [...resume[key], template] });
  };

  return (
    <div className="editor-root">
      {/* 🌗 Theme Toggle Button */}
      <button
        className="theme-toggle"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      <div className="editor-container">
        <header className="editor-header">
          <h2>Edit Resume</h2>
          <div className="editor-actions">
            <button className="save-btn" onClick={saveResume} disabled={saving}>
              {saving ? "Saving..." : "💾 Save"}
            </button>
            <button className="preview-btn" onClick={() => navigate(`/resume/${id}/preview`)}>
              👁️ Preview
            </button>
          </div>
        </header>

        <section className="editor-section">
          <h3>Basic Info</h3>
          <input
            type="text"
            placeholder="Full Name"
            value={resume.name}
            onChange={(e) => setResume({ ...resume, name: e.target.value })}
            className="editor-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={resume.email}
            onChange={(e) => setResume({ ...resume, email: e.target.value })}
            className="editor-input"
          />
          <input
            type="text"
            placeholder="Phone (Ex- +91 XXXXXXXXXX)"
            value={resume.phone}
            onChange={(e) => setResume({ ...resume, phone: e.target.value })}
            className="editor-input"
          />
          <input
            type="text"
            placeholder="Address"
            value={resume.address}
            onChange={(e) => setResume({ ...resume, address: e.target.value })}
            className="editor-input"
          />
          <input
            type="text"
            placeholder="Linkedin Link"
            value={resume.linkedin}
            onChange={(e) => setResume({ ...resume, linkedin: e.target.value })}
            className="editor-input"
          />
          <input
            type="text"
            placeholder="GitHub Link"
            value={resume.github}
            onChange={(e) => setResume({ ...resume, github: e.target.value })}
            className="editor-input"
          />
          
        </section>

        <section className="editor-section">
          <h3>Headline & Summary</h3>
          <input
            type="text"
            placeholder="Headline"
            value={resume.headline}
            onChange={(e) => setResume({ ...resume, headline: e.target.value })}
            className="editor-input"
          />
          <textarea
            rows={3}
            placeholder="Summary"
            value={resume.summary}
            onChange={(e) => setResume({ ...resume, summary: e.target.value })}
            className="editor-textarea"
          />
        </section>

        <section className="editor-section">
          <h3>Skills</h3>
          <input
            type="text"
            placeholder="Comma separated skills"
            value={resume.skills.join(", ")}
            onChange={(e) => setResume({ ...resume, skills: e.target.value.split(",").map(s => s.trim()) })}
            className="editor-input"
          />
        </section>

        <section className="editor-section">
          <h3>Experiences</h3>
          {resume.experiences.map((exp, idx) => (
            <div key={idx} className="editor-array-item">
              <input
                placeholder="Title"
                value={exp.title}
                onChange={(e) => handleArrayChange("experiences", { ...exp, title: e.target.value }, idx)}
                className="editor-input"
              />
              <input
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleArrayChange("experiences", { ...exp, company: e.target.value }, idx)}
                className="editor-input"
              />
              <input
                placeholder="From"
                value={exp.from}
                onChange={(e) => handleArrayChange("experiences", { ...exp, from: e.target.value }, idx)}
                className="editor-input"
              />
              <input
                placeholder="To"
                value={exp.to}
                onChange={(e) => handleArrayChange("experiences", { ...exp, to: e.target.value }, idx)}
                className="editor-input"
              />
              <textarea
                placeholder="Description"
                rows={2}
                value={exp.description}
                onChange={(e) => handleArrayChange("experiences", { ...exp, description: e.target.value }, idx)}
                className="editor-textarea"
              />
            </div>
          ))}
          <button className="add-btn" onClick={() => addArrayItem("experiences", { title: "", company: "", from: "", to: "", description: "" })}>
            + Add Experience
          </button>
        </section>

        <section className="editor-section">
          <h3>Education</h3>
          {resume.education.map((edu, idx) => (
            <div key={idx} className="editor-array-item">
              <input
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleArrayChange("education", { ...edu, degree: e.target.value }, idx)}
                className="editor-input"
              />
              <input
                placeholder="Stream/Branch"
                value={edu.stream}
                onChange={(e) => handleArrayChange("education", { ...edu, stream: e.target.value }, idx)}
                className="editor-input"
              />
              <input
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => handleArrayChange("education", { ...edu, institution: e.target.value }, idx)}
                className="editor-input"
              />
              <input
                placeholder="Year"
                value={edu.year}
                onChange={(e) => handleArrayChange("education", { ...edu, year: e.target.value }, idx)}
                className="editor-input"
              />
              <input
                placeholder="Score/Grade (Ex- Score : 80% / Grade : A)"
                value={edu.score}
                onChange={(e) => handleArrayChange("education", { ...edu, score: e.target.value }, idx)}
                className="editor-input"
              />
              <textarea
                placeholder="Note"
                rows={2}
                value={edu.note}
                onChange={(e) => handleArrayChange("education", { ...edu, note: e.target.value }, idx)}
                className="editor-textarea"
              />
            </div>
          ))}
          <button className="add-btn" onClick={() => addArrayItem("education", { degree: "", institution: "", year: "", note: "" })}>
            + Add Education
          </button>
        </section>

        <section className="editor-section">
          <h3>Projects</h3>
          {resume.projects.map((proj, idx) => (
            <div key={idx} className="editor-array-item">
              <input
                placeholder="Title"
                value={proj.title}
                onChange={(e) => handleArrayChange("projects", { ...proj, title: e.target.value }, idx)}
                className="editor-input"
              />
              <textarea
                placeholder="Description"
                rows={2}
                value={proj.description}
                onChange={(e) => handleArrayChange("projects", { ...proj, description: e.target.value }, idx)}
                className="editor-textarea"
              />
              <input
                placeholder="Tech"
                value={proj.tech}
                onChange={(e) => handleArrayChange("projects", { ...proj, tech: e.target.value }, idx)}
                className="editor-input"
              />
            </div>
          ))}
          <button className="add-btn" onClick={() => addArrayItem("projects", { title: "", description: "", tech: "" })}>
            + Add Project
          </button>
        </section>

        <section className="editor-section">
          <h3>Certifications</h3>
          {resume.certifications.map((cert, idx) => (
            <div key={idx} className="editor-array-item">
              <input
                placeholder="Name"
                value={cert.name}
                onChange={(e) => handleArrayChange("certifications", { ...cert, name: e.target.value }, idx)}
                className="editor-input"
              />
              <input
                placeholder="Issued By"
                value={cert.issuedBy}
                onChange={(e) => handleArrayChange("certifications", { ...cert, issuedBy: e.target.value }, idx)}
                className="editor-input"
              />
              <input
                placeholder="Year"
                value={cert.year}
                onChange={(e) => handleArrayChange("certifications", { ...cert, year: e.target.value }, idx)}
                className="editor-input"
              />
            </div>
          ))}
          <button className="add-btn" onClick={() => addArrayItem("certifications", { name: "", issuedBy: "", year: "" })}>
            + Add Certification
          </button>
        </section>
        <section className="editor-section">
          <h3>Other Details</h3>
          {resume.other.map((oth, idx) => (
            <div key={idx} className="editor-array-item">
              <input
                placeholder="Heading"
                value={oth.heading}
                onChange={(e) => handleArrayChange("other", { ...oth, heading: e.target.value }, idx)}
                className="editor-input"
              />
              <input
                placeholder="Details in strong text"
                value={oth.details1}
                onChange={(e) => handleArrayChange("other", { ...oth, details1: e.target.value }, idx)}
                className="editor-input"
              />
              <input
                placeholder="Details in medium text"
                value={oth.details2}
                onChange={(e) => handleArrayChange("other", { ...oth, details2: e.target.value }, idx)}
                className="editor-input"
              />
              <input
                placeholder="Details in small text"
                value={oth.details3}
                onChange={(e) => handleArrayChange("other", { ...oth, details3: e.target.value }, idx)}
                className="editor-input"
              />
            </div>
          ))}
          <button className="add-btn" onClick={() => addArrayItem("other", { heading:"", details1: "", details2: "", details3: "" })}>
            + Add Other Details
          </button>
        </section>
      </div>
       {/* Footer */}
      <footer className="login-footer">
        © 2025 Designed By <strong>AMIT YADAV & Aditya Ranjan</strong> | All Rights Reserved
      </footer>
    </div>
  );
}
