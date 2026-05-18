// import React, { useEffect, useState } from "react";
// import { FileText, BarChart3, Briefcase } from "lucide-react";
// import { toast } from "react-toastify";

// import DashboardLayout from "../../components/layout/DashboardLayout";
// import StatsCard from "../../components/dashboard/StatsCard";
// import ResumeLimitCard from "../../components/dashboard/ResumeLimitCard";
// import RecentAnalysisCard from "../../components/dashboard/RecentAnalysisCard";
// import api from "../../services/axiosInstance";

// const DashboardPage = () => {
//   const [userData, setUserData] = useState({
//     resumeLimit: 0,
//     totalJobs: 0,
//     totalAnalyses: 0,
//     latestAnalysis: null,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);

//         // Fetch user data
//         const userRes = await api.get("/user/profile");
//         if (userRes.data.success) {
//           setUserData((prev) => ({
//             ...prev,
//             resumeLimit: userRes.data.data?.resumeLimit || 0,
//           }));
//         }

//         // Fetch jobs count
//         const jobsRes = await api.get("/user/jobs");
//         if (jobsRes.data.success) {
//           setUserData((prev) => ({
//             ...prev,
//             totalJobs: jobsRes.data.data?.length || 0,
//           }));
//         }
//       } catch (error) {
//         toast.error("Failed to load dashboard data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   return (
//     <DashboardLayout>
//       <div className="space-y-8">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
//           <p className="mt-2 text-slate-600">
//             Overview of your resume analysis activity.
//           </p>
//         </div>

//         <div className="grid gap-6 md:grid-cols-3">
//           <ResumeLimitCard remaining={userData.resumeLimit} />

//           <StatsCard
//             title="Jobs Available"
//             value={userData.totalJobs}
//             icon={Briefcase}
//             color="blue"
//           />

//           <StatsCard
//             title="Analyses Completed"
//             value={userData.totalAnalyses}
//             icon={BarChart3}
//             color="green"
//           />
//         </div>

//         <RecentAnalysisCard {...userData.latestAnalysis} />
//       </div>
//     </DashboardLayout>
//   );
// };

// export default DashboardPage;




import React, { useEffect, useState } from "react";
import { FileText, BarChart3, Briefcase, ArrowUpRight, Sparkles, Clock, ChevronRight, TrendingUp } from "lucide-react";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/axiosInstance";

/* ─────────────────────────── styles ─────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Epilogue:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  :root {
    --ink:      #0f1117;
    --ink-2:    #3a3d4a;
    --ink-3:    #7a7e8e;
    --ink-4:    #b8bcc8;
    --surface:  #f5f4f0;
    --paper:    #ffffff;
    --rule:     #e8e6e0;
    --amber:    #f59e0b;
    --amber-lt: #fef3c7;
    --teal:     #0d9488;
    --teal-lt:  #ccfbf1;
    --rose:     #e11d48;
    --rose-lt:  #ffe4e6;
    --blue:     #2563eb;
    --blue-lt:  #dbeafe;
  }

  .db-root {
    font-family: 'Epilogue', sans-serif;
    background: var(--surface);
    min-height: 100vh;
    color: var(--ink);
  }

  /* ── page header ── */
  .db-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding-bottom: 2rem;
    border-bottom: 2px solid var(--ink);
    margin-bottom: 2.5rem;
    gap: 1rem;
    animation: fadeDown .5s cubic-bezier(.22,1,.36,1) both;
  }
  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .db-header-left {}
  .db-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'Syne', sans-serif;
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--ink-3);
    margin-bottom: .6rem;
  }
  .db-eyebrow-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--amber);
  }
  .db-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 4vw, 3.25rem);
    font-weight: 800;
    line-height: .95;
    letter-spacing: -.03em;
    color: var(--ink);
  }
  .db-title-accent {
    font-family: 'Epilogue', sans-serif;
    font-style: italic;
    font-weight: 300;
    color: var(--ink-3);
    font-size: clamp(1.1rem, 2vw, 1.6rem);
    display: block;
    margin-top: .35rem;
    letter-spacing: -.01em;
  }
  .db-date-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--paper);
    border: 1.5px solid var(--rule);
    border-radius: 100px;
    padding: 8px 16px;
    font-size: 12.5px;
    color: var(--ink-2);
    white-space: nowrap;
  }
  .db-date-badge svg { color: var(--ink-3); }

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
    background: var(--paper);
    border: 1.5px solid var(--rule);
    border-radius: 16px;
    padding: 1.6rem 1.5rem;
    position: relative;
    overflow: hidden;
    cursor: default;
    transition: transform .2s, box-shadow .2s, border-color .2s;
  }
  .db-stat:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(15,17,23,.08);
    border-color: var(--ink-4);
  }
  .db-stat.featured {
    grid-column: span 1;
    background: var(--ink);
    border-color: var(--ink);
    color: white;
  }
  .db-stat-corner {
    position: absolute;
    top: 0; right: 0;
    width: 80px; height: 80px;
    border-radius: 0 16px 0 80px;
    opacity: .06;
  }
  .db-stat.featured .db-stat-corner { opacity: .12; background: white; }
  .db-stat-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }
  .db-stat-icon-wrap {
    width: 38px; height: 38px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .db-stat-arrow {
    width: 30px; height: 30px;
    border-radius: 50%;
    border: 1.5px solid var(--rule);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ink-3);
    transition: background .2s, color .2s;
  }
  .db-stat:hover .db-stat-arrow {
    background: var(--ink);
    color: white;
    border-color: var(--ink);
  }
  .db-stat.featured .db-stat-arrow {
    border-color: rgba(255,255,255,.2);
    color: rgba(255,255,255,.5);
  }
  .db-stat.featured:hover .db-stat-arrow {
    background: white;
    color: var(--ink);
    border-color: white;
  }
  .db-stat-label {
    font-family: 'Syne', sans-serif;
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: var(--ink-3);
    margin-bottom: .4rem;
  }
  .db-stat.featured .db-stat-label { color: rgba(255,255,255,.45); }
  .db-stat-value {
    font-family: 'Syne', sans-serif;
    font-size: 3rem;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -.04em;
    color: var(--ink);
    margin-bottom: .3rem;
  }
  .db-stat.featured .db-stat-value { color: white; }
  .db-stat-sub {
    font-size: 12px;
    color: var(--ink-3);
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .db-stat.featured .db-stat-sub { color: rgba(255,255,255,.38); }
  .db-stat-pill {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 10.5px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 100px;
  }

  /* loading skeleton */
  .db-skeleton {
    background: linear-gradient(90deg, var(--rule) 25%, var(--surface) 50%, var(--rule) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 8px;
  }
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* ── number count-up ── */
  .db-countup {
    display: inline-block;
  }

  /* ── bottom grid ── */
  .db-bottom {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 1.25rem;
    margin-top: 1.25rem;
  }
  @media (max-width: 960px) {
    .db-bottom { grid-template-columns: 1fr; }
  }

  /* recent analysis card */
  .db-analysis {
    background: var(--paper);
    border: 1.5px solid var(--rule);
    border-radius: 16px;
    padding: 1.75rem;
    transition: box-shadow .2s;
  }
  .db-analysis:hover { box-shadow: 0 8px 32px rgba(15,17,23,.06); }
  .db-section-label {
    font-family: 'Syne', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--ink-3);
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .db-section-label::after {
    content: '';
    flex: 1; height: 1px;
    background: var(--rule);
  }
  .db-analysis-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 3rem 1rem;
    color: var(--ink-4);
    text-align: center;
  }
  .db-analysis-empty-icon {
    width: 52px; height: 52px;
    border-radius: 14px;
    background: var(--surface);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ink-4);
  }
  .db-analysis-empty p {
    font-size: 13px;
    color: var(--ink-3);
    max-width: 200px;
    line-height: 1.6;
  }
  .db-analysis-content {}
  .db-analysis-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1.25rem;
    gap: 1rem;
  }
  .db-analysis-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--ink);
    line-height: 1.25;
  }
  .db-analysis-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--ink-3);
    margin-top: 4px;
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
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.1rem;
    color: var(--ink);
    letter-spacing: -.03em;
    line-height: 1;
  }
  .db-score-ring-text small {
    font-size: 9px;
    font-weight: 500;
    color: var(--ink-3);
    letter-spacing: .05em;
  }

  /* score bars */
  .db-bars { display: flex; flex-direction: column; gap: .7rem; }
  .db-bar-row { display: flex; align-items: center; gap: 10px; }
  .db-bar-label {
    font-size: 11.5px;
    color: var(--ink-2);
    width: 110px;
    flex-shrink: 0;
  }
  .db-bar-track {
    flex: 1;
    height: 5px;
    background: var(--surface);
    border-radius: 10px;
    overflow: hidden;
  }
  .db-bar-fill {
    height: 100%;
    border-radius: 10px;
    transition: width 1.2s cubic-bezier(.22,1,.36,1);
  }
  .db-bar-pct {
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: var(--ink-2);
    width: 28px;
    text-align: right;
    flex-shrink: 0;
  }

  /* quick actions panel */
  .db-actions {
    background: var(--ink);
    border: 1.5px solid var(--ink);
    border-radius: 16px;
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .db-actions .db-section-label { color: rgba(255,255,255,.3); }
  .db-actions .db-section-label::after { background: rgba(255,255,255,.08); }
  .db-action-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 13px 0;
    border-bottom: 1px solid rgba(255,255,255,.07);
    cursor: pointer;
    transition: opacity .15s;
    background: none;
    border-left: none;
    border-right: none;
    border-top: none;
    width: 100%;
    text-align: left;
    color: inherit;
  }
  .db-action-btn:first-of-type { border-top: 1px solid rgba(255,255,255,.07); }
  .db-action-btn:hover { opacity: .7; }
  .db-action-icon {
    width: 34px; height: 34px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .db-action-text { flex: 1; }
  .db-action-name {
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,.9);
    line-height: 1.2;
  }
  .db-action-desc {
    font-size: 11px;
    color: rgba(255,255,255,.3);
    margin-top: 2px;
  }
  .db-action-arr {
    color: rgba(255,255,255,.25);
    transition: color .15s, transform .15s;
  }
  .db-action-btn:hover .db-action-arr { color: rgba(255,255,255,.7); transform: translateX(3px); }

  /* card animations */
  .db-stat { animation: cardIn .45s cubic-bezier(.22,1,.36,1) both; }
  .db-stat:nth-child(1) { animation-delay: .05s; }
  .db-stat:nth-child(2) { animation-delay: .12s; }
  .db-stat:nth-child(3) { animation-delay: .19s; }
  .db-analysis { animation: cardIn .45s .28s cubic-bezier(.22,1,.36,1) both; }
  .db-actions  { animation: cardIn .45s .34s cubic-bezier(.22,1,.36,1) both; }
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(20px); }
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
  const color = score >= 75 ? "#0d9488" : score >= 50 ? "#f59e0b" : "#e11d48";
  return (
    <div className="db-score-ring">
      <svg width={size} height={size} viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="#e8e6e0" strokeWidth="5" />
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
function StatCard({ label, value, icon: Icon, iconBg, iconColor, cornerBg, pill, pillColor, pillBg, featured }) {
  const count = useCountUp(value, 900);
  return (
    <div className={`db-stat${featured ? " featured" : ""}`}>
      <div className="db-stat-corner" style={{ background: cornerBg }} />
      <div className="db-stat-top">
        <div className="db-stat-icon-wrap" style={{ background: iconBg }}>
          <Icon size={18} color={iconColor} />
        </div>
        <div className="db-stat-arrow">
          <ArrowUpRight size={14} />
        </div>
      </div>
      <div className="db-stat-label">{label}</div>
      <div className="db-stat-value">{count}</div>
      {pill && (
        <div className="db-stat-sub">
          <span className="db-stat-pill" style={{ background: pillBg, color: pillColor }}>
            <TrendingUp size={9} /> {pill}
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
    { label: "ATS Score",      pct: la?.atsScore    ?? 0, color: "#0d9488" },
    { label: "Keywords",       pct: la?.keywords    ?? 0, color: "#2563eb" },
    { label: "Formatting",     pct: la?.formatting  ?? 0, color: "#f59e0b" },
    { label: "Readability",    pct: la?.readability ?? 0, color: "#e11d48" },
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
              <Clock size={13} />
              {now}
            </div>
          </div>

          {/* ── stats ── */}
          <div className="db-stats-grid">
            <StatCard
              label="Resume Credits"
              value={loading ? 0 : userData.resumeLimit}
              icon={FileText}
              iconBg="#fef3c7"
              iconColor="#d97706"
              cornerBg="#f59e0b"
              pill="+2 this week"
              pillColor="#92400e"
              pillBg="#fde68a"
            />
            <StatCard
              label="Jobs Available"
              value={loading ? 0 : userData.totalJobs}
              icon={Briefcase}
              iconBg="#dbeafe"
              iconColor="#2563eb"
              cornerBg="#2563eb"
              pill="Live listings"
              pillColor="#1e3a8a"
              pillBg="#bfdbfe"
            />
            <StatCard
              label="Analyses Done"
              value={loading ? 0 : userData.totalAnalyses}
              icon={BarChart3}
              iconBg="#ccfbf1"
              iconColor="#0d9488"
              cornerBg="#0d9488"
              pill="All time"
              pillColor="#134e4a"
              pillBg="#99f6e4"
              featured
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
                        <Clock size={11} />
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
                  bg: "rgba(245,158,11,.18)",
                  color: "#f59e0b",
                  name: "Analyze Resume",
                  desc: "Upload & score your resume",
                },
                {
                  icon: Briefcase,
                  bg: "rgba(37,99,235,.18)",
                  color: "#60a5fa",
                  name: "Browse Jobs",
                  desc: "Find matching listings",
                },
                {
                  icon: BarChart3,
                  bg: "rgba(13,148,136,.18)",
                  color: "#2dd4bf",
                  name: "View History",
                  desc: "Past analyses & scores",
                },
                {
                  icon: Sparkles,
                  bg: "rgba(225,29,72,.18)",
                  color: "#fb7185",
                  name: "AI Suggestions",
                  desc: "Get personalized tips",
                },
              ].map((a) => (
                <button key={a.name} className="db-action-btn">
                  <div className="db-action-icon" style={{ background: a.bg }}>
                    <a.icon size={15} color={a.color} />
                  </div>
                  <div className="db-action-text">
                    <div className="db-action-name">{a.name}</div>
                    <div className="db-action-desc">{a.desc}</div>
                  </div>
                  <ChevronRight size={15} className="db-action-arr" />
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