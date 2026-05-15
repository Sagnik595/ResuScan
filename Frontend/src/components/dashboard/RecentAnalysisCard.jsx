import React from "react";
import { ArrowRight, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const RecentAnalysisCard = ({
  analysisId,
  score,
  jobTitle,
  company,
}) => {
  if (!analysisId) return null;

  const getScoreColor = () => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="card p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
          <BarChart3 className="h-6 w-6" />
        </div>

        <div className="flex-1">
          <p className="text-sm text-slate-500">Latest Analysis</p>

          <h3 className="mt-1 font-semibold text-slate-900">
            {jobTitle}
          </h3>

          <p className="text-sm text-slate-500">{company}</p>

          <p className={`mt-2 font-bold ${getScoreColor()}`}>
            {Math.round(score)}% Match
          </p>

          <Link
            to={`/analysis/${analysisId}`}
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            View Report
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentAnalysisCard;