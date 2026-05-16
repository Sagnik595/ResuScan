import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/axiosInstance";

const JobDetailsPage = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`/user/jobs/${id}`);

      if (data.success) {
        setJob(data.data);
      } else {
        toast.error(data.message || "Failed to fetch job details");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch job details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Loading */}
        {loading && (
          <div className="card p-6 text-center">
            <p className="text-slate-600">Loading job details...</p>
          </div>
        )}

        {/* Job Details */}
        {!loading && job && (
          <>
            {/* Header */}
            <div className="card p-8">
              <h1 className="text-3xl font-bold text-slate-900">
                {job.jobTitle}
              </h1>

              <p className="mt-2 text-lg font-medium text-indigo-600">
                {job.comName}
              </p>

              <div className="mt-4 space-y-2 text-slate-600">
                {job.location && (
                  <p>
                    <span className="font-medium">Location:</span>{" "}
                    {job.location}
                  </p>
                )}

                {job.salary && (
                  <p>
                    <span className="font-medium">Salary:</span>{" "}
                    {job.salary}
                  </p>
                )}

                {job.deadline && (
                  <p>
                    <span className="font-medium">Apply Before:</span>{" "}
                    {new Date(job.deadline).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            {/* Required Skills */}
            {job.skills?.length > 0 && (
              <div className="card p-8">
                <h2 className="text-2xl font-semibold text-slate-900">
                  Required Skills
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
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

            {/* Job Description */}
            {job.desc && (
              <div className="card p-8">
                <h2 className="text-2xl font-semibold text-slate-900">
                  Job Description
                </h2>

                <p className="mt-4 whitespace-pre-line text-slate-700 leading-7">
                  {job.desc}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/jobs"
                className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Back to Jobs
              </Link>

              <Link
                to={`/analysis/${job._id}`}
                className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Analyze Resume
              </Link>
            </div>
          </>
        )}

        {/* Not Found */}
        {!loading && !job && (
          <div className="card p-6 text-center">
            <p className="text-slate-600">Job not found.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default JobDetailsPage;