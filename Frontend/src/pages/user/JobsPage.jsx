import React, { useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import ResumeUploadZone from "../../components/upload/ResumeUploadZone";
import UploadedFileCard from "../../components/upload/UploadedFileCard";
import ParsingProgress from "../../components/upload/ParsingProgress";
import api from "../../services/axiosInstance";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [parsingStatus, setParsingStatus] = useState("");
  const [skills, setSkills] = useState([]);

  const handleFileSelect = async (selectedFile) => {
    setFile(selectedFile);

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("pdf", selectedFile);

      const uploadRes = await api.post(
        "/user/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!uploadRes.data.success) {
        toast.error(uploadRes.data.message);
        return;
      }

      setParsingStatus("processing");

      const parseRes = await api.post("/user/parse", {
        resumeId: uploadRes.data.resumeId,
      });

      if (parseRes.data.success) {
        setSkills(parseRes.data.skills || []);
        setParsingStatus("completed");
        toast.success("Resume parsed successfully");
      } else {
        toast.error(parseRes.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Upload Resume
          </h1>
          <p className="mt-2 text-slate-600">
            Upload your resume to extract skills.
          </p>
        </div>

        <ResumeUploadZone
          file={file}
          onFileSelect={handleFileSelect}
          loading={uploading}
        />

        {file && (
          <UploadedFileCard
            fileName={file.name}
            fileSize={file.size}
          />
        )}

        {parsingStatus && (
          <ParsingProgress status={parsingStatus} />
        )}

        {skills.length > 0 && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Extracted Skills
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UploadPage;