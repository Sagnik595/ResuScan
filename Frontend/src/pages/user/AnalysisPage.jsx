import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import AnalysisSummary from "../../components/analysis/AnalysisSummary";
import Loader from "../../components/common/Loader";
import api from "../../services/axiosInstance";

const AnalysisPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch actual analysis from backend
        const { data } = await api.get(`/report/${id}`);

        if (data.success) {
          setAnalysis(data.data);
        } else {
          setError(data.message || "Failed to fetch analysis");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load analysis");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAnalysis();
    }
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <Loader text="Loading analysis..." />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="card p-8 text-center">
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!analysis) {
    return (
      <DashboardLayout>
        <div className="card p-8 text-center">
          <p className="text-slate-600">No analysis data available</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analysis Report</h1>
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
