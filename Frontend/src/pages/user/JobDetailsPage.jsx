import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  MapPin, DollarSign, Calendar, ArrowLeft, Zap,
  Briefcase, Clock, Building2, Tag, ChevronRight
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

  .jd-root {
    font-family: var(--sans);
    color: var(--text);
    min-height: 100%;
    padding-bottom: 3rem;
  }

  /* Ambient glow */
  .jd-root::before {
    content: '';
    position: fixed;
    top: -200px; left: 50%;
    transform: translateX(-50%);
    width: 800px; height: 500px;
    background: radial-gradient(ellipse at center, rgba(99,102,241,.07) 0%, transparent 65%);
    pointer-events: none;
    z-index: 0;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ══ LOADING ══ */
  .jd-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 18px;
    padding: 5rem 2rem;
    animation: fadeUp .4s ease both;
  }
  .jd-loading-bars {
    display: flex;
    align-items: flex-end;
    gap: 5px;
    height: 30px;
  }
  .jd-loading-bar {
    width: 4px;
    border-radius: 4px;
    background: var(--indigo);
    animation: barBounce 1s ease infinite;
  }
  .jd-loading-bar:nth-child(1) { height: 14px; animation-delay: 0s; }
  .jd-loading-bar:nth-child(2) { height: 22px; animation-delay: .15s; }
  .jd-loading-bar:nth-child(3) { height: 30px; animation-delay: .3s; }
  .jd-loading-bar:nth-child(4) { height: 18px; animation-delay: .45s; }
  .jd-loading-bar:nth-child(5) { height: 10px; animation-delay: .6s; }
  @keyframes barBounce {
    0%,100% { opacity: .25; transform: scaleY(.55); }
    50%      { opacity: 1;   transform: scaleY(1); }
  }
  .jd-loading-text {
    font-size: 13px;
    color: var(--text-3);
    letter-spacing: .05em;
  }

  /* ══ NOT FOUND ══ */
  .jd-not-found {
    background: var(--bg-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    padding: 5rem 2rem;
    text-align: center;
    animation: fadeUp .4s ease both;
    position: relative;
    overflow: hidden;
  }
  .jd-not-found::before {
    content: '';
    position: absolute;
    top: 0; left: 20%; right: 20%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--indigo), var(--violet), transparent);
    opacity: .6;
  }
  .jd-not-found-num {
    font-size: 5.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--indigo), var(--violet));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    margin-bottom: .5rem;
    opacity: .25;
    letter-spacing: -.06em;
  }
  .jd-not-found-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: .5rem;
    letter-spacing: -.025em;
  }
  .jd-not-found-sub {
    font-size: 13.5px;
    color: var(--text-2);
    font-weight: 300;
  }

  /* ══ BACK LINK ══ */
  .jd-back {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 12.5px;
    font-weight: 600;
    color: var(--text-3);
    text-decoration: none;
    letter-spacing: .03em;
    margin-bottom: 1.75rem;
    transition: color .15s;
    animation: fadeUp .35s ease both;
  }
  .jd-back:hover { color: var(--indigo); }
  .jd-back svg { transition: transform .15s; }
  .jd-back:hover svg { transform: translateX(-3px); }

  /* ══ HERO CARD ══ */
  .jd-hero {
    background: var(--bg-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    overflow: hidden;
    margin-bottom: 1.25rem;
    animation: fadeUp .4s .05s ease both;
    position: relative;
    transition: border-color .25s, box-shadow .25s;
  }
  .jd-hero:hover {
    border-color: rgba(99,102,241,.3);
    box-shadow: 0 20px 60px rgba(0,0,0,.35), 0 0 40px var(--indigo-glo);
  }

  /* Top accent bar — indigo→violet */
  .jd-hero-bar {
    height: 2px;
    background: linear-gradient(90deg, var(--indigo), var(--violet), var(--emerald));
  }

  .jd-hero-body {
    padding: 2.25rem 2.25rem 2rem;
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
  }
  .jd-hero-logo {
    width: 56px; height: 56px;
    border-radius: 14px;
    background: var(--indigo-lt);
    border: 1px solid rgba(99,102,241,.2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--indigo);
  }
  .jd-hero-info { flex: 1; min-width: 200px; }
  .jd-hero-company {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: .16em;
    text-transform: uppercase;
    color: var(--indigo);
    margin-bottom: .45rem;
  }
  .jd-hero-title {
    font-size: clamp(1.7rem, 3.5vw, 2.5rem);
    font-weight: 800;
    color: var(--text);
    line-height: 1.05;
    letter-spacing: -.05em;
    margin-bottom: 1.1rem;
  }
  .jd-hero-meta {
    display: flex;
    flex-wrap: wrap;
    gap: .55rem;
  }

  /* Meta chips — pill shaped */
  .jd-meta-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    font-weight: 500;
    padding: 5px 13px;
    border-radius: var(--radius-btn);
    border: 1px solid var(--border);
    color: var(--text-2);
    background: var(--bg-3);
    white-space: nowrap;
    transition: border-color .15s, color .15s;
  }
  .jd-meta-chip svg { color: var(--text-3); flex-shrink: 0; }
  .jd-meta-chip:hover { border-color: var(--border-hi); color: var(--text); }
  .jd-meta-chip.deadline {
    border-color: rgba(245,158,11,.2);
    background: var(--amber-lt);
    color: var(--amber);
  }
  .jd-meta-chip.deadline svg { color: var(--amber); }

  /* Hero footer strip */
  .jd-hero-footer {
    padding: 1.1rem 2.25rem;
    border-top: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    background: var(--bg-3);
    position: relative;
    z-index: 1;
  }
  .jd-hero-footer-label {
    font-size: 12px;
    color: var(--text-2);
    display: flex;
    align-items: center;
    gap: 7px;
    font-weight: 500;
  }
  .jd-hero-footer-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--emerald);
    box-shadow: 0 0 7px var(--emerald);
    animation: emeraldPulse 2.2s ease infinite;
    flex-shrink: 0;
  }
  @keyframes emeraldPulse {
    0%,100% { opacity:1; transform: scale(1); }
    50%      { opacity:.35; transform: scale(1.5); }
  }

  /* ══ TWO-COLUMN LAYOUT ══ */
  .jd-cols {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 1.25rem;
    align-items: start;
  }
  @media (max-width: 900px) {
    .jd-cols { grid-template-columns: 1fr; }
  }

  /* ══ CARD BASE ══ */
  .jd-card {
    background: var(--bg-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    overflow: hidden;
    transition: border-color .25s, box-shadow .25s;
  }
  .jd-card:hover {
    border-color: rgba(99,102,241,.25);
    box-shadow: 0 12px 40px rgba(0,0,0,.3), 0 0 30px var(--indigo-glo);
  }
  .jd-card-head {
    padding: 1.1rem 1.6rem;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 9px;
    background: var(--bg-3);
  }
  .jd-card-head-icon {
    width: 28px; height: 28px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .jd-card-head-title {
    font-size: .95rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -.02em;
  }
  .jd-card-body { padding: 1.6rem; }

  /* Description */
  .jd-desc {
    font-size: 13.5px;
    line-height: 1.9;
    color: var(--text-2);
    white-space: pre-line;
    font-weight: 300;
  }
  .jd-desc-fade { position: relative; }
  .jd-desc-fade.collapsed {
    max-height: 260px;
    overflow: hidden;
  }
  .jd-desc-fade.collapsed::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 80px;
    background: linear-gradient(to bottom, transparent, var(--bg-2));
  }
  .jd-read-more {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-top: .85rem;
    font-size: 12.5px;
    font-weight: 700;
    color: var(--indigo);
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    font-family: var(--sans);
    letter-spacing: .02em;
    transition: gap .15s, color .15s;
  }
  .jd-read-more:hover { gap: 8px; color: var(--violet); }

  /* Skills */
  .jd-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }
  .jd-skill-tag {
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    font-weight: 500;
    padding: 5px 12px;
    border-radius: 8px;
    background: var(--bg-3);
    border: 1px solid var(--border);
    color: var(--text-2);
    transition: background .15s, border-color .15s, color .15s;
    cursor: default;
  }
  .jd-skill-tag:hover {
    background: var(--indigo-lt);
    border-color: rgba(99,102,241,.25);
    color: var(--text);
  }

  /* ══ SIDEBAR ══ */
  .jd-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    animation: fadeUp .4s .18s ease both;
  }

  /* CTA card */
  .jd-cta-card {
    background: var(--bg-2);
    border: 1px solid rgba(99,102,241,.2);
    border-radius: var(--radius-card);
    padding: 1.75rem;
    text-align: center;
    position: relative;
    overflow: hidden;
    transition: border-color .25s, box-shadow .25s;
  }
  .jd-cta-card::before {
    content: '';
    position: absolute;
    top: 0; left: 15%; right: 15%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--indigo), var(--violet), transparent);
  }
  /* Inner glow orb */
  .jd-cta-card::after {
    content: '';
    position: absolute;
    top: -80px; left: 50%;
    transform: translateX(-50%);
    width: 240px; height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--indigo-glo), transparent 70%);
    pointer-events: none;
  }
  .jd-cta-card:hover {
    border-color: rgba(99,102,241,.35);
    box-shadow: 0 16px 48px rgba(0,0,0,.35), 0 0 40px var(--indigo-glo);
  }
  .jd-cta-eyebrow {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--indigo);
    margin-bottom: .75rem;
    position: relative;
    z-index: 1;
  }
  .jd-cta-title {
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--text);
    line-height: 1.2;
    margin-bottom: .5rem;
    letter-spacing: -.035em;
    position: relative;
    z-index: 1;
  }
  .jd-cta-sub {
    font-size: 12.5px;
    color: var(--text-2);
    margin-bottom: 1.5rem;
    line-height: 1.7;
    font-weight: 300;
    position: relative;
    z-index: 1;
  }

  /* Primary button — pill, indigo→violet gradient */
  .jd-btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    padding: 11px 20px;
    border-radius: var(--radius-btn);
    font-family: var(--sans);
    font-size: 13.5px;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
    border: none;
    background: linear-gradient(135deg, var(--indigo), var(--violet));
    box-shadow: 0 4px 20px var(--indigo-glo);
    transition: filter .2s, box-shadow .2s, transform .15s;
    cursor: pointer;
    white-space: nowrap;
    position: relative;
    z-index: 1;
  }
  .jd-btn-primary:hover {
    filter: brightness(1.15);
    box-shadow: 0 6px 30px var(--indigo-glo);
    transform: translateY(-1px);
  }
  .jd-btn-primary.sm {
    font-size: 12.5px;
    padding: 9px 16px;
  }
  .jd-btn-primary.full { width: 100%; box-sizing: border-box; }

  .jd-cta-note {
    font-size: 10.5px;
    color: var(--text-3);
    margin-top: .75rem;
    position: relative;
    z-index: 1;
  }

  /* Quick facts */
  .jd-facts { list-style: none; padding: 0; margin: 0; }
  .jd-fact {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: .85rem 0;
    border-bottom: 1px solid var(--border);
  }
  .jd-fact:last-child { border-bottom: none; }
  .jd-fact-icon {
    width: 30px; height: 30px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .jd-fact-label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: var(--text-3);
    margin-bottom: 3px;
  }
  .jd-fact-value {
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
  }

  /* Ghost button — pill */
  .jd-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 18px;
    border: 1px solid var(--border);
    border-radius: var(--radius-btn);
    font-family: var(--sans);
    font-size: 13px;
    font-weight: 600;
    color: var(--text-2);
    text-decoration: none;
    background: transparent;
    transition: border-color .18s, color .18s, background .18s;
  }
  .jd-btn-ghost:hover {
    border-color: rgba(99,102,241,.4);
    color: var(--text);
    background: var(--indigo-lt);
  }

  /* Bottom action strip */
  .jd-actions {
    display: flex;
    gap: .75rem;
    margin-top: 1.25rem;
    animation: fadeUp .4s .25s ease both;
  }

  /* Left col stagger */
  .jd-left > * { animation: fadeUp .4s ease both; }
  .jd-left > *:nth-child(1) { animation-delay: .1s; }
  .jd-left > *:nth-child(2) { animation-delay: .17s; }
  .jd-left > *:nth-child(3) { animation-delay: .24s; }
`;

/* ══════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════ */
const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/user/jobs/${id}`);
        if (data.success) setJob(data.data);
        else toast.error(data.message || "Failed to fetch job details");
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch job details");
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [id]);

  const deadline = job?.deadline ? new Date(job.deadline) : null;
  const daysLeft = deadline
    ? Math.ceil((deadline - Date.now()) / 86400000)
    : null;

  return (
    <>
      <style>{styles}</style>
      <DashboardLayout>
        <div className="jd-root">

          {/* ── Loading ── */}
          {loading && (
            <div className="jd-loading">
              <div className="jd-loading-bars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="jd-loading-bar" />
                ))}
              </div>
              <div className="jd-loading-text">Fetching job details…</div>
            </div>
          )}

          {/* ── Not found ── */}
          {!loading && !job && (
            <div className="jd-not-found">
              <div className="jd-not-found-num">404</div>
              <div className="jd-not-found-title">Job not found</div>
              <div className="jd-not-found-sub">
                This listing may have been removed or the link is invalid.
              </div>
              <Link
                to="/jobs"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: "1.25rem",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--indigo)",
                  textDecoration: "none",
                }}
              >
                <ArrowLeft size={13} /> Back to Jobs
              </Link>
            </div>
          )}

          {/* ── Main content ── */}
          {!loading && job && (
            <>
              {/* Back link */}
              <Link to="/jobs" className="jd-back">
                <ArrowLeft size={13} /> All Jobs
              </Link>

              {/* ── Hero card ── */}
              <div className="jd-hero">
                <div className="jd-hero-bar" />
                <div className="jd-hero-body">
                  <div className="jd-hero-logo">
                    <Building2 size={24} />
                  </div>
                  <div className="jd-hero-info">
                    <div className="jd-hero-company">{job.comName}</div>
                    <h1 className="jd-hero-title">{job.jobTitle}</h1>
                    <div className="jd-hero-meta">
                      {job.location && (
                        <span className="jd-meta-chip">
                          <MapPin size={12} /> {job.location}
                        </span>
                      )}
                      {job.salary && (
                        <span className="jd-meta-chip">
                          <DollarSign size={12} /> {job.salary}
                        </span>
                      )}
                      {deadline && (
                        <span className="jd-meta-chip deadline">
                          <Calendar size={12} />
                          Apply by{" "}
                          {deadline.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                          {daysLeft > 0 && <>&nbsp;·&nbsp;{daysLeft}d left</>}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="jd-hero-footer">
                  <div className="jd-hero-footer-label">
                    <span className="jd-hero-footer-dot" />
                    Actively hiring
                  </div>
                  <Link
                    to={`/analysis/${job._id}`}
                    className="jd-btn-primary sm"
                  >
                    <Zap size={13} /> Analyze My Resume
                  </Link>
                </div>
              </div>

              {/* ── Two-column layout ── */}
              <div className="jd-cols">
                {/* Left column */}
                <div
                  className="jd-left"
                  style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
                >
                  {/* Description */}
                  {job.desc && (
                    <div className="jd-card">
                      <div className="jd-card-head">
                        <div
                          className="jd-card-head-icon"
                          style={{ background: "var(--indigo-lt)", border: "1px solid rgba(99,102,241,.15)" }}
                        >
                          <Briefcase size={13} color="var(--indigo)" />
                        </div>
                        <span className="jd-card-head-title">Job Description</span>
                      </div>
                      <div className="jd-card-body">
                        <div className={`jd-desc-fade${expanded ? "" : " collapsed"}`}>
                          <p className="jd-desc">{job.desc}</p>
                        </div>
                        {job.desc.length > 500 && (
                          <button
                            className="jd-read-more"
                            onClick={() => setExpanded((v) => !v)}
                          >
                            {expanded ? "Show less" : "Read more"}
                            <ChevronRight
                              size={12}
                              style={{
                                transform: expanded ? "rotate(90deg)" : "none",
                                transition: "transform .2s",
                              }}
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {job.skills?.length > 0 && (
                    <div className="jd-card">
                      <div className="jd-card-head">
                        <div
                          className="jd-card-head-icon"
                          style={{ background: "var(--violet-lt)", border: "1px solid rgba(139,92,246,.15)" }}
                        >
                          <Tag size={13} color="var(--violet)" />
                        </div>
                        <span className="jd-card-head-title">Required Skills</span>
                        <span
                          style={{
                            marginLeft: "auto",
                            fontSize: 11,
                            fontWeight: 700,
                            color: "var(--text-3)",
                            letterSpacing: ".05em",
                          }}
                        >
                          {job.skills.length} skills
                        </span>
                      </div>
                      <div className="jd-card-body">
                        <div className="jd-skills">
                          {job.skills.map((skill, i) => (
                            <span key={i} className="jd-skill-tag">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right sidebar */}
                <div className="jd-sidebar">
                  {/* CTA card */}
                  <div className="jd-cta-card">
                    <div className="jd-cta-eyebrow">Ready to apply?</div>
                    <div className="jd-cta-title">Check your fit score</div>
                    <div className="jd-cta-sub">
                      Upload your resume and our AI will score it against this role in under a minute.
                    </div>
                    <Link
                      to={`/analysis/${job._id}`}
                      className="jd-btn-primary full"
                    >
                      <Zap size={14} /> Analyze Resume
                    </Link>
                    <div className="jd-cta-note">Free · No credit card required</div>
                  </div>

                  {/* Quick facts */}
                  <div className="jd-card">
                    <div className="jd-card-head">
                      <div
                        className="jd-card-head-icon"
                        style={{ background: "var(--emerald-lt)", border: "1px solid rgba(16,185,129,.15)" }}
                      >
                        <Clock size={13} color="var(--emerald)" />
                      </div>
                      <span className="jd-card-head-title">Quick Facts</span>
                    </div>
                    <div className="jd-card-body" style={{ padding: "0 1.4rem" }}>
                      <ul className="jd-facts">
                        {job.comName && (
                          <li className="jd-fact">
                            <div
                              className="jd-fact-icon"
                              style={{ background: "var(--indigo-lt)", border: "1px solid rgba(99,102,241,.15)" }}
                            >
                              <Building2 size={13} color="var(--indigo)" />
                            </div>
                            <div>
                              <div className="jd-fact-label">Company</div>
                              <div className="jd-fact-value">{job.comName}</div>
                            </div>
                          </li>
                        )}
                        {job.location && (
                          <li className="jd-fact">
                            <div
                              className="jd-fact-icon"
                              style={{ background: "var(--violet-lt)", border: "1px solid rgba(139,92,246,.15)" }}
                            >
                              <MapPin size={13} color="var(--violet)" />
                            </div>
                            <div>
                              <div className="jd-fact-label">Location</div>
                              <div className="jd-fact-value">{job.location}</div>
                            </div>
                          </li>
                        )}
                        {job.salary && (
                          <li className="jd-fact">
                            <div
                              className="jd-fact-icon"
                              style={{ background: "var(--emerald-lt)", border: "1px solid rgba(16,185,129,.15)" }}
                            >
                              <DollarSign size={13} color="var(--emerald)" />
                            </div>
                            <div>
                              <div className="jd-fact-label">Salary</div>
                              <div className="jd-fact-value">{job.salary}</div>
                            </div>
                          </li>
                        )}
                        {deadline && (
                          <li className="jd-fact">
                            <div
                              className="jd-fact-icon"
                              style={{ background: "var(--rose-lt)", border: "1px solid rgba(244,63,94,.15)" }}
                            >
                              <Calendar size={13} color="var(--rose)" />
                            </div>
                            <div>
                              <div className="jd-fact-label">Deadline</div>
                              <div className="jd-fact-value">
                                {deadline.toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                                {daysLeft > 0 && (
                                  <span
                                    style={{
                                      fontSize: 10,
                                      fontWeight: 700,
                                      marginLeft: 7,
                                      color: daysLeft <= 3 ? "var(--rose)" : "var(--emerald)",
                                    }}
                                  >
                                    {daysLeft}d left
                                  </span>
                                )}
                              </div>
                            </div>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom action */}
              <div className="jd-actions">
                <Link to="/jobs" className="jd-btn-ghost">
                  <ArrowLeft size={13} /> Back to Jobs
                </Link>
              </div>
            </>
          )}

        </div>
      </DashboardLayout>
    </>
  );
};

export default JobDetailsPage;