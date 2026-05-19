import React, { useEffect, useState } from "react";
import { Trash2, Briefcase, Calendar, Building2, Layers } from "lucide-react";
import { toast } from "react-toastify";

import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import Button from "../../components/common/Button";
import api from "../../services/axiosInstance";
import { formatDate } from "../../utils/formatDate";

/* ─── Inject Custom Admin Job Board Deck CSS ───────────────────────────────── */
const STYLES = `
  .job-page {
    min-height: 100vh;
    background: 
      radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1), transparent 40%),
      radial-gradient(circle at 10% 90%, rgba(99, 102, 241, 0.05), transparent 45%),
      #040308;
    color: #f1f5f9;
    padding: 2.5rem 1.5rem;
    font-family: 'Outfit', sans-serif;
  }

  .job-content {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  /* ── Header Typography ── */
  .job-title-main {
    font-size: 2.25rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #ffffff;
    margin: 0;
  }

  .job-title-purple {
    background: linear-gradient(135deg, #c084fc 0%, #6366f1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* ── Job Postings Interactive Card Deck ── */
  .job-deck {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .job-item-card {
    background: rgba(15, 12, 30, 0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(168, 85, 247, 0.12);
    border-radius: 20px;
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
  }

  @media (min-width: 768px) {
    .job-item-card {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  .job-item-card:hover {
    transform: translateY(-2px);
    border-color: rgba(168, 85, 247, 0.3);
    background: rgba(20, 16, 38, 0.8);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), 0 0 20px rgba(139, 92, 246, 0.05);
  }

  /* Left Block Details */
  .job-icon-avatar {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(99, 102, 241, 0.05));
    border: 1px solid rgba(168, 85, 247, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #c084fc;
    flex-shrink: 0;
  }

  .job-heading {
    font-size: 1.2rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 0.35rem 0;
    letter-spacing: -0.01em;
  }

  .job-meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    align-items: center;
    margin-top: 0.5rem;
  }

  .job-meta-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
    color: #94a3b8;
  }

  .job-meta-pill svg {
    color: rgba(168, 85, 247, 0.6);
  }

  .job-deadline-tag {
    background: rgba(244, 63, 94, 0.08);
    border: 1px solid rgba(244, 63, 94, 0.15);
    color: #fda4af;
    padding: 2px 10px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  /* Custom styling override wrapper for button placement */
  .job-action-btn-zone {
    align-self: flex-end;
  }
  @media (min-width: 768px) {
    .job-action-btn-zone {
      align-self: center;
    }
  }
`;

let styleInjected = false;
function injectStyles() {
  if (styleInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.textContent = STYLES;
  document.head.appendChild(el);
  styleInjected = true;
}

const ManageJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    injectStyles();
    fetchJobs();
  }, []);

  // Securely retrieve data using explicit bearer configuration blocks
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const { data } = await api.get("/admin/allJD", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setJobs(data.data || []);
      } else {
        toast.error(data.message || "Failed to download master job index.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Internal database sync failure."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this job description tracking card?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      const token = localStorage.getItem("token");

      const { data } = await api.delete("/admin/deleteJD", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { id },
      });

      if (data.success) {
        toast.success(data.message || "Entry successfully removed.");
        setJobs((prev) => prev.filter((job) => job._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Could not complete secure entry elimination."
      );
    } finally {
      setDeletingId("");
    }
  };

  return (
    <AdminLayout>
      <div className="job-page">
        <div className="job-content">
          
          {/* ── Section Header Block ── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="job-title-main">
                Manage <span className="job-title-purple">Job Descriptions</span>
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Auditing compiled tracking structures, targets, and live index allocations.
              </p>
            </div>
            {!loading && jobs.length > 0 && (
              <div className="bg-[#120e24] border border-purple-500/15 text-purple-300 font-semibold px-4 py-1.5 rounded-full text-xs tracking-wide uppercase flex items-center gap-2">
                <Layers className="h-3.5 w-3.5 text-purple-400" />
                Index Count: {jobs.length}
              </div>
            )}
          </div>

          {/* ── Dynamic Core Rendering Layout ── */}
          {loading ? (
            <div className="py-24 flex justify-center">
              <Loader text="Decompiling active job vectors..." />
            </div>
          ) : jobs.length === 0 ? (
            <EmptyState
              title="No jobs available"
              description="The system repository contains zero records. Deploy your initial tracking card profile to populate metrics."
            />
          ) : (
            <div className="job-deck">
              {jobs.map((job) => (
                <div key={job._id} className="job-item-card">
                  
                  {/* Left Side: Avatar and Identity Specifications */}
                  <div className="flex items-start gap-4">
                    <div className="job-icon-avatar">
                      <Briefcase className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="job-heading">
                        {job.jobTitle}
                      </h3>
                      
                      <div className="job-meta-row">
                        <div className="job-meta-pill">
                          <Building2 className="h-4 w-4" />
                          <span className="font-medium text-slate-300">{job.comName}</span>
                        </div>
                        <div className="job-meta-pill">
                          <Calendar className="h-4 w-4" />
                          <span className="text-slate-400 text-xs">Deadline:</span>
                          <span className="job-deadline-tag">
                            {formatDate(job.deadline)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Security Management Actions */}
                  <div className="job-action-btn-zone">
                    <Button
                      variant="danger"
                      icon={Trash2}
                      loading={deletingId === job._id}
                      onClick={() => handleDelete(job._id)}
                      className="transition-all duration-200"
                    >
                      Delete
                    </Button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageJobsPage;