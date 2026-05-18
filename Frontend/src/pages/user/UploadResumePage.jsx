// import React, { useState } from "react";
// import { toast } from "react-toastify";

// import DashboardLayout from "../../components/layout/DashboardLayout";
// import ResumeUploadZone from "../../components/upload/ResumeUploadZone";
// import UploadedFileCard from "../../components/upload/UploadedFileCard";
// import ParsingProgress from "../../components/upload/ParsingProgress";
// import api from "../../services/axiosInstance";

// const UploadResumePage = () => {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [parsingStatus, setParsingStatus] = useState("");
//   const [skills, setSkills] = useState([]);

//   const handleFileSelect = async (selectedFile) => {
//     setFile(selectedFile);

//     try {
//       setUploading(true);

//       const formData = new FormData();
//       formData.append("pdf", selectedFile);

//       const uploadRes = await api.post(
//         "/user/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (!uploadRes.data.success) {
//         toast.error(uploadRes.data.message);
//         return;
//       }

//       setParsingStatus("processing");

//       const parseRes = await api.post("/user/parse", {
//         resumeId: uploadRes.data.resumeId,
//       });

//       if (parseRes.data.success) {
//         setSkills(parseRes.data.skills || []);
//         setParsingStatus("completed");
//         toast.success("Resume parsed successfully");
//       } else {
//         toast.error(parseRes.data.message);
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message ||
//           "Upload failed"
//       );
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <DashboardLayout>
//       <div className="space-y-8">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-900">
//             Upload Resume
//           </h1>
//           <p className="mt-2 text-slate-600">
//             Upload your resume to extract skills.
//           </p>
//         </div>

//         <ResumeUploadZone
//           file={file}
//           onFileSelect={handleFileSelect}
//           loading={uploading}
//         />

//         {file && (
//           <UploadedFileCard
//             fileName={file.name}
//             fileSize={file.size}
//           />
//         )}

//         {parsingStatus && (
//           <ParsingProgress status={parsingStatus} />
//         )}

//         {skills.length > 0 && (
//           <div className="card p-6">
//             <h2 className="text-xl font-semibold text-slate-900">
//               Extracted Skills
//             </h2>

//             <div className="mt-4 flex flex-wrap gap-2">
//               {skills.map((skill, index) => (
//                 <span
//                   key={index}
//                   className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-600"
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// };

// export default UploadResumePage;




import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import ResumeUploadZone from "../../components/upload/ResumeUploadZone";
import UploadedFileCard from "../../components/upload/UploadedFileCard";
import ParsingProgress from "../../components/upload/ParsingProgress";
import api from "../../services/axiosInstance";

/* ─── Inject global styles ─────────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  :root {
    --navy-950: #020817;
    --navy-900: #050f1f;
    --navy-800: #091428;
    --navy-700: #0d1f3c;
    --navy-600: #102652;
    --navy-500: #163068;
    --surface:   #0b1628;
    --surface-2: #0f1e35;
    --surface-3: #142540;
    --border:    rgba(99,159,255,0.10);
    --border-bright: rgba(99,159,255,0.22);
    --accent:    #3b82f6;
    --accent-2:  #60a5fa;
    --accent-glow: rgba(59,130,246,0.35);
    --cyan:      #22d3ee;
    --cyan-dim:  rgba(34,211,238,0.15);
    --text-primary: #e2eaf7;
    --text-secondary: #7a99c4;
    --text-muted: #4a6488;
  }

  /* page wrapper */
  .urp-page {
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    background: var(--navy-950);
    color: var(--text-primary);
    position: relative;
    overflow-x: hidden;
  }

  /* ── background mesh ── */
  .urp-page::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 50% at 15% 10%, rgba(59,130,246,0.09) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 85% 80%, rgba(34,211,238,0.06) 0%, transparent 55%),
      radial-gradient(ellipse 50% 60% at 50% 50%, rgba(5,15,31,0.9) 0%, transparent 100%);
    pointer-events: none;
    z-index: 0;
  }

  /* ── animated grid ── */
  .urp-grid {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(99,159,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,159,255,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    animation: gridDrift 18s linear infinite;
    pointer-events: none;
    z-index: 0;
  }
  @keyframes gridDrift {
    0%   { background-position: 0 0; }
    100% { background-position: 48px 48px; }
  }

  /* ── floating orbs ── */
  .urp-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.5;
    pointer-events: none;
    z-index: 0;
    animation: orbFloat var(--dur, 14s) ease-in-out infinite alternate;
  }
  .urp-orb-1 {
    width: 420px; height: 420px;
    background: radial-gradient(circle, rgba(59,130,246,0.18), transparent 70%);
    top: -120px; left: -100px;
    --dur: 16s;
  }
  .urp-orb-2 {
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(34,211,238,0.12), transparent 70%);
    bottom: -80px; right: -80px;
    --dur: 12s;
    animation-direction: alternate-reverse;
  }
  @keyframes orbFloat {
    0%   { transform: translate(0, 0) scale(1); }
    100% { transform: translate(30px, 20px) scale(1.08); }
  }

  /* ── content wrapper ── */
  .urp-content {
    position: relative;
    z-index: 1;
    max-width: 860px;
    margin: 0 auto;
    padding: 2rem 1.5rem 4rem;
  }

  /* ── page header ── */
  .urp-header {
    margin-bottom: 2.75rem;
    animation: fadeSlideDown 0.7s cubic-bezier(0.22,1,0.36,1) both;
  }
  @keyframes fadeSlideDown {
    from { opacity: 0; transform: translateY(-22px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .urp-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Syne', sans-serif;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent-2);
    margin-bottom: 0.85rem;
    background: rgba(59,130,246,0.08);
    border: 1px solid rgba(59,130,246,0.18);
    padding: 0.3rem 0.8rem 0.3rem 0.65rem;
    border-radius: 100px;
  }
  .urp-eyebrow-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 8px var(--accent);
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%,100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.55; transform: scale(1.4); }
  }

  .urp-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 5vw, 2.9rem);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin: 0 0 0.6rem;
  }
  .urp-title-accent {
    background: linear-gradient(120deg, var(--accent-2) 0%, var(--cyan) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .urp-subtitle {
    font-size: 0.975rem;
    font-weight: 300;
    color: var(--text-secondary);
    line-height: 1.6;
    max-width: 440px;
  }

  /* ── divider ── */
  .urp-divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.75rem;
    opacity: 0;
    animation: fadeIn 0.5s 0.4s ease forwards;
  }
  @keyframes fadeIn {
    to { opacity: 1; }
  }
  .urp-divider-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border-bright), transparent);
  }
  .urp-divider-label {
    font-family: 'Syne', sans-serif;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  /* ── glass card ── */
  .urp-card {
    background: linear-gradient(135deg, rgba(14,28,52,0.85) 0%, rgba(9,20,40,0.9) 100%);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 1.75rem;
    backdrop-filter: blur(16px);
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    animation: cardRise 0.6s cubic-bezier(0.22,1,0.36,1) both;
  }
  .urp-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(59,130,246,0.04) 0%, transparent 60%);
    border-radius: inherit;
    pointer-events: none;
  }
  .urp-card:hover {
    border-color: var(--border-bright);
    box-shadow: 0 0 40px rgba(59,130,246,0.08), 0 8px 32px rgba(0,0,0,0.4);
  }
  @keyframes cardRise {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── upload zone override wrapper ── */
  .urp-upload-wrapper {
    animation: cardRise 0.65s 0.1s cubic-bezier(0.22,1,0.36,1) both;
  }

  /* ── file card wrapper ── */
  .urp-file-wrapper {
    animation: cardRise 0.55s cubic-bezier(0.22,1,0.36,1) both;
  }

  /* ── progress wrapper ── */
  .urp-progress-wrapper {
    animation: cardRise 0.55s 0.05s cubic-bezier(0.22,1,0.36,1) both;
  }

  /* ── skills section ── */
  .urp-skills-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }
  .urp-skills-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.01em;
  }
  .urp-skills-count {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--accent-2);
    background: rgba(59,130,246,0.1);
    border: 1px solid rgba(59,130,246,0.18);
    padding: 0.2rem 0.65rem;
    border-radius: 100px;
    font-family: 'Syne', sans-serif;
    letter-spacing: 0.04em;
  }

  .urp-skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .urp-skill-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem 0.9rem;
    border-radius: 100px;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.01em;
    cursor: default;
    transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
    opacity: 0;
    transform: scale(0.88) translateY(6px);
    animation: chipPop 0.45s cubic-bezier(0.22,1,0.36,1) forwards;
    position: relative;
    overflow: hidden;
  }
  @keyframes chipPop {
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
  .urp-skill-chip::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }
  .urp-skill-chip:hover::before {
    transform: translateX(100%);
  }
  .urp-skill-chip:hover {
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 4px 18px var(--accent-glow);
  }

  /* chip variants */
  .urp-chip-blue {
    background: rgba(59,130,246,0.12);
    border: 1px solid rgba(59,130,246,0.25);
    color: #93c5fd;
  }
  .urp-chip-cyan {
    background: rgba(34,211,238,0.1);
    border: 1px solid rgba(34,211,238,0.22);
    color: #67e8f9;
  }
  .urp-chip-indigo {
    background: rgba(99,102,241,0.12);
    border: 1px solid rgba(99,102,241,0.25);
    color: #a5b4fc;
  }
  .urp-chip-violet {
    background: rgba(139,92,246,0.1);
    border: 1px solid rgba(139,92,246,0.22);
    color: #c4b5fd;
  }
  .urp-chip-sky {
    background: rgba(14,165,233,0.1);
    border: 1px solid rgba(14,165,233,0.22);
    color: #7dd3fc;
  }

  .urp-chip-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.7;
    flex-shrink: 0;
  }

  /* ── corner accent ── */
  .urp-corner-accent {
    position: absolute;
    top: 0; right: 0;
    width: 120px; height: 120px;
    background: radial-gradient(circle at top right, rgba(59,130,246,0.09), transparent 70%);
    pointer-events: none;
    border-radius: 0 20px 0 0;
  }

  /* ── step indicators ── */
  .urp-steps {
    display: flex;
    align-items: center;
    gap: 0;
    margin-bottom: 2rem;
    opacity: 0;
    animation: fadeIn 0.5s 0.3s ease forwards;
  }
  .urp-step {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
  }
  .urp-step:last-child { flex: none; }
  .urp-step-circle {
    width: 30px; height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 0.7rem;
    font-weight: 700;
    flex-shrink: 0;
    transition: all 0.4s ease;
  }
  .urp-step-circle.active {
    background: var(--accent);
    color: white;
    box-shadow: 0 0 20px var(--accent-glow);
  }
  .urp-step-circle.done {
    background: rgba(34,211,238,0.2);
    border: 1px solid rgba(34,211,238,0.4);
    color: var(--cyan);
  }
  .urp-step-circle.idle {
    background: var(--surface-3);
    border: 1px solid var(--border);
    color: var(--text-muted);
  }
  .urp-step-label {
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--text-muted);
    white-space: nowrap;
  }
  .urp-step-label.active { color: var(--accent-2); }
  .urp-step-label.done   { color: var(--cyan); }
  .urp-step-connector {
    flex: 1;
    height: 1px;
    background: var(--border);
    margin: 0 0.5rem;
    position: relative;
    overflow: hidden;
  }
  .urp-step-connector.filled::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, var(--accent), var(--cyan));
    animation: connectorFill 0.6s ease forwards;
  }
  @keyframes connectorFill {
    from { width: 0; }
    to   { width: 100%; }
  }

  /* ── space utility ── */
  .urp-space { display: flex; flex-direction: column; gap: 1.5rem; }
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
  // step: 0=idle, 1=uploaded, 2=parsing, 3=done
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
  injectStyles();

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