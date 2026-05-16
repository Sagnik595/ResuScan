import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/axiosInstance";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all jobs from backend
  const fetchJobs = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/user/jobs");

      if (data.success) {
        setJobs(data.data || []);
      } else {
        toast.error(data.message || "Failed to fetch jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Available Jobs</h1>
          <p className="mt-2 text-slate-600">
            Browse all available job opportunities and compare your resume.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="card p-6 text-center">
            <p className="text-slate-600">Loading jobs...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && jobs.length === 0 && (
          <div className="card p-6 text-center">
            <p className="text-slate-600">No jobs available.</p>
          </div>
        )}

        {/* Jobs Grid */}
        {!loading && jobs.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="card p-6 border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition-all"
              >
                {/* Job Title */}
                <h2 className="text-xl font-semibold text-slate-900">
                  {job.jobTitle}
                </h2>

                {/* Company */}
                <p className="mt-1 text-sm font-medium text-indigo-600">
                  {job.comName}
                </p>

                {/* Location */}
                {job.location && (
                  <p className="mt-3 text-sm text-slate-500">
                    📍 {job.location}
                  </p>
                )}

                {/* Salary */}
                {job.salary && (
                  <p className="mt-1 text-sm text-slate-500">💰 {job.salary}</p>
                )}

                {/* Deadline */}
                {job.deadline && (
                  <p className="mt-1 text-sm text-slate-500">
                    ⏳ Apply before:{" "}
                    {new Date(job.deadline).toLocaleDateString()}
                  </p>
                )}

                {/* Skills */}
                {job.skills?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.slice(0, 5).map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-600"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 5 && (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                        +{job.skills.length - 5} more
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <Link
                    to={`/jobs/${job._id}`}
                    className="flex-1 rounded-lg border border-indigo-600 px-4 py-2 text-center text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                  >
                    View Details
                  </Link>

                  <Link
                    to={`/analysis?jobId=${job._id}`}
                    className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    Analyze
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default JobsPage;
