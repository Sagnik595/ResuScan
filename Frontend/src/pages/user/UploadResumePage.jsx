import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import ResumeUploadZone from "../../components/upload/ResumeUploadZone";
import UploadedFileCard from "../../components/upload/UploadedFileCard";
import ParsingProgress from "../../components/upload/ParsingProgress";
import api from "../../services/axiosInstance";

/* ─── Inject global styles ─────────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

  :root {
    --bg: #05070f;
    --surface: #0c0f1e;
    --surface-2: #111528;
    --surface-3: #161b33;

    --border: rgba(255, 255, 255, 0.07);
    --border-strong: rgba(99, 102, 241, 0.25);

    --text-primary: #f8fafc;
    --text-secondary: #cbd5e1;
    --text-muted: #7b82a8;

    --indigo: #6366f1;
    --violet: #8b5cf6;
    --emerald: #10b981;

    --gradient-primary: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    --gradient-glow: linear-gradient(135deg, rgba(99, 102, 241, 0.18), rgba(139, 92, 246, 0.12));

    --shadow-card: 0 20px 60px rgba(0, 0, 0, 0.45);
    --shadow-hover: 0 28px 80px rgba(99, 102, 241, 0.16);
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Outfit', sans-serif;
    background-color: var(--bg);
    margin: 0;
  }

  .urp-page {
    min-height: 100vh;
    background:
      radial-gradient(circle at top left, rgba(99, 102, 241, 0.10), transparent 40%),
      radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.06), transparent 35%),
      #05070f;
    color: var(--text-primary);
    position: relative;
    overflow-x: hidden;
    font-family: 'Outfit', sans-serif;
    padding: 2rem 1rem;
  }

  .urp-page::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
    pointer-events: none;
    z-index: 0;
  } /* <-- FIXED: Added missing closing brace here */

  /* ─── Content Container Layout ─── */
  .urp-content {
    position: relative;
    z-index: 1;
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  /* ─── Header Typography Elements ─── */
  .urp-header {
    text-align: center;
    margin-bottom: 1rem;
  }

  .urp-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 600;
    color: var(--indigo);
    letter-spacing: 0.1em;
    margin-bottom: 0.75rem;
    background: rgba(99, 102, 241, 0.08);
    padding: 4px 12px;
    border-radius: 9999px;
    border: 1px solid rgba(99, 102, 241, 0.15);
  }

  .urp-eyebrow-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--emerald);
    box-shadow: 0 0 8px var(--emerald);
  }

  .urp-title {
    font-size: clamp(2rem, 4vw, 2.75rem);
    font-weight: 800;
    color: var(--text-primary);
    margin: 0 0 1rem;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  .urp-title-accent {
    background: linear-gradient(135deg, #a5b4fc 0%, var(--violet) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .urp-subtitle {
    font-size: clamp(0.95rem, 2vw, 1.1rem);
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
    font-weight: 400;
  }

  /* ─── Steps Tracker ─── */
  .urp-steps {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 1.25rem;
    border-radius: 16px;
  }
  .urp-step {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .urp-step-circle {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    border: 1px solid var(--border);
    background: var(--surface-2);
    color: var(--text-muted);
  }
  .urp-step-circle.active {
    background: var(--indigo);
    border-color: var(--indigo);
    color: #fff;
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
  }
  .urp-step-circle.done {
    background: rgba(16, 185, 129, 0.1);
    border-color: var(--emerald);
    color: var(--emerald);
  }
  .urp-step-label {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-muted);
  }
  .urp-step-label.active { color: var(--text-primary); }
  .urp-step-label.done { color: var(--text-secondary); }
  .urp-step-connector {
    flex: 1;
    max-width: 60px;
    height: 2px;
    background: var(--border);
  }
  .urp-step-connector.filled { background: var(--indigo); }

  /* ─── Divider section ─── */
  .urp-divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0.5rem 0;
  }
  .urp-divider-line {
    flex: 1;
    height: 1px;
    background: var(--border);
  }
  .urp-divider-label {
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: var(--text-muted);
  }

  .urp-space {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* ─── Skill Cards & Chips ─── */
  .urp-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 1.75rem;
    position: relative;
    overflow: hidden;
  }
  .urp-skills-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
    border-bottom: 1px solid var(--border);
    padding-bottom: 0.75rem;
  }
  .urp-skills-title {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0;
  }
  .urp-skills-count {
    font-size: 12px;
    color: var(--emerald);
    background: rgba(16, 185, 129, 0.1);
    padding: 2px 10px;
    border-radius: 99px;
    font-weight: 500;
  }
  .urp-skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .urp-skill-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    padding: 6px 14px;
    border-radius: 99px;
    background: var(--surface-2);
    border: 1px solid var(--border);
    color: var(--text-secondary);
  }
  .urp-chip-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--indigo);
  }
`;

/* ─── inject once ────────────────────────────────────────────────────────────── */
let styleInjected = false;
function injectStyles() {
  if (styleInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.textContent = STYLES;
  document.head.appendChild(el);
  styleInjected = true;
}

/* ─── chip color pool ────────────────────────────────────────────────────────── */
const CHIP_CLASSES = [
  "urp-chip-blue",
  "urp-chip-cyan",
  "urp-chip-indigo",
  "urp-chip-violet",
  "urp-chip-sky",
];

/* ─── Step tracker component ─────────────────────────────────────────────────── */
function StepTracker({ step }) {
  const steps = ["Upload", "Process", "Insights"];
  return (
    <div className="urp-steps">
      {steps.map((label, i) => {
        const num = i + 1;
        const status =
          step > num ? "done" : step === num ? "active" : "idle";
        return (
          <React.Fragment key={i}>
            <div className="urp-step">
              <div className={`urp-step-circle ${status}`}>
                {status === "done" ? "✓" : num}
              </div>
              <span className={`urp-step-label ${status}`}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`urp-step-connector ${step > num ? "filled" : ""}`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────────────────── */
const UploadResumePage = () => {
  useEffect(() => {
    injectStyles();
  }, []);

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [parsingStatus, setParsingStatus] = useState("");
  const [skills, setSkills] = useState([]);

  /* derive current step */
  const currentStep =
    skills.length > 0
      ? 3
      : parsingStatus === "processing"
      ? 2
      : file
      ? 1
      : 0;

  const handleFileSelect = async (selectedFile) => {
    setFile(selectedFile);
    setSkills([]);
    setParsingStatus("");

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("pdf", selectedFile);

      const uploadRes = await api.post("/user/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!uploadRes.data.success) {
        toast.error(uploadRes.data.message);
        return;
      }

      setParsingStatus("processing");

      const parseRes = await api.post("/user/parse", {
        resumeId: uploadRes.data.resumeId,
      });

      if (parseRes.data.success) {
        setSkills(parseRes.data.skills || []);
        setParsingStatus("completed");
        toast.success("Resume parsed successfully");
      } else {
        toast.error(parseRes.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="urp-page">
        {/* background decorations */}
        <div className="urp-grid" />
        <div className="urp-orb urp-orb-1" />
        <div className="urp-orb urp-orb-2" />

        <div className="urp-content">
          {/* ── Header ── */}
          <div className="urp-header">
            <div className="urp-eyebrow">
              <span className="urp-eyebrow-dot" />
              Resume Intelligence
            </div>
            <h1 className="urp-title">
              Upload Your{" "}
              <span className="urp-title-accent">Resume</span>
            </h1>
            <p className="urp-subtitle">
              Drop your PDF and we'll instantly extract skills, technologies,
              and competencies to power your profile.
            </p>
          </div>

          {/* ── Step tracker ── */}
          <StepTracker step={currentStep} />

          {/* ── Divider ── */}
          <div className="urp-divider">
            <div className="urp-divider-line" />
            <span className="urp-divider-label">Document Upload</span>
            <div className="urp-divider-line" />
          </div>

          <div className="urp-space">
            {/* ── Upload zone ── */}
            <div className="urp-upload-wrapper">
              <ResumeUploadZone
                file={file}
                onFileSelect={handleFileSelect}
                loading={uploading}
              />
            </div>

            {/* ── Uploaded file card ── */}
            {file && (
              <div className="urp-file-wrapper">
                <UploadedFileCard
                  fileName={file.name}
                  fileSize={file.size}
                />
              </div>
            )}

            {/* ── Parsing progress ── */}
            {parsingStatus && (
              <div className="urp-progress-wrapper">
                <ParsingProgress status={parsingStatus} />
              </div>
            )}

            {/* ── Extracted skills ── */}
            {skills.length > 0 && (
              <div
                className="urp-card"
                style={{ animationDelay: "0.05s" }}
              >
                <div className="urp-corner-accent" />
                <div className="urp-skills-header">
                  <h2 className="urp-skills-title">Extracted Skills</h2>
                  <span className="urp-skills-count">
                    {skills.length} found
                  </span>
                </div>

                <div className="urp-skills-grid">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className={`urp-skill-chip ${
                        CHIP_CLASSES[index % CHIP_CLASSES.length]
                      }`}
                      style={{
                        animationDelay: `${0.05 + index * 0.04}s`,
                      }}
                    >
                      <span className="urp-chip-dot" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UploadResumePage;