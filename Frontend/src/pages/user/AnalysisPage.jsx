// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Upload, FileText } from "lucide-react";

// import DashboardLayout from "../../components/layout/DashboardLayout";
// import AnalysisSummary from "../../components/analysis/AnalysisSummary";
// import Loader from "../../components/common/Loader";
// import api from "../../services/axiosInstance";

// const AnalysisPage = () => {
//   const { id: jobId } = useParams();
//   const [step, setStep] = useState("upload"); // "upload" or "results"
//   const [loading, setLoading] = useState(false);
//   const [analyzing, setAnalyzing] = useState(false);
//   const [analysis, setAnalysis] = useState(null);
//   const [error, setError] = useState(null);
//   const [file, setFile] = useState(null);
//   const [resumeId, setResumeId] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState("");

//   // Handle resume file selection
//   const handleFileSelect = async (selectedFile) => {
//     setFile(selectedFile);

//     try {
//       setLoading(true);
//       setError(null);
//       setUploadProgress("Uploading resume...");

//       const formData = new FormData();
//       formData.append("pdf", selectedFile);

//       const uploadRes = await api.post("/user/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (!uploadRes.data.success) {
//         toast.error(uploadRes.data.message);
//         setError(uploadRes.data.message);
//         return;
//       }

//       setResumeId(uploadRes.data.resumeId);
//       setUploadProgress("Parsing resume...");

//       const parseRes = await api.post("/user/parse", {
//         resumeId: uploadRes.data.resumeId,
//       });

//       if (parseRes.data.success) {
//         setUploadProgress("Resume ready. Analyzing...");
//         // Now proceed to analyze
//         await performAnalysis(uploadRes.data.resumeId);
//       } else {
//         toast.error(parseRes.data.message);
//         setError(parseRes.data.message);
//       }
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || "Upload failed";
//       toast.error(errorMsg);
//       setError(errorMsg);
//     } finally {
//       setLoading(false);
//       setUploadProgress("");
//     }
//   };

//   // Perform analysis
//   const performAnalysis = async (rid) => {
//     try {
//       setAnalyzing(true);
//       setError(null);

//       const analyzeRes = await api.post("/report/analyze", {
//         jid: jobId,
//         rid: rid || resumeId,
//       });

//       if (analyzeRes.data.success) {
//         setAnalysis(analyzeRes.data);
//         setStep("results");
//         toast.success("Analysis completed!");
//       } else {
//         toast.error(analyzeRes.data.message);
//         setError(analyzeRes.data.message);
//       }
//     } catch (err) {
//       const errorMsg = err.response?.data?.message || "Analysis failed";
//       toast.error(errorMsg);
//       setError(errorMsg);
//     } finally {
//       setAnalyzing(false);
//     }
//   };

//   // Handle drag and drop
//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const files = e.dataTransfer.files;
//     if (files.length > 0) {
//       handleFileSelect(files[0]);
//     }
//   };

//   // Upload step
//   if (step === "upload") {
//     return (
//       <DashboardLayout>
//         <div className="space-y-8">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">
//               Analyze Your Resume
//             </h1>
//             <p className="mt-2 text-slate-600">
//               Upload your resume to see how well it matches this job.
//             </p>
//           </div>

//           {error && (
//             <div className="card p-4 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-red-600">{error}</p>
//             </div>
//           )}

//           <div
//             className="card p-8 border-2 border-dashed border-indigo-300 rounded-2xl text-center cursor-pointer hover:border-indigo-500 transition-colors"
//             onDragOver={handleDragOver}
//             onDrop={handleDrop}
//             onClick={() => document.getElementById("fileInput").click()}
//           >
//             <input
//               id="fileInput"
//               type="file"
//               accept=".pdf,.doc,.docx"
//               onChange={(e) =>
//                 e.target.files && handleFileSelect(e.target.files[0])
//               }
//               className="hidden"
//             />

//             <Upload className="mx-auto h-12 w-12 text-indigo-600 mb-4" />

//             <h3 className="text-lg font-semibold text-slate-900 mb-2">
//               Upload Your Resume
//             </h3>

//             <p className="text-slate-600 mb-4">
//               Drag and drop your resume file here, or click to select
//             </p>

//             <p className="text-xs text-slate-500">
//               Accepted formats: PDF, DOC, DOCX (Max 5MB)
//             </p>

//             {loading && (
//               <div className="mt-4">
//                 <div className="animate-spin inline-block h-5 w-5 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
//                 <p className="text-indigo-600 text-sm mt-2">{uploadProgress}</p>
//               </div>
//             )}

//             {file && !loading && (
//               <div className="mt-4">
//                 <div className="flex items-center justify-center gap-2 text-green-600">
//                   <FileText className="h-5 w-5" />
//                   <span className="text-sm font-medium">{file.name}</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   // Results step
//   if (analyzing) {
//     return (
//       <DashboardLayout>
//         <Loader text="Analyzing your resume against the job..." />
//       </DashboardLayout>
//     );
//   }

//   if (error && step === "results") {
//     return (
//       <DashboardLayout>
//         <div className="card p-8 text-center">
//           <p className="text-red-600 font-semibold">{error}</p>
//           <button
//             onClick={() => {
//               setStep("upload");
//               setError(null);
//               setAnalysis(null);
//             }}
//             className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//           >
//             Try Another Resume
//           </button>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   if (!analysis && step === "results") {
//     return (
//       <DashboardLayout>
//         <div className="card p-8 text-center">
//           <p className="text-slate-600">No analysis data available</p>
//           <button
//             onClick={() => {
//               setStep("upload");
//               setAnalysis(null);
//             }}
//             className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//           >
//             Upload Resume
//           </button>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <div className="space-y-8">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">
//               Analysis Report
//             </h1>
//             <p className="mt-2 text-slate-600">
//               Detailed breakdown of your resume-job match.
//             </p>
//           </div>

//           <button
//             onClick={() => {
//               setStep("upload");
//               setAnalysis(null);
//             }}
//             className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//           >
//             Analyze Another
//           </button>
//         </div>

//         {analysis && <AnalysisSummary analysis={analysis} />}
//       </div>
//     </DashboardLayout>
//   );
// };

// export default AnalysisPage;




import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Upload, FileText, Cpu, CheckCircle2, AlertCircle, RotateCcw, Zap, ScanLine, ChevronRight } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import AnalysisSummary from "../../components/analysis/AnalysisSummary";
import api from "../../services/axiosInstance";

/* ══════════════════════════════════════════════════
   STYLES
══════════════════════════════════════════════════ */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Manrope:wght@300;400;500;600;700;800&display=swap');

  :root {
    --bg:        #0c0e12;
    --bg-2:      #12151b;
    --bg-3:      #181c24;
    --border:    rgba(255,255,255,.07);
    --border-hi: rgba(6,182,212,.35);
    --cyan:      #06b6d4;
    --cyan-dim:  rgba(6,182,212,.12);
    --cyan-glow: rgba(6,182,212,.25);
    --green:     #10b981;
    --amber:     #f59e0b;
    --red:       #f43f5e;
    --text:      #e2e8f0;
    --text-2:    #94a3b8;
    --text-3:    #475569;
    --mono:      'IBM Plex Mono', monospace;
    --sans:      'Manrope', sans-serif;
  }

  .an-root {
    font-family: var(--sans);
    color: var(--text);
    min-height: 100%;
  }

  /* ── page header ── */
  .an-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 2.25rem;
    gap: 1rem;
    animation: fadeIn .4s ease both;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .an-breadcrumb {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--mono);
    font-size: 10px;
    color: var(--text-3);
    margin-bottom: .6rem;
    letter-spacing: .05em;
  }
  .an-breadcrumb .sep { color: var(--cyan); }
  .an-title {
    font-family: var(--sans);
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 800;
    color: var(--text);
    line-height: 1.1;
    letter-spacing: -.03em;
  }
  .an-title-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: var(--mono);
    font-size: 10px;
    font-weight: 500;
    color: var(--cyan);
    background: var(--cyan-dim);
    border: 1px solid var(--border-hi);
    border-radius: 4px;
    padding: 3px 8px;
    margin-left: 10px;
    vertical-align: middle;
    letter-spacing: .06em;
  }
  .an-sub {
    margin-top: .4rem;
    font-size: 13.5px;
    color: var(--text-2);
    font-weight: 400;
  }

  /* ── re-analyze button ── */
  .an-btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 9px 18px;
    border: 1.5px solid var(--border-hi);
    border-radius: 8px;
    background: var(--cyan-dim);
    color: var(--cyan);
    font-family: var(--sans);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: background .2s, box-shadow .2s;
    flex-shrink: 0;
    align-self: center;
  }
  .an-btn-outline:hover {
    background: rgba(6,182,212,.2);
    box-shadow: 0 0 16px var(--cyan-glow);
  }

  /* ── error banner ── */
  .an-error {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: rgba(244,63,94,.08);
    border: 1px solid rgba(244,63,94,.25);
    border-radius: 10px;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
    font-size: 13.5px;
    color: #fda4af;
    animation: fadeIn .3s ease both;
  }
  .an-error svg { flex-shrink: 0; margin-top: 1px; color: var(--red); }

  /* ══════════════════════════════
     UPLOAD ZONE
  ══════════════════════════════ */
  .an-upload-wrap {
    animation: cardIn .5s .05s cubic-bezier(.22,1,.36,1) both;
  }
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .an-drop-zone {
    position: relative;
    background: var(--bg-2);
    border: 1.5px dashed rgba(6,182,212,.28);
    border-radius: 18px;
    padding: 4rem 2rem;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    transition: border-color .2s, background .2s;
  }
  .an-drop-zone:hover,
  .an-drop-zone.dragging {
    border-color: var(--cyan);
    background: rgba(6,182,212,.04);
  }
  .an-drop-zone.dragging { box-shadow: 0 0 40px var(--cyan-glow); }

  /* corner brackets */
  .an-drop-zone::before,
  .an-drop-zone::after {
    content: '';
    position: absolute;
    width: 20px; height: 20px;
    border-color: var(--cyan);
    border-style: solid;
    opacity: .45;
    transition: opacity .2s;
  }
  .an-drop-zone::before { top: 12px; left: 12px; border-width: 2px 0 0 2px; border-radius: 3px 0 0 0; }
  .an-drop-zone::after  { bottom: 12px; right: 12px; border-width: 0 2px 2px 0; border-radius: 0 0 3px 0; }
  .an-drop-zone:hover::before,
  .an-drop-zone:hover::after { opacity: .9; }

  /* scan line animation */
  .an-scan-line {
    position: absolute;
    left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--cyan), transparent);
    opacity: 0;
    top: 0;
    transition: opacity .2s;
  }
  .an-drop-zone.loading .an-scan-line {
    opacity: 1;
    animation: scanDown 1.8s ease-in-out infinite;
  }
  @keyframes scanDown {
    0%   { top: 0%; opacity: 0; }
    5%   { opacity: 1; }
    95%  { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }

  /* grid texture */
  .an-drop-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(6,182,212,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(6,182,212,.04) 1px, transparent 1px);
    background-size: 36px 36px;
    pointer-events: none;
    opacity: 0;
    transition: opacity .3s;
  }
  .an-drop-zone:hover .an-drop-grid,
  .an-drop-zone.dragging .an-drop-grid { opacity: 1; }

  .an-drop-icon-wrap {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 72px; height: 72px;
    margin: 0 auto 1.5rem;
  }
  .an-drop-icon-ring {
    position: absolute;
    inset: 0;
    border: 1.5px solid var(--border-hi);
    border-radius: 50%;
    animation: ringPulse 2.5s ease infinite;
  }
  .an-drop-icon-ring:nth-child(2) {
    inset: -10px;
    opacity: .35;
    animation-delay: .5s;
  }
  @keyframes ringPulse {
    0%,100% { opacity: .5; transform: scale(1); }
    50% { opacity: .15; transform: scale(1.1); }
  }
  .an-drop-icon-inner {
    width: 52px; height: 52px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(6,182,212,.15), rgba(6,182,212,.04));
    border: 1.5px solid var(--border-hi);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--cyan);
    position: relative;
    z-index: 1;
  }
  .an-drop-title {
    font-family: var(--sans);
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: .5rem;
    letter-spacing: -.02em;
  }
  .an-drop-sub {
    font-size: 13.5px;
    color: var(--text-2);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
  .an-drop-formats {
    display: inline-flex;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 1.75rem;
  }
  .an-format-chip {
    font-family: var(--mono);
    font-size: 10px;
    font-weight: 500;
    padding: 3px 9px;
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--text-3);
    letter-spacing: .06em;
    background: var(--bg-3);
  }
  .an-drop-cta {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: var(--cyan);
    color: #000;
    font-weight: 700;
    font-size: 13px;
    padding: 10px 22px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: filter .2s, box-shadow .2s;
    letter-spacing: .01em;
  }
  .an-drop-cta:hover {
    filter: brightness(1.1);
    box-shadow: 0 0 24px var(--cyan-glow);
  }

  /* loading state inside upload */
  .an-loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: .5rem 0;
  }
  .an-loading-icon {
    width: 52px; height: 52px;
    border-radius: 50%;
    background: var(--cyan-dim);
    border: 1.5px solid var(--border-hi);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--cyan);
    animation: iconPulse 1.5s ease infinite;
  }
  @keyframes iconPulse {
    0%,100% { box-shadow: 0 0 0 0 var(--cyan-glow); }
    50% { box-shadow: 0 0 0 12px transparent; }
  }
  .an-loading-steps {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    max-width: 280px;
  }
  .an-loading-step {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--mono);
    font-size: 11px;
    color: var(--text-3);
    padding: 6px 10px;
    border-radius: 6px;
    background: var(--bg-3);
    border: 1px solid var(--border);
    transition: all .3s;
  }
  .an-loading-step.active {
    color: var(--cyan);
    border-color: var(--border-hi);
    background: var(--cyan-dim);
  }
  .an-loading-step.done {
    color: var(--green);
    border-color: rgba(16,185,129,.25);
    background: rgba(16,185,129,.06);
  }
  .an-step-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
  }
  .an-loading-step.active .an-step-dot {
    animation: dotBlink .8s ease infinite;
  }
  @keyframes dotBlink {
    0%,100% { opacity: 1; }
    50% { opacity: .2; }
  }
  .an-loading-prog {
    font-size: 12px;
    color: var(--text-2);
    letter-spacing: .02em;
  }

  /* file selected chip */
  .an-file-chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(16,185,129,.08);
    border: 1px solid rgba(16,185,129,.25);
    border-radius: 8px;
    padding: 8px 14px;
    font-size: 13px;
    color: #6ee7b7;
    margin-top: .75rem;
  }
  .an-file-chip svg { color: var(--green); }

  /* ══════════════════════════════
     ANALYZING OVERLAY
  ══════════════════════════════ */
  .an-analyzing {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 420px;
    text-align: center;
    gap: 1.5rem;
    animation: fadeIn .4s ease both;
  }
  .an-analyzing-orb {
    width: 96px; height: 96px;
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .an-analyzing-orb::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: conic-gradient(var(--cyan), transparent 60%, transparent 80%, var(--cyan));
    animation: orbSpin 1.2s linear infinite;
  }
  @keyframes orbSpin { to { transform: rotate(360deg); } }
  .an-analyzing-orb-inner {
    width: 74px; height: 74px;
    border-radius: 50%;
    background: var(--bg-2);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    color: var(--cyan);
  }
  .an-analyzing-title {
    font-family: var(--sans);
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -.02em;
  }
  .an-analyzing-sub {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--text-3);
    letter-spacing: .08em;
    animation: textCycle 3s ease infinite;
  }
  @keyframes textCycle {
    0%,100% { opacity: 1; }
    45%,55% { opacity: 0; }
  }
  .an-analyzing-bar-wrap {
    width: 220px;
    height: 3px;
    background: var(--bg-3);
    border-radius: 10px;
    overflow: hidden;
  }
  .an-analyzing-bar {
    height: 100%;
    width: 40%;
    background: var(--cyan);
    border-radius: 10px;
    animation: barSlide 1.8s ease-in-out infinite;
  }
  @keyframes barSlide {
    0% { transform: translateX(-150%); }
    100% { transform: translateX(350%); }
  }

  /* ══════════════════════════════
     RESULTS
  ══════════════════════════════ */
  .an-results { animation: cardIn .5s cubic-bezier(.22,1,.36,1) both; }

  /* ── empty / error states ── */
  .an-state-card {
    background: var(--bg-2);
    border: 1.5px solid var(--border);
    border-radius: 16px;
    padding: 3.5rem 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    animation: cardIn .4s ease both;
  }
  .an-state-icon {
    width: 56px; height: 56px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .an-state-title {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -.01em;
  }
  .an-state-sub {
    font-size: 13px;
    color: var(--text-2);
    max-width: 260px;
    line-height: 1.6;
  }
  .an-state-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: var(--cyan);
    color: #000;
    font-weight: 700;
    font-size: 13px;
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    margin-top: .5rem;
    transition: filter .2s, box-shadow .2s;
  }
  .an-state-btn:hover {
    filter: brightness(1.1);
    box-shadow: 0 0 20px var(--cyan-glow);
  }

  /* ── info strip below header on results page ── */
  .an-info-strip {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
    padding: .85rem 1.25rem;
    background: var(--bg-2);
    border: 1px solid var(--border);
    border-radius: 10px;
    flex-wrap: wrap;
    animation: fadeIn .4s .1s ease both;
  }
  .an-info-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--mono);
    font-size: 10.5px;
    color: var(--text-3);
    letter-spacing: .05em;
  }
  .an-info-item svg { color: var(--cyan); }
  .an-info-sep {
    width: 1px;
    height: 16px;
    background: var(--border);
  }
  .an-info-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: var(--mono);
    font-size: 10px;
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: 500;
    letter-spacing: .06em;
  }
`;

/* ══════════════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════════════ */

function AnalyzingView() {
  const [msg, setMsg] = useState("SCANNING_RESUME");
  const msgs = ["SCANNING_RESUME", "PARSING_CONTENT", "MATCHING_KEYWORDS", "SCORING_ATS_FIT", "GENERATING_REPORT"];
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { i = (i + 1) % msgs.length; setMsg(msgs[i]); }, 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="an-analyzing">
      <div className="an-analyzing-orb">
        <div className="an-analyzing-orb-inner">
          <Cpu size={30} />
        </div>
      </div>
      <div>
        <div className="an-analyzing-title">AI Analysis in Progress</div>
        <div className="an-analyzing-sub" key={msg}>{msg}</div>
      </div>
      <div className="an-analyzing-bar-wrap">
        <div className="an-analyzing-bar" />
      </div>
    </div>
  );
}

function DropZone({ loading, file, uploadProgress, onFileSelect, onDrop }) {
  const [dragging, setDragging] = useState(false);
  const steps = [
    { label: "upload_resume.pdf", key: "upload" },
    { label: "parse_document()",  key: "parse" },
    { label: "run_analysis()",    key: "analyze" },
  ];
  const activeStep =
    uploadProgress?.includes("Pars") ? "parse" :
    uploadProgress?.includes("Analyz") ? "analyze" :
    loading ? "upload" : null;

  const getStepState = (key) => {
    const order = ["upload", "parse", "analyze"];
    const ai = order.indexOf(activeStep);
    const si = order.indexOf(key);
    if (!activeStep) return "idle";
    if (si < ai) return "done";
    if (si === ai) return "active";
    return "idle";
  };

  return (
    <div className="an-upload-wrap">
      <div
        className={`an-drop-zone${dragging ? " dragging" : ""}${loading ? " loading" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); onDrop(e); }}
        onClick={() => !loading && document.getElementById("fileInput").click()}
      >
        <div className="an-scan-line" />
        <div className="an-drop-grid" />
        <input
          id="fileInput"
          type="file"
          accept=".pdf,.doc,.docx"
          style={{ display: "none" }}
          onChange={(e) => e.target.files && onFileSelect(e.target.files[0])}
        />

        {loading ? (
          <div className="an-loading-state">
            <div className="an-loading-icon">
              <ScanLine size={22} />
            </div>
            <p className="an-loading-prog">{uploadProgress}</p>
            <div className="an-loading-steps">
              {steps.map((s) => {
                const state = getStepState(s.key);
                return (
                  <div key={s.key} className={`an-loading-step ${state === "idle" ? "" : state}`}>
                    {state === "done"
                      ? <CheckCircle2 size={12} />
                      : <span className="an-step-dot" />}
                    {s.label}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            <div className="an-drop-icon-wrap">
              <div className="an-drop-icon-ring" />
              <div className="an-drop-icon-ring" />
              <div className="an-drop-icon-inner">
                <Upload size={22} />
              </div>
            </div>
            <div className="an-drop-title">Drop your resume here</div>
            <div className="an-drop-sub">
              Drag &amp; drop, or click to browse your files.<br />
              Our AI will match it against the job in seconds.
            </div>
            <div className="an-drop-formats">
              {[".PDF", ".DOC", ".DOCX", "MAX 5MB"].map((f) => (
                <span className="an-format-chip" key={f}>{f}</span>
              ))}
            </div>
            <button className="an-drop-cta" onClick={(e) => { e.stopPropagation(); document.getElementById("fileInput").click(); }}>
              <Zap size={14} /> Select File
            </button>

            {file && (
              <div className="an-file-chip">
                <FileText size={13} /> {file.name}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════ */
const AnalysisPage = () => {
  const { id: jobId } = useParams();
  const [step, setStep] = useState("upload");
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [uploadProgress, setUploadProgress] = useState("");

  const handleFileSelect = async (selectedFile) => {
    setFile(selectedFile);
    try {
      setLoading(true);
      setError(null);
      setUploadProgress("Uploading resume...");

      const formData = new FormData();
      formData.append("pdf", selectedFile);
      const uploadRes = await api.post("/user/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!uploadRes.data.success) {
        toast.error(uploadRes.data.message);
        setError(uploadRes.data.message);
        return;
      }

      setResumeId(uploadRes.data.resumeId);
      setUploadProgress("Parsing resume...");

      const parseRes = await api.post("/user/parse", { resumeId: uploadRes.data.resumeId });
      if (parseRes.data.success) {
        setUploadProgress("Resume ready. Analyzing...");
        await performAnalysis(uploadRes.data.resumeId);
      } else {
        toast.error(parseRes.data.message);
        setError(parseRes.data.message);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Upload failed";
      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
      setUploadProgress("");
    }
  };

  const performAnalysis = async (rid) => {
    try {
      setAnalyzing(true);
      setError(null);
      const analyzeRes = await api.post("/report/analyze", { jid: jobId, rid: rid || resumeId });
      if (analyzeRes.data.success) {
        setAnalysis(analyzeRes.data);
        setStep("results");
        toast.success("Analysis completed!");
      } else {
        toast.error(analyzeRes.data.message);
        setError(analyzeRes.data.message);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Analysis failed";
      toast.error(msg);
      setError(msg);
    } finally {
      setAnalyzing(false);
    }
  };

  const reset = () => { setStep("upload"); setError(null); setAnalysis(null); setFile(null); };

  /* ── ANALYZING ── */
  if (analyzing) {
    return (
      <DashboardLayout>
        <style>{styles}</style>
        <div className="an-root">
          <div className="an-header">
            <div>
              <div className="an-breadcrumb">analysis <span className="sep">/</span> processing</div>
              <h1 className="an-title">Processing<span className="an-title-tag"><ScanLine size={9} /> LIVE</span></h1>
              <p className="an-sub">Sit tight — your results will be ready in a moment.</p>
            </div>
          </div>
          <AnalyzingView />
        </div>
      </DashboardLayout>
    );
  }

  /* ── ERROR on results step ── */
  if (error && step === "results") {
    return (
      <DashboardLayout>
        <style>{styles}</style>
        <div className="an-root">
          <div className="an-header">
            <div>
              <div className="an-breadcrumb">analysis <span className="sep">/</span> error</div>
              <h1 className="an-title">Analysis Failed</h1>
            </div>
          </div>
          <div className="an-state-card">
            <div className="an-state-icon" style={{ background: "rgba(244,63,94,.1)" }}>
              <AlertCircle size={24} color="#f43f5e" />
            </div>
            <div className="an-state-title">Something went wrong</div>
            <div className="an-state-sub">{error}</div>
            <button className="an-state-btn" onClick={reset}>
              <RotateCcw size={13} /> Try Again
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  /* ── NO DATA on results step ── */
  if (!analysis && step === "results") {
    return (
      <DashboardLayout>
        <style>{styles}</style>
        <div className="an-root">
          <div className="an-header">
            <div>
              <div className="an-breadcrumb">analysis <span className="sep">/</span> empty</div>
              <h1 className="an-title">No Data</h1>
            </div>
          </div>
          <div className="an-state-card">
            <div className="an-state-icon" style={{ background: "rgba(6,182,212,.1)" }}>
              <FileText size={24} color="var(--cyan)" />
            </div>
            <div className="an-state-title">No analysis data available</div>
            <div className="an-state-sub">Upload a resume to generate your first analysis report.</div>
            <button className="an-state-btn" onClick={reset}>
              <Upload size={13} /> Upload Resume
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  /* ── RESULTS ── */
  if (step === "results" && analysis) {
    return (
      <DashboardLayout>
        <style>{styles}</style>
        <div className="an-root">
          <div className="an-header">
            <div>
              <div className="an-breadcrumb">analysis <span className="sep">/</span> report</div>
              <h1 className="an-title">
                Analysis Report
                <span className="an-title-tag"><CheckCircle2 size={9} /> COMPLETE</span>
              </h1>
              <p className="an-sub">Detailed breakdown of your resume-to-job match.</p>
            </div>
            <button className="an-btn-outline" onClick={reset}>
              <RotateCcw size={13} /> Analyze Another
            </button>
          </div>

          {/* info strip */}
          <div className="an-info-strip">
            <div className="an-info-item">
              <FileText size={11} />
              {file?.name || "resume.pdf"}
            </div>
            <div className="an-info-sep" />
            <div className="an-info-item">
              <Cpu size={11} />
              AI_MODEL_v2
            </div>
            <div className="an-info-sep" />
            <div className="an-info-item">
              <ScanLine size={11} />
              {new Date().toLocaleTimeString()}
            </div>
            <div style={{ marginLeft: "auto" }}>
              <span
                className="an-info-badge"
                style={{ background: "rgba(16,185,129,.1)", color: "#6ee7b7", border: "1px solid rgba(16,185,129,.2)" }}
              >
                <CheckCircle2 size={9} /> SUCCESS
              </span>
            </div>
          </div>

          <div className="an-results">
            <AnalysisSummary analysis={analysis} />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  /* ── UPLOAD (default) ── */
  return (
    <DashboardLayout>
      <style>{styles}</style>
      <div className="an-root">
        <div className="an-header">
          <div>
            <div className="an-breadcrumb">analysis <span className="sep">/</span> upload</div>
            <h1 className="an-title">Analyze Resume</h1>
            <p className="an-sub">Upload your resume to see how well it matches this job opening.</p>
          </div>
        </div>

        {error && (
          <div className="an-error">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <DropZone
          loading={loading}
          file={file}
          uploadProgress={uploadProgress}
          onFileSelect={handleFileSelect}
          onDrop={(e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) handleFileSelect(files[0]);
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export default AnalysisPage;