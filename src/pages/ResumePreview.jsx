import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import "./Style.css";

export default function ResumePreview() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    load();
  }, [id]);

  async function load() {
    try {
      const { data } = await api.get(`/resumes/public/${id}`);
      setResume(data);
    } catch (err) {
      console.error("Error loading resume:", err);
    }
  }

  if (!resume) return <div className="preview-loading">Loading...</div>;

  return (
    <div className="preview-root">
      <div className="preview-card">
       <div className="head">
         <header className="preview-header">
          <h1>{resume.name || "Your Name"}</h1>
        </header>
        <div className="header-right">
          <p>
            {resume.email} | {resume.phone} | {resume.address}
          </p>
          <div className="git">
          <p><b>Linkedin - </b>{resume.linkedin}</p>
          <p><b>GitHub - </b>{resume.github}</p>
        </div>
        </div>
       </div>
        
        <div className="lin"></div>
        <section>
          <span className="basic-heading" >{resume.headline}</span>
          <div className="line"></div>
          <p className="summary">{resume.summary}</p>
        </section>
        <section>
          <span className="basic-heading">Skills</span>
          <div className="line"></div><br />
          <ul className="skills-list">
            {(resume.skills || []).map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>

        <section>
          <span className="basic-heading">Experience</span>
          <div className="line"></div><br />
          {(resume.experiences || []).map((ex, idx) => (
            <div key={idx} className="experience-item">
              <strong>
                {ex.title} — {ex.company}
              </strong>
              <p className="small">
                {ex.from} - {ex.to}
              </p>
              <p>{ex.description}</p>
            </div>
          ))}
        </section>

        <section>
          <span className="basic-heading">Education</span>
          <div className="line"></div><br />
          {(resume.education || []).map((ed, idx) => (
            <div key={idx} className="education-item">
              <div className="college">
                <strong>
                {ed.institution}
              </strong>
              </div><br />
              <div className="year">
                <span className="small">{ed.year}</span>
              </div>
              <ul>
                <li><strong>{ed.degree}</strong> in <span>{ed.stream}</span></li>
              </ul>
              <span className="score">{ed.score}</span>
              <span>{ed.note}</span>
            </div>
          ))}
        </section>

        <section>
          <span className="basic-heading">Projects</span>
          <div className="line"></div><br />
          {(resume.projects || []).map((p, idx) => (
            <div key={idx} className="project-item">
              <strong>{p.title}</strong><br />
              <small>{p.description}</small>
              <p className="small"><b>Technology:</b> {p.tech}</p>
            </div>
          ))}
        </section>

        <section>
          <span className="basic-heading">Certifications</span>
          <div className="line"></div><br />
          {(resume.certifications || []).map((c, idx) => (
            <div key={idx} className="cert-item">
              <strong>{c.name}</strong> – {c.issuedBy} ({c.year})
            </div>
          ))}
        </section>

        <section>
          <span className="basic-heading">
            {(resume.other || []).map((h, i) => (
        <span key={i} className="other-heading">{h.heading}</span>
      ))}
          </span>
          <div className="line"></div><br />
          {(resume.other || []).map((o, idx) => (
            <div key={idx} className="project-item">
              <strong>{o.details1}</strong>
              <p>{o.details2}</p>
              <small className="small"> {o.details3}</small>
            </div>
          ))}
        </section>

        <footer className="preview-footer">
          <button onClick={() => window.print()} className="print-btn">
            🖨️ Print / Save as PDF
          </button>
        </footer>
      </div>
       {/* Footer */}
      <footer className="login-footer">
        © 2025 Designed By <strong>AMIT YADAV</strong> | All Rights Reserved
      </footer>
    </div>
  );
}
