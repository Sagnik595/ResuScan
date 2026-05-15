import React, { useState } from "react";
import { toast } from "react-toastify";

import AdminLayout from "../../components/layout/AdminLayout";
import Input from "../../components/common/Input";
import Textarea from "../../components/common/Textarea";
import Button from "../../components/common/Button";
import api from "../../services/axiosInstance";

const AddJobPage = () => {
  const [formData, setFormData] = useState({
    cName: "",
    jTitle: "",
    location: "",
    salary: "",
    deadline: "",
    jdData: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post("/admin/jdupload", formData);

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      // Parse JD after upload
      await api.post("/admin/jdparse", {
        id: data.data,
      });

      toast.success("Job added successfully");

      setFormData({
        cName: "",
        jTitle: "",
        location: "",
        salary: "",
        deadline: "",
        jdData: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add job"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mx-auto max-w-4xl">
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Add New Job
          </h1>

          <p className="mt-2 text-slate-600">
            Upload a job description and extract required skills.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Company Name"
                name="cName"
                value={formData.cName}
                onChange={handleChange}
                required
              />

              <Input
                label="Job Title"
                name="jTitle"
                value={formData.jTitle}
                onChange={handleChange}
                required
              />

              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />

              <Input
                label="Salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />

              <Input
                label="Application Deadline"
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                className="md:col-span-2"
              />
            </div>

            <Textarea
              label="Job Description"
              name="jdData"
              value={formData.jdData}
              onChange={handleChange}
              rows={12}
              required
            />

            <Button
              type="submit"
              size="lg"
              loading={loading}
            >
              Add Job
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddJobPage;