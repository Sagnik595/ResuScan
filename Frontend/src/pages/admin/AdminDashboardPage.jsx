import React, { useState, useEffect } from "react";
import { Briefcase, Users, BarChart3, PlusCircle } from "lucide-react";
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

      // Fetch users
      const usersResponse = await api.get("/admin/getusers");
      const totalUsers = usersResponse.data?.data?.length || 0;

      // Fetch all jobs
      const jobsResponse = await api.get("/admin/allJD");
      const totalJobs = jobsResponse.data?.data?.length || 0;

      setStats({
        totalJobs,
        totalUsers,
        totalAnalyses: 0, // This would need a separate API endpoint if needed
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      toast.error("Failed to load dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex h-64 items-center justify-center">
          <Loader />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-slate-600">
              Manage jobs, users, and platform activity.
            </p>
          </div>

          <Link to="/admin/add-job">
            <Button icon={PlusCircle}>Add New Job</Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <StatsCard
            title="Total Jobs"
            value={stats.totalJobs}
            icon={Briefcase}
            color="blue"
          />

          <StatsCard
            title="Registered Users"
            value={stats.totalUsers}
            icon={Users}
            color="green"
          />

          <StatsCard
            title="Total Analyses"
            value={stats.totalAnalyses}
            icon={BarChart3}
            color="indigo"
          />
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Quick Actions
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link to="/admin/add-job">
              <Button fullWidth>Add Job</Button>
            </Link>

            <Link to="/admin/jobs">
              <Button fullWidth variant="secondary">
                Manage Jobs
              </Button>
            </Link>

            <Link to="/admin/users">
              <Button fullWidth variant="secondary">
                View Users
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
