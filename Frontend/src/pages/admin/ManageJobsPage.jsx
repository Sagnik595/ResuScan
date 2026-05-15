import React, { useEffect, useState } from "react";
import { Trash2, Briefcase } from "lucide-react";
import { toast } from "react-toastify";

import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import Button from "../../components/common/Button";
import api from "../../services/axiosInstance";
import { formatDate } from "../../utils/formatDate";

const ManageJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/admin/allJD");

      if (data.success) {
        setJobs(data.data || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load jobs"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const { data } = await api.delete("/admin/deleteJD", {
        data: { id },
      });

      if (data.success) {
        toast.success(data.message);
        setJobs((prev) =>
          prev.filter((job) => job._id !== id)
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Delete failed"
      );
    } finally {
      setDeletingId("");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Manage Jobs
          </h1>
          <p className="mt-2 text-slate-600">
            View and delete job postings.
          </p>
        </div>

        {loading ? (
          <Loader text="Loading jobs..." />
        ) : jobs.length === 0 ? (
          <EmptyState
            title="No jobs available"
            description="Add your first job posting."
          />
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="card p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                    <Briefcase className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {job.jobTitle}
                    </h3>
                    <p className="text-slate-600">
                      {job.comName}
                    </p>
                    <p className="text-sm text-slate-500">
                      Deadline: {formatDate(job.deadline)}
                    </p>
                  </div>
                </div>

                <Button
                  variant="danger"
                  icon={Trash2}
                  loading={deletingId === job._id}
                  onClick={() =>
                    handleDelete(job._id)
                  }
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageJobsPage;