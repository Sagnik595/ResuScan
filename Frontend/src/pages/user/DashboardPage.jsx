import React, { useEffect, useState } from "react";
import { FileText, BarChart3, Briefcase, ArrowUpRight, Sparkles, Clock, ChevronRight, TrendingUp } from "lucide-react";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/axiosInstance";

/* ─────────────────────────── styles ─────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

  :root {
    --bg-main:      #05070f;
    --surface-card: #0c0f1e;
    --accent-indigo:#6366f1;
    --accent-violet:#8b5cf6;
    --accent-emerald:#10b981;
    --text-primary: #ffffff;
    --text-muted:   #7b82a8;
    --border-glow:  rgba(99, 102, 241, 0.15);
    --border-card:  rgba(255, 255, 255, 0.07);
  }

  .db-root {
    font-family: 'Outfit', sans-serif;
    background: var(--bg-main);
    min-height: 100vh;
    color: var(--text-primary);
    padding: 2rem;
    box-sizing: border-box;
  }

  /* ── page header ── */
  .db-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--border-card);
    margin-bottom: 2.5rem;
    gap: 1rem;
    animation: fadeDown .5s cubic-bezier(.22,1,.36,1) both;
  }
  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  
  .db-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--accent-indigo);
    margin-bottom: .6rem;
  }
  .db-eyebrow-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent-emerald);
  }
  .db-title {
    font-size: clamp(2rem, 4vw, 2.75rem);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -.02em;
    color: var(--text-primary);
    margin: 0;
  }
  .db-title-accent {
    font-weight: 300;
    color: var(--text-muted);
    font-size: clamp(1rem, 2vw, 1.25rem);
    display: block;
    margin-top: .35rem;
    letter-spacing: normal;
  }
  .db-date-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--surface-card);
    border: 1px solid var(--border-card);
    border-radius: 100px;
    padding: 8px 16px;
    font-size: 13px;
    color: var(--text-muted);
    white-space: nowrap;
  }
  .db-date-badge svg { color: var(--accent-indigo); }

  /* ── stats grid ── */
  .db-stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    margin-bottom: 1.25rem;
  }
  @media (max-width: 900px) {
    .db-stats-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 580px) {
    .db-stats-grid { grid-template-columns: 1fr; }
  }

  /* stat card */
  .db-stat {
    background: var(--surface-card);
    border: 1px solid var(--border-card);
    border-radius: 20px;
    padding: 1.75rem 1.5rem;
    position: relative;
    overflow: hidden;
    cursor: default;
    transition: transform .25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow .25s, border-color .25s;
  }
  .db-stat:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px var(--border-glow);
    border-color: rgba(99, 102, 241, 0.4);
  }
  .db-stat-corner {
    position: absolute;
    top: 0; right: 0;
    width: 80px; height: 80px;
    border-radius: 0 20px 0 80px;
    opacity: .04;
  }
  .db-stat-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }
  .db-stat-icon-wrap {
    width: 42px; height: 42px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .db-stat-arrow {
    width: 32px; height: 32px;
    border-radius: 50%;
    border: 1px solid var(--border-card);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    transition: background .2s, color .2s, border-color .2s;
  }
  .db-stat:hover .db-stat-arrow {
    background: linear-gradient(135deg, var(--accent-indigo), var(--accent-violet));
    color: white;
    border-color: transparent;
  }
  .db-stat-label {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: .4rem;
  }
  .db-stat-value {
    font-size: 2.75rem;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -.03em;
    color: var(--text-primary);
    margin-bottom: .5rem;
  }
  .db-stat-sub {
    font-size: 12px;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .db-stat-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 100px;
  }

  /* loading skeleton */
  .db-skeleton {
    background: linear-gradient(90deg, #0c0f1e 25%, #171b36 50%, #0c0f1e 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 8px;
  }
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* ── bottom grid ── */
  .db-bottom {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 1.25rem;
    margin-top: 1.25rem;
  }
  @media (max-width: 960px) {
    .db-bottom { grid-template-columns: 1fr; }
  }

  /* cards components */
  .db-analysis, .db-actions {
    background: var(--surface-card);
    border: 1px solid var(--border-card);
    border-radius: 20px;
    padding: 2rem;
    transition: transform .25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow .25s, border-color .25s;
    box-sizing: border-box;
  }
  .db-analysis:hover, .db-actions:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px var(--border-glow);
    border-color: rgba(99, 102, 241, 0.4);
  }
  
  .db-section-label {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--accent-indigo);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .db-section-label::after {
    content: '';
    flex: 1; height: 1px;
    background: var(--border-card);
  }
  
  .db-analysis-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 3.5rem 1rem;
    color: var(--text-muted);
    text-align: center;
  }
  .db-analysis-empty-icon {
    width: 54px; height: 54px;
    border-radius: 16px;
    background: rgba(99, 102, 241, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-indigo);
  }
  .db-analysis-empty p {
    font-size: 14px;
    color: var(--text-muted);
    max-width: 220px;
    line-height: 1.5;
    margin: 0;
  }
  
  .db-analysis-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    gap: 1rem;
  }
  .db-analysis-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    line-height: 1.3;
  }
  .db-analysis-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: var(--text-muted);
    margin-top: 6px;
  }
  .db-analysis-meta svg {
    color: var(--text-muted);
  }
  
  .db-score-ring-wrap { flex-shrink: 0; }
  .db-score-ring { position: relative; width: 72px; height: 72px; }
  .db-score-ring svg { transform: rotate(-90deg); }
  .db-score-ring-text {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.2rem;
    color: var(--text-primary);
    line-height: 1;
  }
  .db-score-ring-text small {
    font-size: 9px;
    font-weight: 400;
    color: var(--text-muted);
    letter-spacing: .05em;
    margin-top: 2px;
  }

  /* score bars */
  .db-bars { display: flex; flex-direction: column; gap: .85rem; }
  .db-bar-row { display: flex; align-items: center; gap: 12px; }
  .db-bar-label {
    font-size: 13px;
    color: var(--text-primary);
    width: 100px;
    flex-shrink: 0;
  }
  .db-bar-track {
    flex: 1;
    height: 6px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    overflow: hidden;
  }
  .db-bar-fill {
    height: 100%;
    border-radius: 10px;
    transition: width 1.2s cubic-bezier(.22,1,.36,1);
  }
  .db-bar-pct {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-muted);
    width: 28px;
    text-align: right;
    flex-shrink: 0;
  }

  /* quick actions panel */
  .db-actions {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .db-action-btn {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid var(--border-card);
    cursor: pointer;
    background: none;
    border-left: none;
    border-right: none;
    border-top: none;
    width: 100%;
    text-align: left;
    color: inherit;
    transition: background 0.2s;
  }
  .db-action-btn:first-of-type { border-top: 1px solid var(--border-card); }
  .db-action-icon {
    width: 36px; height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .db-action-text { flex: 1; }
  .db-action-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
    line-height: 1.2;
  }
  .db-action-desc {
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 3px;
  }
  .db-action-arr {
    color: var(--text-muted);
    transition: color .2s, transform .2s;
  }
  .db-action-btn:hover .db-action-arr { 
    color: var(--accent-indigo); 
    transform: translateX(4px); 
  }

  /* card entry animation setups */
  .db-stat { animation: cardIn .45s cubic-bezier(.22,1,.36,1) both; }
  .db-stat:nth-child(1) { animation-delay: .05s; }
  .db-stat:nth-child(2) { animation-delay: .12s; }
  .db-stat:nth-child(3) { animation-delay: .19s; }
  .db-analysis { animation: cardIn .45s .28s cubic-bezier(.22,1,.36,1) both; }
  .db-actions  { animation: cardIn .45s .34s cubic-bezier(.22,1,.36,1) both; }
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(15px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

/* ─── tiny count-up hook ─── */
function useCountUp(target, duration = 900) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!target) return;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return val;
}

/* ─── score ring ─── */
function ScoreRing({ score = 0, size = 72 }) {
  const r = 28, circ = 2 * Math.PI * r;
  const filled = ((score / 100) * circ).toFixed(1);
  const color = score >= 75 ? "#10b981" : score >= 50 ? "#8b5cf6" : "#6366f1";
  return (
    <div className="db-score-ring">
      <svg width={size} height={size} viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
        <circle
          cx="36" cy="36" r={r}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circ}`}
          style={{ transition: "stroke-dasharray 1.2s cubic-bezier(.22,1,.36,1)" }}
        />
      </svg>
      <div className="db-score-ring-text">
        {score}<small>/ 100</small>
      </div>
    </div>
  );
}

/* ─── stat card ─── */
function StatCard({ label, value, icon: Icon, iconBg, iconColor, cornerBg, pill, pillColor, pillBg }) {
  const count = useCountUp(value, 900);
  return (
    <div className="db-stat">
      <div className="db-stat-corner" style={{ background: cornerBg }} />
      <div className="db-stat-top">
        <div className="db-stat-icon-wrap" style={{ background: iconBg }}>
          <Icon size={20} color={iconColor} />
        </div>
        <div className="db-stat-arrow">
          <ArrowUpRight size={15} />
        </div>
      </div>
      <div className="db-stat-label">{label}</div>
      <div className="db-stat-value">{count}</div>
      {pill && (
        <div className="db-stat-sub">
          <span className="db-stat-pill" style={{ background: pillBg, color: pillColor }}>
            <TrendingUp size={11} style={{ marginRight: '2px' }} /> {pill}
          </span>
        </div>
      )}
    </div>
  );
}

/* ─── main page ─── */
const DashboardPage = () => {
  const [userData, setUserData] = useState({
    resumeLimit: 0,
    totalJobs: 0,
    totalAnalyses: 0,
    latestAnalysis: null,
  });
  const [loading, setLoading] = useState(true);
  const [barsVisible, setBarsVisible] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const userRes = await api.get("/user/profile");
        if (userRes.data.success) {
          setUserData((prev) => ({ ...prev, resumeLimit: userRes.data.data?.resumeLimit || 0 }));
        }
        const jobsRes = await api.get("/user/jobs");
        if (jobsRes.data.success) {
          setUserData((prev) => ({ ...prev, totalJobs: jobsRes.data.data?.length || 0 }));
        }

        const userAnalysis = await api.get("/report/getAllAna");
        console.log(userAnalysis.data.numberOfAnalysis);
        
        if (userAnalysis.data.success) {
          setUserData((prev) => ({ ...prev, totalAnalyses: userAnalysis.data.numberOfAnalysis || 0 }));
        }
      } catch {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
        setTimeout(() => setBarsVisible(true), 600);
      }
    };
    fetchDashboardData();
  }, []);

  const now = new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const la = userData.latestAnalysis;

  const bars = [
    { label: "ATS Score",   pct: la?.atsScore    ?? 0, color: "#6366f1" },
    { label: "Keywords",    pct: la?.keywords    ?? 0, color: "#8b5cf6" },
    { label: "Formatting",  pct: la?.formatting  ?? 0, color: "#10b981" },
    { label: "Readability", pct: la?.readability ?? 0, color: "#6366f1" },
  ];

  return (
    <>
      <style>{styles}</style>
      <DashboardLayout>
        <div className="db-root">

          {/* ── header ── */}
          <div className="db-header">
            <div className="db-header-left">
              <div className="db-eyebrow">
                <span className="db-eyebrow-dot" />
                Resume Intelligence
              </div>
              <h1 className="db-title">
                Dashboard
                <span className="db-title-accent">your activity at a glance</span>
              </h1>
            </div>
            <div className="db-date-badge">
              <Clock size={14} />
              {now}
            </div>
          </div>

          {/* ── stats ── */}
          <div className="db-stats-grid">
            <StatCard
              label="Resume Credits"
              value={loading ? 0 : userData.resumeLimit}
              icon={FileText}
              iconBg="rgba(99, 102, 241, 0.12)"
              iconColor="#6366f1"
              cornerBg="#6366f1"
              pill="+2 this week"
              pillColor="#6366f1"
              pillBg="rgba(99, 102, 241, 0.1)"
            />
            <StatCard
              label="Jobs Available"
              value={loading ? 0 : userData.totalJobs}
              icon={Briefcase}
              iconBg="rgba(139, 92, 246, 0.12)"
              iconColor="#8b5cf6"
              cornerBg="#8b5cf6"
              pill="Live listings"
              pillColor="#8b5cf6"
              pillBg="rgba(139, 92, 246, 0.1)"
            />
            <StatCard
              label="Analyses Done"
              value={loading ? 0 : userData.totalAnalyses}
              icon={BarChart3}
              iconBg="rgba(16, 185, 129, 0.12)"
              iconColor="#10b981"
              cornerBg="#10b981"
              pill="All time"
              pillColor="#10b981"
              pillBg="rgba(16, 185, 129, 0.1)"
            />
          </div>

          {/* ── bottom row ── */}
          <div className="db-bottom">

            {/* recent analysis */}
            <div className="db-analysis">
              <div className="db-section-label">Latest Analysis</div>
              {!la ? (
                <div className="db-analysis-empty">
                  <div className="db-analysis-empty-icon">
                    <Sparkles size={22} />
                  </div>
                  <p>No analyses yet. Upload your first resume to get started.</p>
                </div>
              ) : (
                <div className="db-analysis-content">
                  <div className="db-analysis-header">
                    <div>
                      <div className="db-analysis-title">{la.jobTitle || "Resume Analysis"}</div>
                      <div className="db-analysis-meta">
                        <Clock size={13} />
                        {la.createdAt ? new Date(la.createdAt).toLocaleDateString() : "—"}
                        {la.company && <> · {la.company}</>}
                      </div>
                    </div>
                    <div className="db-score-ring-wrap">
                      <ScoreRing score={la.overallScore ?? 0} />
                    </div>
                  </div>
                  <div className="db-bars">
                    {bars.map((b) => (
                      <div className="db-bar-row" key={b.label}>
                        <span className="db-bar-label">{b.label}</span>
                        <div className="db-bar-track">
                          <div
                            className="db-bar-fill"
                            style={{
                              width: barsVisible ? `${b.pct}%` : "0%",
                              background: b.color,
                            }}
                          />
                        </div>
                        <span className="db-bar-pct">{b.pct}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* quick actions */}
            <div className="db-actions">
              <div className="db-section-label">Quick Actions</div>
              {[
                {
                  icon: FileText,
                  bg: "rgba(99, 102, 241, 0.12)",
                  color: "#6366f1",
                  name: "Analyze Resume",
                  desc: "Upload & score your resume",
                },
                {
                  icon: Briefcase,
                  bg: "rgba(139, 92, 246, 0.12)",
                  color: "#8b5cf6",
                  name: "Browse Jobs",
                  desc: "Find matching listings",
                },
                {
                  icon: BarChart3,
                  bg: "rgba(16, 185, 129, 0.12)",
                  color: "#10b981",
                  name: "View History",
                  desc: "Past analyses & scores",
                },
                {
                  icon: Sparkles,
                  bg: "rgba(99, 102, 241, 0.12)",
                  color: "#6366f1",
                  name: "AI Suggestions",
                  desc: "Get personalized tips",
                },
              ].map((a) => (
                <button key={a.name} className="db-action-btn">
                  <div className="db-action-icon" style={{ background: a.bg }}>
                    <a.icon size={16} color={a.color} />
                  </div>
                  <div className="db-action-text">
                    <div className="db-action-name">{a.name}</div>
                    <div className="db-action-desc">{a.desc}</div>
                  </div>
                  <ChevronRight size={16} className="db-action-arr" />
                </button>
              ))}
            </div>

          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default DashboardPage;