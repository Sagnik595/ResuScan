// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// import DashboardLayout from "../../components/layout/DashboardLayout";
// import api from "../../services/axiosInstance";

// const JobDetailsPage = () => {
//   const { id } = useParams();

//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchJobDetails = async () => {
//     try {
//       setLoading(true);

//       const { data } = await api.get(`/user/jobs/${id}`);

//       if (data.success) {
//         setJob(data.data);
//       } else {
//         toast.error(data.message || "Failed to fetch job details");
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Failed to fetch job details"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobDetails();
//   }, [id]);

//   return (
//     <DashboardLayout>
//       <div className="space-y-8">
//         {/* Loading */}
//         {loading && (
//           <div className="card p-6 text-center">
//             <p className="text-slate-600">Loading job details...</p>
//           </div>
//         )}

//         {/* Job Details */}
//         {!loading && job && (
//           <>
//             {/* Header */}
//             <div className="card p-8">
//               <h1 className="text-3xl font-bold text-slate-900">
//                 {job.jobTitle}
//               </h1>

//               <p className="mt-2 text-lg font-medium text-indigo-600">
//                 {job.comName}
//               </p>

//               <div className="mt-4 space-y-2 text-slate-600">
//                 {job.location && (
//                   <p>
//                     <span className="font-medium">Location:</span>{" "}
//                     {job.location}
//                   </p>
//                 )}

//                 {job.salary && (
//                   <p>
//                     <span className="font-medium">Salary:</span>{" "}
//                     {job.salary}
//                   </p>
//                 )}

//                 {job.deadline && (
//                   <p>
//                     <span className="font-medium">Apply Before:</span>{" "}
//                     {new Date(job.deadline).toLocaleDateString()}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Required Skills */}
//             {job.skills?.length > 0 && (
//               <div className="card p-8">
//                 <h2 className="text-2xl font-semibold text-slate-900">
//                   Required Skills
//                 </h2>

//                 <div className="mt-4 flex flex-wrap gap-2">
//                   {job.skills.map((skill, index) => (
//                     <span
//                       key={index}
//                       className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-600"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Job Description */}
//             {job.desc && (
//               <div className="card p-8">
//                 <h2 className="text-2xl font-semibold text-slate-900">
//                   Job Description
//                 </h2>

//                 <p className="mt-4 whitespace-pre-line text-slate-700 leading-7">
//                   {job.desc}
//                 </p>
//               </div>
//             )}

//             {/* Actions */}
//             <div className="flex flex-wrap gap-4">
//               <Link
//                 to="/jobs"
//                 className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
//               >
//                 Back to Jobs
//               </Link>

//               <Link
//                 to={`/analysis/${job._id}`}
//                 className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700"
//               >
//                 Analyze Resume
//               </Link>
//             </div>
//           </>
//         )}

//         {/* Not Found */}
//         {!loading && !job && (
//           <div className="card p-6 text-center">
//             <p className="text-slate-600">Job not found.</p>
//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// };

// export default JobDetailsPage;




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
   STYLES
══════════════════════════════════════════════════ */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,700&family=Geist:wght@300;400;500;600&display=swap');

  :root {
    --cream:    #faf8f3;
    --paper:    #ffffff;
    --rule:     #e8e2d6;
    --ink:      #1c1812;
    --ink-2:    #4a4236;
    --ink-3:    #9c8f7e;
    --ink-4:    #c8bfb0;
    --amber:    #c2600a;
    --amber-lt: #fef0e4;
    --amber-md: #f97316;
    --teal:     #0f766e;
    --teal-lt:  #f0fdf9;
    --red-lt:   #fff1f0;
    --red:      #c0392b;
    --sans:     'Geist', sans-serif;
    --serif:    'Fraunces', serif;
  }

  .jd-root {
    font-family: var(--sans);
    color: var(--ink);
    background: var(--cream);
    min-height: 100%;
  }

  /* ── loading ── */
  .jd-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 5rem 2rem;
    animation: fadeUp .4s ease both;
  }
  .jd-loading-bars {
    display: flex;
    align-items: flex-end;
    gap: 5px;
    height: 28px;
  }
  .jd-loading-bar {
    width: 4px;
    border-radius: 4px;
    background: var(--amber);
    animation: barBounce 1s ease infinite;
  }
  .jd-loading-bar:nth-child(1) { height: 14px; animation-delay: 0s; }
  .jd-loading-bar:nth-child(2) { height: 22px; animation-delay: .15s; }
  .jd-loading-bar:nth-child(3) { height: 28px; animation-delay: .3s; }
  .jd-loading-bar:nth-child(4) { height: 18px; animation-delay: .45s; }
  .jd-loading-bar:nth-child(5) { height: 10px; animation-delay: .6s; }
  @keyframes barBounce {
    0%,100% { opacity: .35; transform: scaleY(.6); }
    50% { opacity: 1; transform: scaleY(1); }
  }
  .jd-loading-text {
    font-size: 13px;
    color: var(--ink-3);
    letter-spacing: .04em;
  }

  /* ── not found ── */
  .jd-not-found {
    background: var(--paper);
    border: 1.5px solid var(--rule);
    border-radius: 18px;
    padding: 4rem 2rem;
    text-align: center;
    animation: fadeUp .4s ease both;
  }
  .jd-not-found-num {
    font-family: var(--serif);
    font-size: 5rem;
    font-weight: 900;
    color: var(--rule);
    line-height: 1;
    margin-bottom: .5rem;
  }
  .jd-not-found-title {
    font-family: var(--serif);
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: .5rem;
  }
  .jd-not-found-sub {
    font-size: 13.5px;
    color: var(--ink-3);
  }

  /* ── main layout ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── back link ── */
  .jd-back {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 12.5px;
    font-weight: 500;
    color: var(--ink-3);
    text-decoration: none;
    letter-spacing: .03em;
    margin-bottom: 1.75rem;
    transition: color .15s;
    animation: fadeUp .35s ease both;
  }
  .jd-back:hover { color: var(--amber); }
  .jd-back svg { transition: transform .15s; }
  .jd-back:hover svg { transform: translateX(-3px); }

  /* ── hero card ── */
  .jd-hero {
    background: var(--paper);
    border: 1.5px solid var(--rule);
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 1.25rem;
    animation: fadeUp .4s .05s ease both;
    position: relative;
  }
  /* top accent stripe */
  .jd-hero-stripe {
    height: 4px;
    background: linear-gradient(90deg, var(--amber) 0%, var(--amber-md) 50%, #fbbf24 100%);
  }
  .jd-hero-body {
    padding: 2.25rem 2.25rem 2rem;
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  .jd-hero-logo {
    width: 60px; height: 60px;
    border-radius: 14px;
    background: var(--amber-lt);
    border: 1.5px solid #fde9d4;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--amber);
  }
  .jd-hero-info { flex: 1; min-width: 200px; }
  .jd-hero-company {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: var(--amber);
    margin-bottom: .4rem;
  }
  .jd-hero-title {
    font-family: var(--serif);
    font-size: clamp(1.6rem, 3.5vw, 2.4rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.1;
    letter-spacing: -.03em;
    margin-bottom: 1rem;
  }
  .jd-hero-meta {
    display: flex;
    flex-wrap: wrap;
    gap: .6rem;
  }
  .jd-meta-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    font-weight: 500;
    padding: 5px 12px;
    border-radius: 100px;
    border: 1.5px solid var(--rule);
    color: var(--ink-2);
    background: var(--cream);
    white-space: nowrap;
  }
  .jd-meta-chip svg { color: var(--ink-3); flex-shrink: 0; }
  .jd-meta-chip.deadline {
    border-color: #fde9d4;
    background: var(--amber-lt);
    color: var(--amber);
  }
  .jd-meta-chip.deadline svg { color: var(--amber-md); }

  /* ── hero CTA strip ── */
  .jd-hero-footer {
    padding: 1.25rem 2.25rem;
    border-top: 1.5px solid var(--rule);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    background: var(--cream);
    flex-wrap: wrap;
  }
  .jd-hero-footer-label {
    font-size: 12px;
    color: var(--ink-3);
    letter-spacing: .02em;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .jd-hero-footer-label span {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--teal);
    display: inline-block;
    animation: greenPulse 2s ease infinite;
  }
  @keyframes greenPulse {
    0%,100% { opacity: 1; box-shadow: 0 0 0 0 rgba(15,118,110,.4); }
    50% { opacity: .7; box-shadow: 0 0 0 5px transparent; }
  }

  /* ── two-column layout ── */
  .jd-cols {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 1.25rem;
    align-items: start;
  }
  @media (max-width: 900px) {
    .jd-cols { grid-template-columns: 1fr; }
  }

  /* ── card base ── */
  .jd-card {
    background: var(--paper);
    border: 1.5px solid var(--rule);
    border-radius: 18px;
    overflow: hidden;
    transition: box-shadow .2s;
  }
  .jd-card:hover { box-shadow: 0 6px 24px rgba(28,24,18,.06); }
  .jd-card-head {
    padding: 1.25rem 1.75rem;
    border-bottom: 1.5px solid var(--rule);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .jd-card-head-icon {
    width: 28px; height: 28px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .jd-card-head-title {
    font-family: var(--serif);
    font-size: 1rem;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -.02em;
  }
  .jd-card-body { padding: 1.75rem; }

  /* desc text */
  .jd-desc {
    font-size: 14px;
    line-height: 1.85;
    color: var(--ink-2);
    white-space: pre-line;
  }
  .jd-desc-fade {
    position: relative;
  }
  .jd-desc-fade.collapsed {
    max-height: 280px;
    overflow: hidden;
  }
  .jd-desc-fade.collapsed::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 80px;
    background: linear-gradient(to bottom, transparent, var(--paper));
  }
  .jd-read-more {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-top: .75rem;
    font-size: 12.5px;
    font-weight: 600;
    color: var(--amber);
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    letter-spacing: .02em;
    transition: gap .15s;
  }
  .jd-read-more:hover { gap: 8px; }

  /* skills */
  .jd-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }
  .jd-skill-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    font-weight: 500;
    padding: 5px 12px;
    border-radius: 7px;
    background: var(--cream);
    border: 1.5px solid var(--rule);
    color: var(--ink-2);
    transition: background .15s, border-color .15s, color .15s;
    cursor: default;
  }
  .jd-skill-tag:hover {
    background: var(--amber-lt);
    border-color: #fde9d4;
    color: var(--amber);
  }

  /* sidebar */
  .jd-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    animation: fadeUp .4s .18s ease both;
  }

  /* apply CTA card */
  .jd-cta-card {
    background: var(--ink);
    border-radius: 18px;
    padding: 1.75rem;
    text-align: center;
  }
  .jd-cta-eyebrow {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: rgba(255,255,255,.35);
    margin-bottom: .75rem;
  }
  .jd-cta-title {
    font-family: var(--serif);
    font-size: 1.25rem;
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
    margin-bottom: .5rem;
    letter-spacing: -.02em;
  }
  .jd-cta-sub {
    font-size: 12px;
    color: rgba(255,255,255,.38);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
  .jd-cta-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 13px;
    background: linear-gradient(135deg, var(--amber-md), #ea580c);
    border: none;
    border-radius: 10px;
    color: #fff;
    font-family: var(--sans);
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    transition: filter .2s, box-shadow .2s;
    box-shadow: 0 4px 20px rgba(249,115,22,.35);
    letter-spacing: .01em;
    box-sizing: border-box;
  }
  .jd-cta-btn:hover {
    filter: brightness(1.1);
    box-shadow: 0 6px 28px rgba(249,115,22,.5);
  }
  .jd-cta-note {
    font-size: 10.5px;
    color: rgba(255,255,255,.22);
    margin-top: .75rem;
  }

  /* quick facts sidebar card */
  .jd-facts { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; }
  .jd-fact {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: .9rem 0;
    border-bottom: 1px solid var(--rule);
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
    font-size: 10px;
    font-weight: 600;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: var(--ink-3);
    margin-bottom: 2px;
  }
  .jd-fact-value {
    font-size: 13px;
    font-weight: 600;
    color: var(--ink);
  }

  /* action strip at bottom */
  .jd-actions {
    display: flex;
    flex-wrap: wrap;
    gap: .75rem;
    margin-top: 1.25rem;
    animation: fadeUp .4s .25s ease both;
  }
  .jd-action-back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 20px;
    border: 1.5px solid var(--rule);
    border-radius: 9px;
    font-size: 13px;
    font-weight: 500;
    color: var(--ink-2);
    text-decoration: none;
    background: var(--paper);
    transition: background .15s, border-color .15s;
  }
  .jd-action-back:hover { background: var(--cream); border-color: var(--ink-4); }

  /* left col stagger */
  .jd-left > * { animation: fadeUp .4s ease both; }
  .jd-left > *:nth-child(1) { animation-delay: .1s; }
  .jd-left > *:nth-child(2) { animation-delay: .16s; }
  .jd-left > *:nth-child(3) { animation-delay: .22s; }
`;

/* ══════════════════════════════════════════════════
   MAIN
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

          {/* ── loading ── */}
          {loading && (
            <div className="jd-loading">
              <div className="jd-loading-bars">
                {[1,2,3,4,5].map(i => <div key={i} className="jd-loading-bar" />)}
              </div>
              <div className="jd-loading-text">Fetching job details…</div>
            </div>
          )}

          {/* ── not found ── */}
          {!loading && !job && (
            <div className="jd-not-found">
              <div className="jd-not-found-num">404</div>
              <div className="jd-not-found-title">Job not found</div>
              <div className="jd-not-found-sub">This listing may have been removed or the link is invalid.</div>
              <Link to="/jobs" style={{ display:"inline-flex",alignItems:"center",gap:6,marginTop:"1.25rem",fontSize:13,fontWeight:600,color:"var(--amber)",textDecoration:"none" }}>
                <ArrowLeft size={13} /> Back to Jobs
              </Link>
            </div>
          )}

          {/* ── content ── */}
          {!loading && job && (
            <>
              <Link to="/jobs" className="jd-back">
                <ArrowLeft size={13} /> All Jobs
              </Link>

              {/* ── hero card ── */}
              <div className="jd-hero" style={{ marginBottom: "1.25rem" }}>
                <div className="jd-hero-stripe" />
                <div className="jd-hero-body">
                  <div className="jd-hero-logo">
                    <Building2 size={26} />
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
                          Apply by {deadline.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
                          {daysLeft > 0 && <>&nbsp;·&nbsp;{daysLeft}d left</>}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="jd-hero-footer">
                  <div className="jd-hero-footer-label">
                    <span /> Actively hiring
                  </div>
                  <Link to={`/analysis/${job._id}`} className="jd-cta-btn" style={{ width:"auto",padding:"9px 20px",fontSize:13 }}>
                    <Zap size={13} /> Analyze My Resume
                  </Link>
                </div>
              </div>

              {/* ── two-col layout ── */}
              <div className="jd-cols">
                {/* left */}
                <div className="jd-left" style={{ display:"flex",flexDirection:"column",gap:"1.25rem" }}>

                  {/* description */}
                  {job.desc && (
                    <div className="jd-card">
                      <div className="jd-card-head">
                        <div className="jd-card-head-icon" style={{ background:"#fff7ed" }}>
                          <Briefcase size={14} color="var(--amber)" />
                        </div>
                        <span className="jd-card-head-title">Job Description</span>
                      </div>
                      <div className="jd-card-body">
                        <div className={`jd-desc-fade${expanded ? "" : " collapsed"}`}>
                          <p className="jd-desc">{job.desc}</p>
                        </div>
                        {job.desc.length > 500 && (
                          <button className="jd-read-more" onClick={() => setExpanded(v => !v)}>
                            {expanded ? "Show less" : "Read more"} <ChevronRight size={12} style={{ transform: expanded ? "rotate(90deg)" : "none", transition:"transform .2s" }} />
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* skills */}
                  {job.skills?.length > 0 && (
                    <div className="jd-card">
                      <div className="jd-card-head">
                        <div className="jd-card-head-icon" style={{ background:"#fff7ed" }}>
                          <Tag size={14} color="var(--amber)" />
                        </div>
                        <span className="jd-card-head-title">Required Skills</span>
                        <span style={{ marginLeft:"auto",fontSize:11,fontWeight:600,color:"var(--ink-3)" }}>
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

                {/* right sidebar */}
                <div className="jd-sidebar">
                  {/* big CTA */}
                  <div className="jd-cta-card">
                    <div className="jd-cta-eyebrow">Ready to apply?</div>
                    <div className="jd-cta-title">Check your fit score</div>
                    <div className="jd-cta-sub">
                      Upload your resume and our AI will score it against this role in under a minute.
                    </div>
                    <Link to={`/analysis/${job._id}`} className="jd-cta-btn">
                      <Zap size={14} /> Analyze Resume
                    </Link>
                    <div className="jd-cta-note">Free · No credit card required</div>
                  </div>

                  {/* quick facts */}
                  <div className="jd-card">
                    <div className="jd-card-head">
                      <div className="jd-card-head-icon" style={{ background:"#f0fdf9" }}>
                        <Clock size={14} color="var(--teal)" />
                      </div>
                      <span className="jd-card-head-title">Quick Facts</span>
                    </div>
                    <div className="jd-card-body" style={{ padding:"0 1.25rem" }}>
                      <ul className="jd-facts">
                        {job.comName && (
                          <li className="jd-fact">
                            <div className="jd-fact-icon" style={{ background:"#fff7ed" }}>
                              <Building2 size={14} color="var(--amber)" />
                            </div>
                            <div>
                              <div className="jd-fact-label">Company</div>
                              <div className="jd-fact-value">{job.comName}</div>
                            </div>
                          </li>
                        )}
                        {job.location && (
                          <li className="jd-fact">
                            <div className="jd-fact-icon" style={{ background:"#f0fdf9" }}>
                              <MapPin size={14} color="var(--teal)" />
                            </div>
                            <div>
                              <div className="jd-fact-label">Location</div>
                              <div className="jd-fact-value">{job.location}</div>
                            </div>
                          </li>
                        )}
                        {job.salary && (
                          <li className="jd-fact">
                            <div className="jd-fact-icon" style={{ background:"#fefce8" }}>
                              <DollarSign size={14} color="#a16207" />
                            </div>
                            <div>
                              <div className="jd-fact-label">Salary</div>
                              <div className="jd-fact-value">{job.salary}</div>
                            </div>
                          </li>
                        )}
                        {deadline && (
                          <li className="jd-fact">
                            <div className="jd-fact-icon" style={{ background:"#fff1f0" }}>
                              <Calendar size={14} color="var(--red)" />
                            </div>
                            <div>
                              <div className="jd-fact-label">Deadline</div>
                              <div className="jd-fact-value">
                                {deadline.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}
                                {daysLeft > 0 && (
                                  <span style={{ fontSize:10,fontWeight:600,marginLeft:6,color: daysLeft <= 3 ? "var(--red)" : "var(--teal)" }}>
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

              {/* bottom back link */}
              <div className="jd-actions">
                <Link to="/jobs" className="jd-action-back">
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