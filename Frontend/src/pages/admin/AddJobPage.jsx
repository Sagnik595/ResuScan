import React, { useState } from "react";
import { toast } from "react-toastify";
import { Briefcase } from "lucide-react";

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
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // 1. Upload the core structural JD parameters
      const { data } = await api.post("/admin/jdupload", formData, config);

      if (!data.success) {
        toast.error(data.message || "Failed to initialize job index.");
        return;
      }

      // 2. Trigger parsing array pipelines using the returned data reference identifier
      await api.post(
        "/admin/jdparse",
        {
          id: data.data,
        },
        config
      );

      toast.success("Job initialized and parsed into structural vector arrays successfully.");

      setFormData({
        cName: "",
        jTitle: "",
        location: "",
        salary: "",
        deadline: "",
        jdData: "",
      });
    } catch (error) {
      console.error("Error deployment execution:", error);
      toast.error(
        error.response?.data?.message || "Pipeline error: Failed to push job description."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      {/* Structural Framing Framework */}
      <div className="min-h-screen bg-gradient-to-br from-[#040308] via-[#090714] to-[#040308] text-slate-100 py-10 px-4 font-sans relative overflow-hidden">
        
        {/* Neon Ambient Background Radials */}
        <div className="absolute top-[-15%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-purple-500/5 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-indigo-500/5 blur-[130px] pointer-events-none" />

        <div className="mx-auto max-w-4xl relative z-10">
          
          {/* Glassmorphic Injection Form Container */}
          <div className="rounded-3xl bg-[#0f0c1e]/60 backdrop-blur-xl border border-purple-500/10 p-8 md:p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]">
            
            {/* Component Sub-Header Terminal */}
            <div className="flex items-start gap-4 border-b border-purple-500/10 pb-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shadow-inner">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white m-0">
                  Deploy New <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Job Tracker</span>
                </h1>
                <p className="mt-1.5 text-sm text-slate-400">
                  Upload job parameters, configure evaluation limits, and extract specific skill weights.
                </p>
              </div>
            </div>

            {/* Core Interaction Form Grid */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Input
                  label="Enterprise / Company Name"
                  name="cName"
                  value={formData.cName}
                  onChange={handleChange}
                  required
                  className="bg-[#0b0816]/80 border-purple-500/15 focus:border-purple-500/40 text-white placeholder-slate-600"
                />

                <Input
                  label="Target Job Title"
                  name="jTitle"
                  value={formData.jTitle}
                  onChange={handleChange}
                  required
                  className="bg-[#0b0816]/80 border-purple-500/15 focus:border-purple-500/40 text-white placeholder-slate-600"
                />

                <Input
                  label="Operational Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="bg-[#0b0816]/80 border-purple-500/15 focus:border-purple-500/40 text-white placeholder-slate-600"
                />

                <Input
                  label="Compensation Package / Salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                  className="bg-[#0b0816]/80 border-purple-500/15 focus:border-purple-500/40 text-white placeholder-slate-600"
                />

                <div className="md:col-span-2">
                  <Input
                    label="Application Window Deadline"
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                    className="bg-[#0b0816]/80 border-purple-500/15 focus:border-purple-500/40 text-white scheme-dark w-full"
                  />
                </div>
              </div>

              <div>
                <Textarea
                  label="Raw Job Description Document Data"
                  name="jdData"
                  value={formData.jdData}
                  onChange={handleChange}
                  rows={10}
                  required
                  className="bg-[#0b0816]/80 border-purple-500/15 focus:border-purple-500/40 text-white placeholder-slate-600 w-full rounded-2xl resize-y"
                  placeholder="Paste complete layout parameters, requirements, and tech stack guidelines here..."
                />
              </div>

              {/* Submission Action Anchor */}
              <div className="pt-4 border-t border-purple-500/10 flex justify-end">
                <Button
                  type="submit"
                  size="lg"
                  loading={loading}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold tracking-wide px-8 py-3 rounded-xl shadow-lg shadow-purple-950/20 active:translate-y-[1px] transition-all duration-150"
                >
                  Compile & Deploy Job Profile
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddJobPage;