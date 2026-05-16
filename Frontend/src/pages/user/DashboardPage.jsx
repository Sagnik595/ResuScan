import React, { useEffect, useState } from "react";
import { FileText, BarChart3, Briefcase } from "lucide-react";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import StatsCard from "../../components/dashboard/StatsCard";
import ResumeLimitCard from "../../components/dashboard/ResumeLimitCard";
import RecentAnalysisCard from "../../components/dashboard/RecentAnalysisCard";
import api from "../../services/axiosInstance";

const DashboardPage = () => {
  const [userData, setUserData] = useState({
    resumeLimit: 0,
    totalJobs: 0,
    totalAnalyses: 0,
    latestAnalysis: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch user data
        const userRes = await api.get("/user/profile");
        if (userRes.data.success) {
          setUserData((prev) => ({
            ...prev,
            resumeLimit: userRes.data.data?.resumeLimit || 0,
          }));
        }

        // Fetch jobs count
        const jobsRes = await api.get("/user/jobs");
        if (jobsRes.data.success) {
          setUserData((prev) => ({
            ...prev,
            totalJobs: jobsRes.data.data?.length || 0,
          }));
        }
      } catch (error) {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-2 text-slate-600">
            Overview of your resume analysis activity.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <ResumeLimitCard remaining={userData.resumeLimit} />

          <StatsCard
            title="Jobs Available"
            value={userData.totalJobs}
            icon={Briefcase}
            color="blue"
          />

          <StatsCard
            title="Analyses Completed"
            value={userData.totalAnalyses}
            icon={BarChart3}
            color="green"
          />
        </div>

        <RecentAnalysisCard {...userData.latestAnalysis} />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
