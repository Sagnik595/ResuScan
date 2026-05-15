import React, { useRef } from "react";
import { UploadCloud, FileText } from "lucide-react";
import Button from "../common/Button";

const ResumeUploadZone = ({
  file,
  onFileSelect,
  loading = false,
}) => {
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files?.[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="card p-8">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={handleChange}
      />

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 p-10 text-center transition hover:border-indigo-500 hover:bg-indigo-50"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
          <UploadCloud className="h-8 w-8" />
        </div>

        <h3 className="text-xl font-semibold text-slate-900">
          Upload Your Resume
        </h3>

        <p className="mt-2 text-slate-500">
          Drag and drop your PDF/DOC/DOCX file here, or click to browse.
        </p>

        <p className="mt-1 text-sm text-slate-400">
          Maximum file size: 5 MB
        </p>

        {file && (
          <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-green-700">
            <FileText className="h-4 w-4" />
            {file.name}
          </div>
        )}

        <div className="mt-6">
          <Button loading={loading}>
            {loading ? "Uploading..." : "Select File"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploadZone;