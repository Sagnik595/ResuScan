import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ShieldAlert, Users, Layers, Activity, UserCheck } from "lucide-react";

import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import api from "../../services/axiosInstance";

/* ─── Inject Admin Panel Custom Deep Purple Grid Styles ───────────────────── */
const STYLES = `
  .adm-page {
    min-height: 100vh;
    background: 
      radial-gradient(circle at 10% 10%, rgba(168, 85, 247, 0.12), transparent 45%),
      radial-gradient(circle at 90% 80%, rgba(99, 102, 241, 0.08), transparent 50%),
      #030207;
    color: #f3f4f6;
    padding: 2.5rem 1.5rem;
    font-family: 'Outfit', sans-serif;
  }

  .adm-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  /* ─── Header Elements ─── */
  .adm-title {
    font-size: 2.25rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #ffffff;
    margin: 0;
  }

  .adm-title-gradient {
    background: linear-gradient(135deg, #d8b4fe 0%, #a855f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* ─── Metric Widget Overviews ─── */
  .adm-metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
  }

  .adm-metric-card {
    background: #0b0914;
    border: 1px solid rgba(168, 85, 247, 0.15);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
    border-radius: 16px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1.25rem;
    position: relative;
    overflow: hidden;
  }

  .adm-metric-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 4px; height: 100%;
    background: linear-gradient(to bottom, #a855f7, #6366f1);
  }

  .adm-metric-icon-box {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba(168, 85, 247, 0.1);
    border: 1px solid rgba(168, 85, 247, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #c084fc;
  }

  .adm-metric-val {
    font-size: 1.75rem;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.2;
  }

  /* ─── Cyberpunk Dark Table Structure ─── */
  .adm-table-container {
    background: #09070f;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
    overflow: hidden;
  }

  .adm-table-header {
    background: #110d1f;
    border-bottom: 1px solid rgba(168, 85, 247, 0.2);
  }

  .adm-th {
    padding: 1.25rem 1.5rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #a855f7;
    text-align: left;
  }

  .adm-tr {
    background: transparent;
    transition: background 0.2s ease;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  }

  .adm-tr:hover {
    background: rgba(168, 85, 247, 0.03);
  }

  .adm-td {
    padding: 1.25rem 1.5rem;
    font-size: 0.95rem;
    color: #e5e7eb;
    vertical-align: middle;
  }

  /* Status Badges */
  .adm-badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .adm-badge-premium {
    background: rgba(168, 85, 247, 0.15);
    border: 1px solid rgba(168, 85, 247, 0.3);
    color: #e9d5ff;
    box-shadow: 0 0 12px rgba(168, 85, 247, 0.2);
  }

  .adm-badge-basic {
    background: rgba(148, 163, 184, 0.1);
    border: 1px solid rgba(148, 163, 184, 0.2);
    color: #cbd5e1;
  }

  .adm-limit-pill {
    background: #141126;
    border: 1px solid rgba(255, 255, 255, 0.06);
    padding: 4px 10px;
    border-radius: 8px;
    font-family: monospace;
    color: #a7f3d0;
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

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    injectStyles();
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      // Access protected authentication configurations
      const token = localStorage.getItem("token");

      const { data } = await api.get("/admin/getusers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUsers(data.data || []);
      } else {
        toast.error(data.message || "Failed to load directory.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Internal database connection failure"
      );
    } finally {
      setLoading(false);
    }
  };

  // Derived metrics logic for the panel header rows
  const premiumCount = users.filter(u => u.subscription?.toLowerCase() === "premium").length;

  return (
    <AdminLayout>
      <div className="adm-page">
        <div className="adm-content">
          
          {/* ── System Page Header ── */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="adm-title">
                System <span className="adm-title-gradient">User Core</span>
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Administrative surveillance, consumption adjustments, and global credentials tracking.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-[#120e24] border border-purple-500/20 px-4 py-2 rounded-xl text-xs font-semibold text-purple-300">
              <Activity className="h-4 w-4 text-purple-400 animate-pulse" />
              Live Console Instance
            </div>
          </div>

          {/* ── Admin Dashboard Quick Stats ── */}
          {!loading && users.length > 0 && (
            <div className="adm-metrics-grid">
              <div className="adm-metric-card">
                <div className="adm-metric-icon-box">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Total Registered</div>
                  <div className="adm-metric-val">{users.length}</div>
                </div>
              </div>

              <div className="adm-metric-card">
                <div className="adm-metric-icon-box" style={{ background: "rgba(168,85,247,0.15)" }}>
                  <UserCheck className="h-5 w-5 style={{ color: '#d8b4fe' }}" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Premium Accounts</div>
                  <div className="adm-metric-val text-purple-300">{premiumCount}</div>
                </div>
              </div>

              <div className="adm-metric-card">
                <div className="adm-metric-icon-box">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">System Core Status</div>
                  <div className="text-sm font-bold text-emerald-400 tracking-wide uppercase flex items-center gap-1.5 mt-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block shadow-[0_0_8px_#34d399]" />
                    Operational
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Main Workspace Interface ── */}
          {loading ? (
            <div className="py-20 flex justify-center">
              <Loader text="Decrypting master registry matrices..." />
            </div>
          ) : users.length === 0 ? (
            <EmptyState
              title="No users found"
              description="The database records returned clean. No registrations matched the query parameters."
            />
          ) : (
            <div className="adm-table-container">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead className="adm-table-header">
                    <tr>
                      <th className="adm-th">Identity Token</th>
                      <th className="adm-th">Communication Path</th>
                      <th className="adm-th">Clearance Status</th>
                      <th className="adm-th text-right">Remaining Quota</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user, index) => {
                      const isPremium = user.subscription?.toLowerCase() === "premium";
                      return (
                        <tr key={index} className="adm-tr">
                          <td className="adm-td font-semibold text-white">
                            {user.name}
                          </td>
                          <td className="adm-td text-slate-400 font-mono text-sm">
                            {user.email}
                          </td>
                          <td className="adm-td">
                            <span className={`adm-badge ${isPremium ? 'adm-badge-premium' : 'adm-badge-basic'}`}>
                              {user.subscription || "Basic"}
                            </span>
                          </td>
                          <td className="adm-td text-right">
                            <span className="adm-limit-pill">
                              {user.resumeLimit ?? 0}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </AdminLayout>
  );
};

export default UsersPage;