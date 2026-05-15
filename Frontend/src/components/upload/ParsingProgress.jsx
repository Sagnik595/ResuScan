import React from "react";
import { Loader2, CheckCircle } from "lucide-react";

const ParsingProgress = ({
  status = "processing", // processing | completed
}) => {
  const isCompleted = status === "completed";

  return (
    <div className="card p-6">
      <div className="flex items-center gap-4">
        {isCompleted ? (
          <CheckCircle className="h-8 w-8 text-green-500" />
        ) : (
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        )}

        <div>
          <h4 className="font-semibold text-slate-900">
            {isCompleted
              ? "Resume Parsed Successfully"
              : "Parsing Resume"}
          </h4>
          <p className="text-sm text-slate-500">
            {isCompleted
              ? "Skills were extracted from your resume."
              : "Extracting text and identifying skills..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParsingProgress;