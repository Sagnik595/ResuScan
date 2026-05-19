import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Upload, FileText, Cpu, CheckCircle2, AlertCircle, RotateCcw, Zap, ScanLine } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import AnalysisSummary from "../../components/analysis/AnalysisSummary";
import api from "../../services/axiosInstance";

/* ══════════════════════════════════════════════════
    STYLES (Dark SaaS Theme)
══════════════════════════════════════════════════ */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap');

  :root {
    --bg:          #05070f;
    --surface:     #0c0f1e;
    --border:      rgba(255, 255, 255, 0.07);
    --indigo:      #6366f1;
    --violet:      #8b5cf6;
    --emerald:     #10b981;
    --text-muted:  #7b82a8;
    --text-main:   #f1f5f9;
    --mono:        'IBM Plex Mono', monospace;
    --sans:        'Outfit', sans-serif;
  }

  .an-root {
    font-family: var(--sans);
    color: var(--text-main);
    min-height: 100%;
    background-color: var(--bg);
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
    font-family: var(--sans);
    font-size: 0.72rem;
    text-transform: uppercase;
    font-weight: 600;
    color: var(--indigo);
    margin-bottom: .6rem;
    letter-spacing: .08em;
  }
  .an-breadcrumb .sep { 
    color: var(--text-muted); 
    margin: 0 4px;
    text-transform: none;
  }
  .an-title {
    font-family: var(--sans);
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 800;
    color: var(--text-main);
    line-height: 1.1;
    letter-spacing: -.02em;
  }
  .an-title-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: var(--sans);
    font-size: 11px;
    font-weight: 600;
    color: var(--emerald);
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 99s9px;
    padding: 3px 10px;
    margin-left: 12px;
    vertical-align: middle;
    letter-spacing: .02em;
  }
  .an-sub {
    margin-top: .4rem;
    font-size: 14px;
    color: var(--text-muted);
    font-weight: 400;
  }

  /* ── pill-shaped buttons ── */
  .an-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, var(--indigo), var(--violet));
    color: #ffffff;
    font-weight: 600;
    font-size: 13.5px;
    padding: 10px 24px;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    letter-spacing: .01em;
  }
  .an-btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
  }

  .an-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 9px 22px;
    border: 1px solid var(--border);
    border-radius: 9999px;
    background: transparent;
    color: var(--text-main);
    font-family: var(--sans);
    font-size: 13.5px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
    flex-shrink: 0;
    align-self: center;
  }
  .an-btn-ghost:hover {
    background: rgba(99, 102, 241, 0.05);
    border-color: var(--indigo);
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.15);
  }

  /* ── error banner ── */
  .an-error {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: rgba(244, 63, 94, 0.06);
    border: 1px solid rgba(244, 63, 94, 0.2);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
    font-size: 14px;
    color: #fda4af;
    animation: fadeIn .3s ease both;
  }
  .an-error svg { flex-shrink: 0; margin-top: 2px; color: #f43f5e; }

  /* ══════════════════════════════
      SaaS CARDS & UPLOAD ZONE
  ══════════════════════════════ */
  .an-upload-wrap {
    animation: cardIn .5s .05s cubic-bezier(.22,1,.36,1) both;
  }
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .an-drop-zone {
    position: relative;
    background: var(--surface);
    border: 1px dashed rgba(99, 102, 241, 0.3);
    border-radius: 20px;
    padding: 4.5rem 2rem;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    transition: border-color .3s, background .3s, transform .3s, box-shadow .3s;
  }
  .an-drop-zone:hover,
  .an-drop-zone.dragging {
    border-color: var(--indigo);
    background: rgba(12, 15, 30, 0.8);
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(99, 102, 241, 0.12);
  }

  /* scan line animation */
  .an-scan-line {
    position: absolute;
    left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--indigo), transparent);
    opacity: 0;
    top: 0;
    transition: opacity .2s;
  }
  .an-drop-zone.loading .an-scan-line {
    opacity: 1;
    animation: scanDown 2s ease-in-out infinite;
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
      linear-gradient(rgba(99, 102, 241, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99, 102, 241, 0.02) 1px, transparent 1px);
    background-size: 40px 40px;
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
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-radius: 50%;
    animation: ringPulse 3s ease infinite;
  }
  .an-drop-icon-ring:nth-child(2) {
    inset: -8px;
    opacity: .35;
    animation-delay: .6s;
  }
  @keyframes ringPulse {
    0%,100% { opacity: .4; transform: scale(1); }
    50% { opacity: .1; transform: scale(1.08); }
  }
  .an-drop-icon-inner {
    width: 54px; height: 54px;
    border-radius: 50%;
    background: rgba(99, 102, 241, 0.08);
    border: 1px solid rgba(99, 102, 241, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--indigo);
    position: relative;
    z-index: 1;
  }
  .an-drop-title {
    font-family: var(--sans);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-main);
    margin-bottom: .5rem;
    letter-spacing: -.01em;
  }
  .an-drop-sub {
    font-size: 14px;
    color: var(--text-muted);
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
    border-radius: 6px;
    color: var(--text-muted);
    letter-spacing: .04em;
    background: rgba(255, 255, 255, 0.02);
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
    width: 54px; height: 54px;
    border-radius: 50%;
    background: rgba(99, 102, 241, 0.1);
    border: 1px solid rgba(99, 102, 241, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--indigo);
    animation: iconPulse 1.5s ease infinite;
  }
  @keyframes iconPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.2); }
    50% { box-shadow: 0 0 0 12px transparent; }
  }
  .an-loading-steps {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    max-width: 290px;
  }
  .an-loading-step {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--mono);
    font-size: 11px;
    color: var(--text-muted);
    padding: 8px 12px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.01);
    border: 1px solid var(--border);
    transition: all .3s;
  }
  .an-loading-step.active {
    color: var(--indigo);
    border-color: rgba(99, 102, 241, 0.3);
    background: rgba(99, 102, 241, 0.04);
  }
  .an-loading-step.done {
    color: var(--emerald);
    border-color: rgba(16, 185, 129, 0.2);
    background: rgba(16, 185, 129, 0.04);
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
    font-size: 13px;
    color: var(--text-main);
    font-weight: 500;
  }

  /* file selected chip */
  .an-file-chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(16, 185, 129, 0.06);
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 8px;
    padding: 8px 14px;
    font-size: 13px;
    color: #a7f3d0;
    margin-top: .75rem;
  }
  .an-file-chip svg { color: var(--emerald); }

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
    background: conic-gradient(var(--indigo), transparent 60%, transparent 80%, var(--violet));
    animation: orbSpin 1.4s linear infinite;
  }
  @keyframes orbSpin { to { transform: rotate(360deg); } }
  .an-analyzing-orb-inner {
    width: 76px; height: 76px;
    border-radius: 50%;
    background: var(--surface);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    color: var(--indigo);
  }
  .an-analyzing-title {
    font-family: var(--sans);
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--text-main);
    letter-spacing: -.01em;
  }
  .an-analyzing-sub {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: .08em;
    animation: textCycle 3s ease infinite;
  }
  @keyframes textCycle {
    0%,100% { opacity: 1; }
    45%,55% { opacity: 0; }
  }
  .an-analyzing-bar-wrap {
    width: 220px;
    height: 4px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    overflow: hidden;
  }
  .an-analyzing-bar {
    height: 100%;
    width: 40%;
    background: linear-gradient(90deg, var(--indigo), var(--violet));
    border-radius: 10px;
    animation: barSlide 1.8s ease-in-out infinite;
  }
  @keyframes barSlide {
    0% { transform: translateX(-150%); }
    100% { transform: translateX(350%); }
  }

  /* ══════════════════════════════
      RESULTS & CONTAINER CARDS
  ══════════════════════════════ */
  .an-results { animation: cardIn .5s cubic-bezier(.22,1,.36,1) both; }

  /* ── empty / error states ── */
  .an-state-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 4rem 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
    animation: cardIn .4s ease both;
    transition: transform .3s, box-shadow .3s;
  }
  .an-state-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(99, 102, 241, 0.08);
  }
  .an-state-icon {
    width: 56px; height: 56px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .an-state-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-main);
    letter-spacing: -.01em;
  }
  .an-state-sub {
    font-size: 14px;
    color: var(--text-muted);
    max-width: 280px;
    line-height: 1.6;
  }

  /* ── info strip ── */
  .an-info-strip {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
    padding: .9rem 1.4rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    flex-wrap: wrap;
    animation: fadeIn .4s .1s ease both;
    transition: transform .3s, box-shadow .3s;
  }
  .an-info-strip:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.06);
  }
  .an-info-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--mono);
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: .02em;
  }
  .an-info-item svg { color: var(--indigo); }
  .an-info-sep {
    width: 1px;
    height: 16px;
    background: var(--border);
  }
  .an-info-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: var(--sans);
    font-size: 11px;
    padding: 3px 10px;
    border-radius: 9999px;
    font-weight: 600;
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
          <Cpu size={28} />
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
            <button className="an-btn-primary" onClick={(e) => { e.stopPropagation(); document.getElementById("fileInput").click(); }}>
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
              <h1 className="an-title">Processing<span className="an-title-tag"><ScanLine size={10} /> LIVE</span></h1>
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
            <div className="an-state-icon" style={{ background: "rgba(244,63,94,0.1)" }}>
              <AlertCircle size={24} color="#f43f5e" />
            </div>
            <div className="an-state-title">Something went wrong</div>
            <div className="an-state-sub">{error}</div>
            <button className="an-btn-primary" onClick={reset}>
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
            <div className="an-state-icon" style={{ background: "rgba(99,102,241,0.1)" }}>
              <FileText size={24} color="var(--indigo)" />
            </div>
            <div className="an-state-title">No analysis data available</div>
            <div className="an-state-sub">Upload a resume to generate your first analysis report.</div>
            <button className="an-btn-primary" onClick={reset}>
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
                <span className="an-title-tag" style={{ color: "var(--emerald)", background: "rgba(16,185,129,0.1)" }}>
                  <CheckCircle2 size={10} /> COMPLETE
                </span>
              </h1>
              <p className="an-sub">Detailed breakdown of your resume-to-job match.</p>
            </div>
            <button className="an-btn-ghost" onClick={reset}>
              <RotateCcw size={13} /> Analyze Another
            </button>
          </div>

          {/* info strip */}
          <div className="an-info-strip">
            <div className="an-info-item">
              <FileText size={12} />
              {file?.name || "resume.pdf"}
            </div>
            <div className="an-info-sep" />
            <div className="an-info-item">
              <Cpu size={12} />
              AI_MODEL_v2
            </div>
            <div className="an-info-sep" />
            <div className="an-info-item">
              <ScanLine size={12} />
              {new Date().toLocaleTimeString()}
            </div>
            <div style={{ marginLeft: "auto" }}>
              <span
                className="an-info-badge"
                style={{ background: "rgba(16,185,129,0.1)", color: "var(--emerald)", border: "1px solid rgba(16,185,129,0.15)" }}
              >
                <CheckCircle2 size={10} /> SUCCESS
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