import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import AnalysisSummary from "../../components/analysis/AnalysisSummary";
import Loader from "../../components/common/Loader";

const AnalysisPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  // Temporary mock data.
  // Replace with backend endpoint if you add one.
  const analysis = {
    _id: id,
    score: 84,
    missing: ["docker", "aws"],
    recommendations: {
      skill_improvements: [
        "Learn Docker and containerization.",
        "Gain hands-on experience with AWS.",
      ],
      resume_improvements: [
        "Quantify project achievements.",
        "Add stronger action verbs.",
      ],
      project_suggestions: [
        "Build a CI/CD pipeline project.",
        "Deploy a full-stack app on AWS.",
      ],
      learning_roadmap: [
        "Master Docker fundamentals.",
        "Study EC2, S3, and IAM.",
      ],
    },
  };

  useEffect(() => {
    // If you later add /api/report/:id endpoint,
    // fetch actual analysis here.
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <Loader text="Loading analysis..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Analysis Report
          </h1>
          <p className="mt-2 text-slate-600">
            Detailed breakdown of your resume-job match.
          </p>
        </div>

        <AnalysisSummary analysis={analysis} />
      </div>
    </DashboardLayout>
  );
};

export default AnalysisPage;