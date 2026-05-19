import React, { useState, useEffect } from "react";
import { Briefcase, Users, BarChart3, PlusCircle, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import AdminLayout from "../../components/layout/AdminLayout";
import StatsCard from "../../components/dashboard/StatsCard";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import api from "../../services/axiosInstance";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalUsers: 0,
    totalAnalyses: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Concurrent fetch optimization using unified backend API paths
      const [usersResponse, jobsResponse] = await Promise.all([
        api.get("/admin/getusers", config),
        api.get("/admin/allJD", config),
      ]);

      const totalUsers = usersResponse.data?.data?.length || 0;
      const totalJobs = jobsResponse.data?.data?.length || 0;

      setStats({
        totalJobs,
        totalUsers,
        totalAnalyses: 0, // Placeholder mapping for platform analytics vector
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      toast.error("Failed to compile dashboard runtime statistics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-[#040308] via-[#090714] to-[#040308] flex items-center justify-center py-24">
          <Loader text="Compiling structural platform parameters..." />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Dashboard Outer Frame Context */}
      <div className="min-h-screen bg-gradient-to-br from-[#040308] via-[#090714] to-[#040308] text-slate-100 py-10 px-6 font-sans relative overflow-hidden">
        
        {/* Glow Anchors */}
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-500/5 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-500/5 blur-[140px] pointer-events-none" />

        <div className="max-w-[1100px] mx-auto flex flex-col gap-10 relative z-10">
          
          {/* ── Dashboard Header Module ── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2 border-b border-purple-500/10">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white m-0">
                System <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Control Room</span>
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Live monitoring interfaces for tracking cards, user indexes, and engine workflows.
              </p>
            </div>

            <Link to="/admin/add-job" className="shrink-0">
              <Button 
                icon={PlusCircle}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-950/20"
              >
                Add New Job
              </Button>
            </Link>
          </div>

          {/* ── Key Indicators Stat Grid ── */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* If your StatsCard components do not inherently handle dark mode/custom theme styling,
                you can wrap them or replace them with a card template matching your layout wrapper */}
            <div className="bg-[#0f0c1e]/60 backdrop-blur-md border border-purple-500/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-purple-500/20">
              <StatsCard
                title="Total Jobs Indexed"
                value={stats.totalJobs}
                icon={Briefcase}
                color="purple"
              />
            </div>

            <div className="bg-[#0f0c1e]/60 backdrop-blur-md border border-purple-500/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-purple-500/20">
              <StatsCard
                title="Registered Profiles"
                value={stats.totalUsers}
                icon={Users}
                color="indigo"
              />
            </div>

            <div className="bg-[#0f0c1e]/60 backdrop-blur-md border border-purple-500/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-purple-500/20">
              <StatsCard
                title="AI Vector Analyses"
                value={stats.totalAnalyses}
                icon={BarChart3}
                color="cyan"
              />
            </div>
          </div>

          {/* ── Quick Utility Gateway Deck ── */}
          <div className="bg-[#0f0c1e]/40 backdrop-blur-md border border-purple-500/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
              <ArrowUpRight className="w-32 h-32 text-purple-400" />
            </div>

            <h2 className="text-xl font-bold text-white m-0 tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              Terminal Navigation Gateways
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Direct hotkeys to execute actions across core platform state entities.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Link to="/admin/add-job" className="w-full">
                <Button 
                  fullWidth
                  className="bg-[#141026] hover:bg-[#1a1533] text-purple-300 border border-purple-500/15 font-medium rounded-xl transition-all duration-200"
                >
                  Deploy Tracking Profile
                </Button>
              </Link>

              <Link to="/admin/jobs" className="w-full">
                <Button 
                  fullWidth 
                  variant="secondary"
                  className="bg-[#0b0816]/80 hover:bg-[#110d22] text-slate-300 border border-slate-700/40 font-medium rounded-xl transition-all duration-200"
                >
                  Manage Live Index
                </Button>
              </Link>

              <Link to="/admin/users" className="w-full">
                <Button 
                  fullWidth 
                  variant="secondary"
                  className="bg-[#0b0816]/80 hover:bg-[#110d22] text-slate-300 border border-slate-700/40 font-medium rounded-xl transition-all duration-200"
                >
                  Audit User Directory
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;