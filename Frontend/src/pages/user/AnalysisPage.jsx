import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Upload, FileText } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import AnalysisSummary from "../../components/analysis/AnalysisSummary";
import Loader from "../../components/common/Loader";
import api from "../../services/axiosInstance";

const AnalysisPage = () => {
  const { id: jobId } = useParams();
  const [step, setStep] = useState("upload"); // "upload" or "results"
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [uploadProgress, setUploadProgress] = useState("");

  // Handle resume file selection
  const handleFileSelect = async (selectedFile) => {
    setFile(selectedFile);

    try {
      setLoading(true);
      setError(null);
      setUploadProgress("Uploading resume...");

      const formData = new FormData();
      formData.append("pdf", selectedFile);

      const uploadRes = await api.post("/user/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!uploadRes.data.success) {
        toast.error(uploadRes.data.message);
        setError(uploadRes.data.message);
        return;
      }

      setResumeId(uploadRes.data.resumeId);
      setUploadProgress("Parsing resume...");

      const parseRes = await api.post("/user/parse", {
        resumeId: uploadRes.data.resumeId,
      });

      if (parseRes.data.success) {
        setUploadProgress("Resume ready. Analyzing...");
        // Now proceed to analyze
        await performAnalysis(uploadRes.data.resumeId);
      } else {
        toast.error(parseRes.data.message);
        setError(parseRes.data.message);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Upload failed";
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
      setUploadProgress("");
    }
  };

  // Perform analysis
  const performAnalysis = async (rid) => {
    try {
      setAnalyzing(true);
      setError(null);

      const analyzeRes = await api.post("/report/analyze", {
        jid: jobId,
        rid: rid || resumeId,
      });

      if (analyzeRes.data.success) {
        setAnalysis(analyzeRes.data);
        setStep("results");
        toast.success("Analysis completed!");
      } else {
        toast.error(analyzeRes.data.message);
        setError(analyzeRes.data.message);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Analysis failed";
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setAnalyzing(false);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // Upload step
  if (step === "upload") {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Analyze Your Resume
            </h1>
            <p className="mt-2 text-slate-600">
              Upload your resume to see how well it matches this job.
            </p>
          </div>

          {error && (
            <div className="card p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div
            className="card p-8 border-2 border-dashed border-indigo-300 rounded-2xl text-center cursor-pointer hover:border-indigo-500 transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <input
              id="fileInput"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                e.target.files && handleFileSelect(e.target.files[0])
              }
              className="hidden"
            />

            <Upload className="mx-auto h-12 w-12 text-indigo-600 mb-4" />

            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Upload Your Resume
            </h3>

            <p className="text-slate-600 mb-4">
              Drag and drop your resume file here, or click to select
            </p>

            <p className="text-xs text-slate-500">
              Accepted formats: PDF, DOC, DOCX (Max 5MB)
            </p>

            {loading && (
              <div className="mt-4">
                <div className="animate-spin inline-block h-5 w-5 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
                <p className="text-indigo-600 text-sm mt-2">{uploadProgress}</p>
              </div>
            )}

            {file && !loading && (
              <div className="mt-4">
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <FileText className="h-5 w-5" />
                  <span className="text-sm font-medium">{file.name}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Results step
  if (analyzing) {
    return (
      <DashboardLayout>
        <Loader text="Analyzing your resume against the job..." />
      </DashboardLayout>
    );
  }

  if (error && step === "results") {
    return (
      <DashboardLayout>
        <div className="card p-8 text-center">
          <p className="text-red-600 font-semibold">{error}</p>
          <button
            onClick={() => {
              setStep("upload");
              setError(null);
              setAnalysis(null);
            }}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Try Another Resume
          </button>
        </div>
      </DashboardLayout>
    );
  }

  if (!analysis && step === "results") {
    return (
      <DashboardLayout>
        <div className="card p-8 text-center">
          <p className="text-slate-600">No analysis data available</p>
          <button
            onClick={() => {
              setStep("upload");
              setAnalysis(null);
            }}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Upload Resume
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Analysis Report
            </h1>
            <p className="mt-2 text-slate-600">
              Detailed breakdown of your resume-job match.
            </p>
          </div>

          <button
            onClick={() => {
              setStep("upload");
              setAnalysis(null);
            }}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Analyze Another
          </button>
        </div>

        {analysis && <AnalysisSummary analysis={analysis} />}
      </div>
    </DashboardLayout>
  );
};

export default AnalysisPage;
