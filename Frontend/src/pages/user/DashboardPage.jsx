import React from "react";
import {
  FileText,
  BarChart3,
  Briefcase,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import StatsCard from "../../components/dashboard/StatsCard";
import ResumeLimitCard from "../../components/dashboard/ResumeLimitCard";
import RecentAnalysisCard from "../../components/dashboard/RecentAnalysisCard";

const DashboardPage = () => {
  // Replace with API data later
  const userData = {
    resumeLimit: 7,
    totalJobs: 25,
    totalAnalyses: 3,
    latestAnalysis: {
      analysisId: "123",
      score: 82,
      jobTitle: "Frontend Developer",
      company: "Tech Corp",
    },
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Dashboard
          </h1>
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

        <RecentAnalysisCard
          {...userData.latestAnalysis}
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;