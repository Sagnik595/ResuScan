// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

// import DashboardLayout from "../../components/layout/DashboardLayout";
// import api from "../../services/axiosInstance";

// const JobsPage = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all jobs from backend
//   const fetchJobs = async () => {
//     try {
//       setLoading(true);

//       const { data } = await api.get("/user/jobs");

//       if (data.success) {
//         setJobs(data.data || []);
//       } else {
//         toast.error(data.message || "Failed to fetch jobs");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to fetch jobs");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   return (
//     <DashboardLayout>
//       <div className="space-y-8">
//         {/* Header */}
//         <div>
//           <h1 className="text-3xl font-bold text-slate-900">Available Jobs</h1>
//           <p className="mt-2 text-slate-600">
//             Browse all available job opportunities and compare your resume.
//           </p>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="card p-6 text-center">
//             <p className="text-slate-600">Loading jobs...</p>
//           </div>
//         )}

//         {/* Empty State */}
//         {!loading && jobs.length === 0 && (
//           <div className="card p-6 text-center">
//             <p className="text-slate-600">No jobs available.</p>
//           </div>
//         )}

//         {/* Jobs Grid */}
//         {!loading && jobs.length > 0 && (
//           <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//             {jobs.map((job) => (
//               <div
//                 key={job._id}
//                 className="card p-6 border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition-all"
//               >
//                 {/* Job Title */}
//                 <h2 className="text-xl font-semibold text-slate-900">
//                   {job.jobTitle}
//                 </h2>

//                 {/* Company */}
//                 <p className="mt-1 text-sm font-medium text-indigo-600">
//                   {job.comName}
//                 </p>

//                 {/* Location */}
//                 {job.location && (
//                   <p className="mt-3 text-sm text-slate-500">
//                     📍 {job.location}
//                   </p>
//                 )}

//                 {/* Salary */}
//                 {job.salary && (
//                   <p className="mt-1 text-sm text-slate-500">💰 {job.salary}</p>
//                 )}

//                 {/* Deadline */}
//                 {job.deadline && (
//                   <p className="mt-1 text-sm text-slate-500">
//                     ⏳ Apply before:{" "}
//                     {new Date(job.deadline).toLocaleDateString()}
//                   </p>
//                 )}

//                 {/* Skills */}
//                 {job.skills?.length > 0 && (
//                   <div className="mt-4 flex flex-wrap gap-2">
//                     {job.skills.slice(0, 5).map((skill, index) => (
//                       <span
//                         key={index}
//                         className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-600"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                     {job.skills.length > 5 && (
//                       <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
//                         +{job.skills.length - 5} more
//                       </span>
//                     )}
//                   </div>
//                 )}

//                 {/* Actions */}
//                 <div className="mt-6 flex gap-3">
//                   <Link
//                     to={`/jobs/${job._id}`}
//                     className="flex-1 rounded-lg border border-indigo-600 px-4 py-2 text-center text-sm font-medium text-indigo-600 hover:bg-indigo-50"
//                   >
//                     View Details
//                   </Link>

//                   <Link
//                     to={`/analysis/${job._id}`}
//                     className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700"
//                   >
//                     Analyze
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// };

// export default JobsPage;




import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  MapPin, DollarSign, Calendar, Zap, ArrowRight,
  Briefcase, Search, SlidersHorizontal, Sparkles
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/axiosInstance";

/* ══════════════════════════════════════════════════
   STYLES
══════════════════════════════════════════════════ */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Satoshi:wght@300;400;500;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap');

  :root {
    --bg:         #07080f;
    --bg-2:       #0e1018;
    --bg-3:       #141620;
    --border:     rgba(255,255,255,.07);
    --border-hi:  rgba(255,255,255,.13);
    --text:       #ecedf5;
    --text-2:     #8b8fa8;
    --text-3:     #464a60;
    --violet:     #7c6ff7;
    --violet-lt:  rgba(124,111,247,.12);
    --violet-glo: rgba(124,111,247,.2);
    --rose:       #f0547a;
    --rose-lt:    rgba(240,84,122,.1);
    --lime:       #84e07c;
    --lime-lt:    rgba(132,224,124,.1);
    --amber:      #f5a524;
    --amber-lt:   rgba(245,165,36,.1);
    --sans:       'Plus Jakarta Sans', sans-serif;
  }

  .jp-root {
    font-family: var(--sans);
    color: var(--text);
    min-height: 100%;
  }

  /* ── header ── */
  .jp-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 2rem;
    gap: 1rem;
    flex-wrap: wrap;
    animation: jFadeDown .45s ease both;
  }
  @keyframes jFadeDown {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .jp-header-left {}
  .jp-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: .16em;
    text-transform: uppercase;
    color: var(--violet);
    margin-bottom: .55rem;
  }
  .jp-eyebrow-line { width: 20px; height: 1.5px; background: var(--violet); border-radius: 2px; }
  .jp-title {
    font-size: clamp(1.8rem, 3.5vw, 2.6rem);
    font-weight: 800;
    color: var(--text);
    line-height: 1.05;
    letter-spacing: -.04em;
    margin-bottom: .4rem;
  }
  .jp-title em {
    font-style: italic;
    font-weight: 300;
    color: var(--text-2);
  }
  .jp-sub {
    font-size: 13.5px;
    color: var(--text-2);
    font-weight: 400;
  }

  /* count badge */
  .jp-count-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--violet-lt);
    border: 1px solid rgba(124,111,247,.25);
    border-radius: 100px;
    padding: 6px 14px;
    font-size: 12.5px;
    font-weight: 600;
    color: var(--violet);
    white-space: nowrap;
    align-self: flex-start;
    margin-top: .25rem;
  }
  .jp-count-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--violet);
    animation: cPulse 2s ease infinite;
  }
  @keyframes cPulse {
    0%,100% { opacity:1; }
    50% { opacity:.3; }
  }

  /* ── search bar ── */
  .jp-search-wrap {
    position: relative;
    margin-bottom: 1.75rem;
    animation: jFadeDown .45s .07s ease both;
  }
  .jp-search-icon {
    position: absolute;
    left: 16px; top: 50%;
    transform: translateY(-50%);
    color: var(--text-3);
    pointer-events: none;
  }
  .jp-search {
    width: 100%;
    padding: 13px 16px 13px 46px;
    background: var(--bg-2);
    border: 1.5px solid var(--border);
    border-radius: 12px;
    color: var(--text);
    font-family: var(--sans);
    font-size: 14px;
    outline: none;
    box-sizing: border-box;
    transition: border-color .2s, box-shadow .2s;
  }
  .jp-search::placeholder { color: var(--text-3); }
  .jp-search:focus {
    border-color: rgba(124,111,247,.4);
    box-shadow: 0 0 0 3px var(--violet-lt);
  }

  /* ── loading skeleton ── */
  .jp-skeleton-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.25rem;
    animation: jFadeDown .35s ease both;
  }
  .jp-skeleton-card {
    background: var(--bg-2);
    border: 1.5px solid var(--border);
    border-radius: 18px;
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .jp-skel {
    border-radius: 6px;
    background: linear-gradient(90deg, var(--bg-3) 25%, rgba(255,255,255,.04) 50%, var(--bg-3) 75%);
    background-size: 200% 100%;
    animation: skelShimmer 1.5s infinite;
  }
  @keyframes skelShimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* ── empty state ── */
  .jp-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 5rem 2rem;
    text-align: center;
    background: var(--bg-2);
    border: 1.5px solid var(--border);
    border-radius: 20px;
    animation: jCardIn .4s ease both;
  }
  .jp-empty-icon {
    width: 60px; height: 60px;
    border-radius: 16px;
    background: var(--violet-lt);
    border: 1.5px solid rgba(124,111,247,.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--violet);
  }
  .jp-empty-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -.02em;
  }
  .jp-empty-sub {
    font-size: 13px;
    color: var(--text-2);
    max-width: 240px;
    line-height: 1.6;
  }

  /* ── jobs grid ── */
  .jp-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.25rem;
  }

  /* ── job card ── */
  .jp-card {
    background: var(--bg-2);
    border: 1.5px solid var(--border);
    border-radius: 18px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: border-color .2s, box-shadow .2s, transform .2s;
    animation: jCardIn .45s ease both;
    position: relative;
  }
  @keyframes jCardIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .jp-card:hover {
    border-color: var(--border-hi);
    box-shadow: 0 16px 48px rgba(0,0,0,.35), 0 0 0 1px var(--border-hi);
    transform: translateY(-3px);
  }

  /* accent bar — each card gets a unique hue via nth-child */
  .jp-card-accent {
    height: 3px;
    width: 100%;
    flex-shrink: 0;
  }
  .jp-card:nth-child(3n+1) .jp-card-accent { background: linear-gradient(90deg, var(--violet), #a78bfa); }
  .jp-card:nth-child(3n+2) .jp-card-accent { background: linear-gradient(90deg, var(--rose), #fb7185); }
  .jp-card:nth-child(3n+3) .jp-card-accent { background: linear-gradient(90deg, var(--lime), #4ade80); }

  .jp-card-body { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }

  /* card top row */
  .jp-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: .75rem;
    margin-bottom: 1rem;
  }
  .jp-card-logo {
    width: 42px; height: 42px;
    border-radius: 10px;
    border: 1.5px solid var(--border);
    background: var(--bg-3);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 16px;
  }
  .jp-card:nth-child(3n+1) .jp-card-logo { background: var(--violet-lt); border-color: rgba(124,111,247,.2); color: var(--violet); }
  .jp-card:nth-child(3n+2) .jp-card-logo { background: var(--rose-lt);   border-color: rgba(240,84,122,.2);  color: var(--rose); }
  .jp-card:nth-child(3n+3) .jp-card-logo { background: var(--lime-lt);   border-color: rgba(132,224,124,.2); color: var(--lime); }

  .jp-card-header-text { flex: 1; min-width: 0; }
  .jp-card-company {
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
    margin-bottom: .3rem;
  }
  .jp-card:nth-child(3n+1) .jp-card-company { color: var(--violet); }
  .jp-card:nth-child(3n+2) .jp-card-company { color: var(--rose); }
  .jp-card:nth-child(3n+3) .jp-card-company { color: var(--lime); }

  .jp-card-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text);
    line-height: 1.25;
    letter-spacing: -.02em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* meta row */
  .jp-card-meta {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 1rem;
  }
  .jp-card-meta-row {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--text-2);
  }
  .jp-card-meta-row svg { color: var(--text-3); flex-shrink: 0; }

  /* skills */
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
    padding: 3px 9px;
    border-radius: 5px;
    border: 1px solid var(--border);
    color: var(--text-2);
    background: var(--bg-3);
    transition: border-color .15s, color .15s, background .15s;
  }
  .jp-card:hover .jp-skill {
    border-color: var(--border-hi);
  }
  .jp-skill-more {
    font-size: 11px;
    font-weight: 600;
    padding: 3px 9px;
    border-radius: 5px;
    border: 1px solid var(--border);
    color: var(--text-3);
    background: transparent;
  }

  /* deadline chip */
  .jp-deadline {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    font-weight: 600;
    padding: 3px 9px;
    border-radius: 5px;
    background: var(--amber-lt);
    border: 1px solid rgba(245,165,36,.2);
    color: var(--amber);
    margin-bottom: 1.25rem;
  }
  .jp-deadline.urgent {
    background: var(--rose-lt);
    border-color: rgba(240,84,122,.2);
    color: var(--rose);
  }

  /* card actions */
  .jp-card-actions {
    display: flex;
    gap: 8px;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
  }
  .jp-btn-ghost {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 9px 12px;
    border: 1.5px solid var(--border);
    border-radius: 9px;
    font-family: var(--sans);
    font-size: 12.5px;
    font-weight: 600;
    color: var(--text-2);
    text-decoration: none;
    background: transparent;
    transition: border-color .15s, color .15s, background .15s;
    white-space: nowrap;
  }
  .jp-btn-ghost:hover {
    border-color: var(--border-hi);
    color: var(--text);
    background: rgba(255,255,255,.03);
  }
  .jp-btn-primary {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 9px 12px;
    border-radius: 9px;
    font-family: var(--sans);
    font-size: 12.5px;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
    border: none;
    transition: filter .2s, box-shadow .2s;
    white-space: nowrap;
  }
  .jp-card:nth-child(3n+1) .jp-btn-primary { background: var(--violet); box-shadow: 0 4px 16px var(--violet-glo); }
  .jp-card:nth-child(3n+2) .jp-btn-primary { background: var(--rose);   box-shadow: 0 4px 16px rgba(240,84,122,.25); }
  .jp-card:nth-child(3n+3) .jp-btn-primary { background: #22a846;       box-shadow: 0 4px 16px rgba(132,224,124,.2); }
  .jp-btn-primary:hover { filter: brightness(1.12); }

  /* stagger card animations */
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

/* ── skeleton card ── */
function SkeletonCard() {
  return (
    <div className="jp-skeleton-card">
      <div className="jp-skel" style={{ height: 3, borderRadius: 0, margin: "-1.75rem -1.75rem 0", width: "calc(100% + 3.5rem)" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
        <div className="jp-skel" style={{ width: 42, height: 42, borderRadius: 10, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div className="jp-skel" style={{ height: 10, width: "50%", marginBottom: 7 }} />
          <div className="jp-skel" style={{ height: 14, width: "80%" }} />
        </div>
      </div>
      <div className="jp-skel" style={{ height: 10, width: "60%" }} />
      <div className="jp-skel" style={{ height: 10, width: "40%" }} />
      <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
        {[60, 80, 55].map((w, i) => <div key={i} className="jp-skel" style={{ height: 24, width: w, borderRadius: 5 }} />)}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 8, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,.05)" }}>
        <div className="jp-skel" style={{ flex: 1, height: 36, borderRadius: 9 }} />
        <div className="jp-skel" style={{ flex: 1, height: 36, borderRadius: 9 }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN
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

          {/* ── header ── */}
          <div className="jp-header">
            <div className="jp-header-left">
              <div className="jp-eyebrow">
                <span className="jp-eyebrow-line" /> Opportunities
              </div>
              <h1 className="jp-title">
                Available <em>Jobs</em>
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

          {/* ── search ── */}
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

          {/* ── loading ── */}
          {loading && (
            <div className="jp-skeleton-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* ── empty ── */}
          {!loading && filtered.length === 0 && (
            <div className="jp-empty">
              <div className="jp-empty-icon">
                <Sparkles size={24} />
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
                <button
                  onClick={() => setSearch("")}
                  style={{ fontSize: 12.5, color: "var(--violet)", fontWeight: 600, background: "none", border: "none", cursor: "pointer", marginTop: 4 }}
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          {/* ── jobs grid ── */}
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
                    <div className="jp-card-accent" />
                    <div className="jp-card-body">

                      {/* top */}
                      <div className="jp-card-top">
                        <div className="jp-card-logo">
                          <Briefcase size={18} />
                        </div>
                        <div className="jp-card-header-text">
                          <div className="jp-card-company">{job.comName}</div>
                          <div className="jp-card-title" title={job.jobTitle}>{job.jobTitle}</div>
                        </div>
                      </div>

                      {/* meta */}
                      <div className="jp-card-meta">
                        {job.location && (
                          <div className="jp-card-meta-row">
                            <MapPin size={12} /> {job.location}
                          </div>
                        )}
                        {job.salary && (
                          <div className="jp-card-meta-row">
                            <DollarSign size={12} /> {job.salary}
                          </div>
                        )}
                      </div>

                      {/* deadline */}
                      {deadline && daysLeft > 0 && (
                        <div className={`jp-deadline${urgent ? " urgent" : ""}`}>
                          <Calendar size={11} />
                          {urgent
                            ? `${daysLeft}d left — closing soon!`
                            : `Apply by ${deadline.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                        </div>
                      )}

                      {/* skills */}
                      {job.skills?.length > 0 && (
                        <div className="jp-card-skills">
                          {job.skills.slice(0, 4).map((skill, i) => (
                            <span key={i} className="jp-skill">{skill}</span>
                          ))}
                          {job.skills.length > 4 && (
                            <span className="jp-skill-more">+{job.skills.length - 4}</span>
                          )}
                        </div>
                      )}

                      {/* actions */}
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