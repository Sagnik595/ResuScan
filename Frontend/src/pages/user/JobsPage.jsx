import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  MapPin, DollarSign, Calendar, Zap, ArrowRight,
  Briefcase, Search, Sparkles
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/axiosInstance";

/* ══════════════════════════════════════════════════
   DESIGN TOKENS & GLOBAL STYLES
══════════════════════════════════════════════════ */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

  :root {
    --bg:          #05070f;
    --bg-2:        #0c0f1e;
    --bg-3:        #111526;
    --bg-4:        #161a2e;
    --border:      rgba(255,255,255,.07);
    --border-hi:   rgba(255,255,255,.13);
    --text:        #eef0ff;
    --text-2:      #7b82a8;
    --text-3:      #3d4260;
    --indigo:      #6366f1;
    --violet:      #8b5cf6;
    --emerald:     #10b981;
    --indigo-lt:   rgba(99,102,241,.10);
    --indigo-glo:  rgba(99,102,241,.22);
    --violet-lt:   rgba(139,92,246,.10);
    --violet-glo:  rgba(139,92,246,.22);
    --emerald-lt:  rgba(16,185,129,.10);
    --emerald-glo: rgba(16,185,129,.18);
    --rose:        #f43f5e;
    --rose-lt:     rgba(244,63,94,.10);
    --amber:       #f59e0b;
    --amber-lt:    rgba(245,158,11,.10);
    --sans:        'Outfit', sans-serif;
    --radius-card: 20px;
    --radius-btn:  100px;
  }

  * { box-sizing: border-box; }

  .jp-root {
    font-family: var(--sans);
    color: var(--text);
    min-height: 100%;
    padding-bottom: 3rem;
    background: var(--bg);
  }

  /* ── Ambient background glow ── */
  .jp-root::before {
    content: '';
    position: fixed;
    top: -200px;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 500px;
    background: radial-gradient(ellipse at center, rgba(99,102,241,.07) 0%, transparent 65%);
    pointer-events: none;
    z-index: 0;
  }

  /* ══ HEADER ══ */
  .jp-header {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 2.25rem;
    gap: 1rem;
    flex-wrap: wrap;
    animation: jFadeDown .5s cubic-bezier(.22,.68,0,1.2) both;
  }
  @keyframes jFadeDown {
    from { opacity: 0; transform: translateY(-14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .jp-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--indigo);
    margin-bottom: .6rem;
  }
  .jp-eyebrow-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--indigo);
    box-shadow: 0 0 8px var(--indigo);
  }

  .jp-title {
    font-size: clamp(1.9rem, 3.5vw, 2.75rem);
    font-weight: 800;
    color: var(--text);
    line-height: 1;
    letter-spacing: -.05em;
    margin-bottom: .45rem;
  }
  .jp-title-gradient {
    font-weight: 300;
    background: linear-gradient(135deg, var(--indigo) 0%, var(--violet) 50%, var(--emerald) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .jp-sub {
    font-size: 13.5px;
    color: var(--text-2);
    font-weight: 300;
    line-height: 1.6;
  }

  /* count badge */
  .jp-count-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: var(--indigo-lt);
    border: 1px solid rgba(99,102,241,.22);
    border-radius: var(--radius-btn);
    padding: 7px 16px;
    font-size: 12px;
    font-weight: 700;
    color: var(--indigo);
    white-space: nowrap;
    align-self: flex-start;
    letter-spacing: .03em;
  }
  .jp-count-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--emerald);
    box-shadow: 0 0 7px var(--emerald);
    animation: pulse 2.2s ease infinite;
  }
  @keyframes pulse {
    0%,100% { opacity:1; transform: scale(1); }
    50%      { opacity:.35; transform: scale(1.5); }
  }

  /* ══ SEARCH ══ */
  .jp-search-wrap {
    position: relative;
    margin-bottom: 2rem;
    animation: jFadeDown .5s .08s cubic-bezier(.22,.68,0,1.2) both;
  }
  .jp-search-icon {
    position: absolute;
    left: 17px; top: 50%;
    transform: translateY(-50%);
    color: var(--text-3);
    pointer-events: none;
  }
  .jp-search {
    width: 100%;
    padding: 14px 18px 14px 48px;
    background: var(--bg-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    color: var(--text);
    font-family: var(--sans);
    font-size: 14px;
    font-weight: 400;
    outline: none;
    transition: border-color .2s, box-shadow .2s;
  }
  .jp-search::placeholder { color: var(--text-3); }
  .jp-search:focus {
    border-color: rgba(99,102,241,.4);
    box-shadow: 0 0 0 3px var(--indigo-lt), 0 0 20px var(--indigo-glo);
  }

  /* ══ SKELETON ══ */
  .jp-skeleton-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
    gap: 1.25rem;
  }
  .jp-skeleton-card {
    background: var(--bg-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 13px;
    overflow: hidden;
  }
  .jp-skel {
    border-radius: 8px;
    background: linear-gradient(
      90deg,
      var(--bg-3) 25%,
      rgba(255,255,255,.04) 50%,
      var(--bg-3) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.7s infinite;
  }
  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* ══ EMPTY STATE ══ */
  .jp-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 5.5rem 2rem;
    text-align: center;
    background: var(--bg-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    position: relative;
    overflow: hidden;
    animation: cardIn .4s ease both;
  }
  .jp-empty::before {
    content: '';
    position: absolute;
    top: 0; left: 15%; right: 15%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--indigo), var(--violet), transparent);
    opacity: .6;
  }
  .jp-empty-icon {
    width: 58px; height: 58px;
    border-radius: 18px;
    background: var(--indigo-lt);
    border: 1px solid rgba(99,102,241,.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--indigo);
  }
  .jp-empty-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -.025em;
  }
  .jp-empty-sub {
    font-size: 13px;
    color: var(--text-2);
    font-weight: 300;
    max-width: 250px;
    line-height: 1.75;
  }
  .jp-empty-clear {
    font-size: 12.5px;
    color: var(--indigo);
    font-weight: 700;
    background: none;
    border: 1px solid rgba(99,102,241,.25);
    border-radius: var(--radius-btn);
    padding: 6px 16px;
    cursor: pointer;
    font-family: var(--sans);
    transition: background .2s, color .2s;
    margin-top: .25rem;
  }
  .jp-empty-clear:hover {
    background: var(--indigo-lt);
    color: #fff;
  }

  /* ══ JOBS GRID ══ */
  .jp-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
    gap: 1.25rem;
  }

  /* ══ JOB CARD ══ */
  .jp-card {
    background: var(--bg-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    transition: border-color .25s, box-shadow .25s, transform .25s;
    animation: cardIn .5s cubic-bezier(.22,.68,0,1.2) both;
  }
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .jp-card:hover {
    border-color: rgba(99,102,241,.35);
    box-shadow:
      0 20px 60px rgba(0,0,0,.4),
      0 0 0 1px rgba(99,102,241,.15),
      0 0 40px var(--indigo-glo);
    transform: translateY(-4px);
  }

  /* Top accent bar */
  .jp-card-bar {
    height: 2px;
    width: 100%;
    flex-shrink: 0;
  }
  .jp-card:nth-child(3n+1) .jp-card-bar {
    background: linear-gradient(90deg, var(--indigo), var(--violet));
  }
  .jp-card:nth-child(3n+2) .jp-card-bar {
    background: linear-gradient(90deg, var(--violet), var(--rose));
  }
  .jp-card:nth-child(3n+3) .jp-card-bar {
    background: linear-gradient(90deg, var(--emerald), #4ade80);
  }

  /* Glow orb inside card (appears on hover) */
  .jp-card::after {
    content: '';
    position: absolute;
    top: -60px; left: 50%;
    transform: translateX(-50%);
    width: 200px; height: 200px;
    border-radius: 50%;
    pointer-events: none;
    opacity: 0;
    transition: opacity .4s;
  }
  .jp-card:nth-child(3n+1)::after { background: radial-gradient(circle, var(--indigo-glo), transparent 70%); }
  .jp-card:nth-child(3n+2)::after { background: radial-gradient(circle, var(--violet-glo), transparent 70%); }
  .jp-card:nth-child(3n+3)::after { background: radial-gradient(circle, var(--emerald-glo), transparent 70%); }
  .jp-card:hover::after { opacity: 1; }

  .jp-card-body {
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
  }

  /* Card top row */
  .jp-card-top {
    display: flex;
    align-items: flex-start;
    gap: .85rem;
    margin-bottom: 1.1rem;
  }
  .jp-card-logo {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 1px solid transparent;
  }
  .jp-card:nth-child(3n+1) .jp-card-logo {
    background: var(--indigo-lt);
    border-color: rgba(99,102,241,.2);
    color: var(--indigo);
  }
  .jp-card:nth-child(3n+2) .jp-card-logo {
    background: var(--violet-lt);
    border-color: rgba(139,92,246,.2);
    color: var(--violet);
  }
  .jp-card:nth-child(3n+3) .jp-card-logo {
    background: var(--emerald-lt);
    border-color: rgba(16,185,129,.2);
    color: var(--emerald);
  }

  .jp-card-header-text { flex: 1; min-width: 0; }
  .jp-card-company {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: .14em;
    text-transform: uppercase;
    margin-bottom: .3rem;
  }
  .jp-card:nth-child(3n+1) .jp-card-company { color: var(--indigo); }
  .jp-card:nth-child(3n+2) .jp-card-company { color: var(--violet); }
  .jp-card:nth-child(3n+3) .jp-card-company { color: var(--emerald); }

  .jp-card-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text);
    line-height: 1.25;
    letter-spacing: -.025em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Meta rows */
  .jp-card-meta {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 1rem;
  }
  .jp-card-meta-row {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    color: var(--text-2);
    font-weight: 400;
  }
  .jp-card-meta-row svg { color: var(--text-3); flex-shrink: 0; }

  /* Skills */
  .jp-card-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 1.25rem;
    flex: 1;
    align-content: flex-start;
  }
  .jp-skill {
    font-size: 11px;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 6px;
    border: 1px solid var(--border);
    color: var(--text-2);
    background: var(--bg-3);
    transition: border-color .15s, color .15s, background .15s;
  }
  .jp-card:hover .jp-skill {
    border-color: var(--border-hi);
    color: var(--text);
  }
  .jp-skill-more {
    font-size: 11px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 6px;
    border: 1px solid var(--border);
    color: var(--text-3);
  }

  /* Deadline pill */
  .jp-deadline {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: var(--radius-btn);
    background: var(--amber-lt);
    border: 1px solid rgba(245,158,11,.2);
    color: var(--amber);
    margin-bottom: 1.1rem;
    width: fit-content;
  }
  .jp-deadline.urgent {
    background: var(--rose-lt);
    border-color: rgba(244,63,94,.2);
    color: var(--rose);
  }

  /* Actions */
  .jp-card-actions {
    display: flex;
    gap: 8px;
    margin-top: auto;
    padding-top: 1.1rem;
    border-top: 1px solid var(--border);
  }

  /* Ghost button */
  .jp-btn-ghost {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 9px 14px;
    border: 1px solid var(--border);
    border-radius: var(--radius-btn);
    font-family: var(--sans);
    font-size: 12.5px;
    font-weight: 600;
    color: var(--text-2);
    text-decoration: none;
    background: transparent;
    transition: border-color .18s, color .18s, background .18s;
    white-space: nowrap;
  }
  .jp-btn-ghost:hover {
    border-color: rgba(99,102,241,.4);
    color: var(--text);
    background: var(--indigo-lt);
  }

  /* Primary button — indigo→violet gradient, pill */
  .jp-btn-primary {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 9px 14px;
    border-radius: var(--radius-btn);
    font-family: var(--sans);
    font-size: 12.5px;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
    border: none;
    background: linear-gradient(135deg, var(--indigo), var(--violet));
    box-shadow: 0 4px 18px var(--indigo-glo);
    transition: filter .2s, box-shadow .2s, transform .15s;
    white-space: nowrap;
  }
  .jp-btn-primary:hover {
    filter: brightness(1.15);
    box-shadow: 0 6px 28px var(--indigo-glo);
    transform: translateY(-1px);
  }

  /* Stagger delays */
  .jp-card:nth-child(1)  { animation-delay: .04s; }
  .jp-card:nth-child(2)  { animation-delay: .08s; }
  .jp-card:nth-child(3)  { animation-delay: .12s; }
  .jp-card:nth-child(4)  { animation-delay: .16s; }
  .jp-card:nth-child(5)  { animation-delay: .20s; }
  .jp-card:nth-child(6)  { animation-delay: .24s; }
  .jp-card:nth-child(7)  { animation-delay: .28s; }
  .jp-card:nth-child(8)  { animation-delay: .32s; }
  .jp-card:nth-child(9)  { animation-delay: .36s; }
  .jp-card:nth-child(n+10) { animation-delay: .40s; }
`;

/* ══════════════════════════════════════════════════
   SKELETON CARD
══════════════════════════════════════════════════ */
function SkeletonCard() {
  return (
    <div className="jp-skeleton-card">
      {/* accent bar */}
      <div
        className="jp-skel"
        style={{
          height: 2,
          borderRadius: 0,
          margin: "-1.75rem -1.75rem 0",
          width: "calc(100% + 3.5rem)",
        }}
      />
      {/* logo + header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}>
        <div className="jp-skel" style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div className="jp-skel" style={{ height: 9, width: "45%", marginBottom: 8 }} />
          <div className="jp-skel" style={{ height: 14, width: "75%" }} />
        </div>
      </div>
      {/* meta */}
      <div className="jp-skel" style={{ height: 10, width: "55%" }} />
      <div className="jp-skel" style={{ height: 10, width: "38%" }} />
      {/* skills */}
      <div style={{ display: "flex", gap: 6 }}>
        {[64, 78, 52].map((w, i) => (
          <div key={i} className="jp-skel" style={{ height: 24, width: w, borderRadius: 6 }} />
        ))}
      </div>
      {/* actions */}
      <div
        style={{
          display: "flex",
          gap: 8,
          paddingTop: 14,
          marginTop: 4,
          borderTop: "1px solid rgba(255,255,255,.04)",
        }}
      >
        <div className="jp-skel" style={{ flex: 1, height: 36, borderRadius: 100 }} />
        <div className="jp-skel" style={{ flex: 1, height: 36, borderRadius: 100 }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════ */
const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/user/jobs");
        if (data.success) setJobs(data.data || []);
        else toast.error(data.message || "Failed to fetch jobs");
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filtered = jobs.filter((j) => {
    const q = search.toLowerCase();
    return (
      !q ||
      j.jobTitle?.toLowerCase().includes(q) ||
      j.comName?.toLowerCase().includes(q) ||
      j.location?.toLowerCase().includes(q) ||
      j.skills?.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <>
      <style>{styles}</style>
      <DashboardLayout>
        <div className="jp-root">

          {/* ── Header ── */}
          <div className="jp-header">
            <div>
              <div className="jp-eyebrow">
                <span className="jp-eyebrow-dot" />
                Opportunities
              </div>
              <h1 className="jp-title">
                Available{" "}
                <span className="jp-title-gradient">Jobs</span>
              </h1>
              <p className="jp-sub">Browse listings and match your resume against any role.</p>
            </div>
            {!loading && jobs.length > 0 && (
              <div className="jp-count-badge">
                <span className="jp-count-dot" />
                {filtered.length} listing{filtered.length !== 1 ? "s" : ""}
              </div>
            )}
          </div>

          {/* ── Search ── */}
          {!loading && jobs.length > 0 && (
            <div className="jp-search-wrap">
              <Search size={15} className="jp-search-icon" />
              <input
                className="jp-search"
                placeholder="Search by title, company, location or skill…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}

          {/* ── Loading skeletons ── */}
          {loading && (
            <div className="jp-skeleton-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* ── Empty state ── */}
          {!loading && filtered.length === 0 && (
            <div className="jp-empty">
              <div className="jp-empty-icon">
                <Sparkles size={22} />
              </div>
              <div className="jp-empty-title">
                {search ? "No matches found" : "No jobs yet"}
              </div>
              <div className="jp-empty-sub">
                {search
                  ? `Nothing matched "${search}". Try a different keyword.`
                  : "Check back soon — new listings are added regularly."}
              </div>
              {search && (
                <button className="jp-empty-clear" onClick={() => setSearch("")}>
                  Clear search
                </button>
              )}
            </div>
          )}

          {/* ── Jobs grid ── */}
          {!loading && filtered.length > 0 && (
            <div className="jp-grid">
              {filtered.map((job) => {
                const deadline = job.deadline ? new Date(job.deadline) : null;
                const daysLeft = deadline
                  ? Math.ceil((deadline - Date.now()) / 86400000)
                  : null;
                const urgent = daysLeft !== null && daysLeft <= 3;

                return (
                  <div key={job._id} className="jp-card">
                    <div className="jp-card-bar" />
                    <div className="jp-card-body">

                      {/* Top */}
                      <div className="jp-card-top">
                        <div className="jp-card-logo">
                          <Briefcase size={18} />
                        </div>
                        <div className="jp-card-header-text">
                          <div className="jp-card-company">{job.comName}</div>
                          <div className="jp-card-title" title={job.jobTitle}>
                            {job.jobTitle}
                          </div>
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="jp-card-meta">
                        {job.location && (
                          <div className="jp-card-meta-row">
                            <MapPin size={12} />
                            {job.location}
                          </div>
                        )}
                        {job.salary && (
                          <div className="jp-card-meta-row">
                            <DollarSign size={12} />
                            {job.salary}
                          </div>
                        )}
                      </div>

                      {/* Deadline */}
                      {deadline && daysLeft > 0 && (
                        <div className={`jp-deadline${urgent ? " urgent" : ""}`}>
                          <Calendar size={11} />
                          {urgent
                            ? `${daysLeft}d left — closing soon!`
                            : `Apply by ${deadline.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}`}
                        </div>
                      )}

                      {/* Skills */}
                      {job.skills?.length > 0 && (
                        <div className="jp-card-skills">
                          {job.skills.slice(0, 4).map((skill, i) => (
                            <span key={i} className="jp-skill">{skill}</span>
                          ))}
                          {job.skills.length > 4 && (
                            <span className="jp-skill-more">
                              +{job.skills.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="jp-card-actions">
                        <Link to={`/jobs/${job._id}`} className="jp-btn-ghost">
                          Details <ArrowRight size={12} />
                        </Link>
                        <Link to={`/analysis/${job._id}`} className="jp-btn-primary">
                          <Zap size={12} /> Analyze
                        </Link>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </DashboardLayout>
    </>
  );
};

export default JobsPage;