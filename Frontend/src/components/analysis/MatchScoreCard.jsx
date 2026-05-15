import React from "react";
import ScoreCircle from "../common/ScoreCircle";

const MatchScoreCard = ({ score = 0 }) => {
  const getStatus = () => {
    if (score >= 80) {
      return {
        label: "Excellent Match",
        color: "text-green-600",
        bg: "bg-green-50",
      };
    }

    if (score >= 60) {
      return {
        label: "Good Match",
        color: "text-amber-600",
        bg: "bg-amber-50",
      };
    }

    return {
      label: "Needs Improvement",
      color: "text-red-600",
      bg: "bg-red-50",
    };
  };

  const status = getStatus();

  return (
    <div className="card p-8">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div className="flex justify-center">
          <ScoreCircle score={score} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Resume Match Score
          </h2>

          <p className="mt-3 text-slate-600 leading-relaxed">
            This score reflects how well your resume aligns with
            the required skills listed in the job description.
          </p>

          <div
            className={`mt-5 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${status.bg} ${status.color}`}
          >
            {status.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchScoreCard;