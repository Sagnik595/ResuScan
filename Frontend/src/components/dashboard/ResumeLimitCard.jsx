import React from "react";
import { FileText } from "lucide-react";

const ResumeLimitCard = ({ remaining = 0 }) => {
  const percentage = Math.min((remaining / 10) * 100, 100);

  const getColor = () => {
    if (remaining >= 5) return "bg-green-500";
    if (remaining >= 2) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="card p-6">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
          <FileText className="h-6 w-6" />
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500">
            Remaining Analyses
          </p>

          <h3 className="mt-1 text-3xl font-bold text-slate-900">
            {remaining}
          </h3>
        </div>
      </div>

      <div className="mt-5">
        <div className="h-2 rounded-full bg-slate-200">
          <div
            className={`h-2 rounded-full ${getColor()}`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="mt-2 text-xs text-slate-500">
          Basic plan includes 10 analyses.
        </p>
      </div>
    </div>
  );
};

export default ResumeLimitCard;