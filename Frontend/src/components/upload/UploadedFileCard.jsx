import React from "react";
import { FileText, CheckCircle } from "lucide-react";

const UploadedFileCard = ({
  fileName,
  fileSize,
  uploaded = true,
}) => {
  const formatSize = (bytes) => {
    if (!bytes) return "";
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  return (
    <div className="card p-5">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
          <FileText className="h-6 w-6" />
        </div>

        <div className="flex-1">
          <h4 className="font-semibold text-slate-900">{fileName}</h4>
          {fileSize && (
            <p className="text-sm text-slate-500">
              {formatSize(fileSize)}
            </p>
          )}
        </div>

        {uploaded && (
          <CheckCircle className="h-6 w-6 text-green-500" />
        )}
      </div>
    </div>
  );
};

export default UploadedFileCard;