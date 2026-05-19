import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import useAuth from "../../hooks/useAuth";
import api from "../../services/axiosInstance";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

      // Pointing to the unified /api/admin prefix route layout
      const { data } = await api.post("/admin/login", formData);

      if (data.success) {
        login(data.token, "admin");
        toast.success(data.message || "Authentication verification successful.");
        navigate("/admin/dashboard");
      } else {
        toast.error(data.message || "Invalid authentication parameters.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Gateway rejection: Admin verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Full-screen dark base matrix using dual radial glowing points */
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#040308] via-[#090714] to-[#040308] px-4 font-sans relative overflow-hidden">
      
      {/* ── Top Left Floating Back Anchor ── */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0f0c1e]/40 backdrop-blur-md border border-purple-500/10 text-sm font-medium text-slate-300 hover:text-white hover:border-purple-500/30 hover:bg-[#151129]/60 transition-all duration-200 shadow-md group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
        Back to Home
      </button>

      {/* Visual Ambiance Backdrops */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      {/* Glassmorphic Centralized Authorization Portal */}
      <div className="w-full max-w-md rounded-3xl bg-[#0f0c1e]/60 backdrop-blur-xl border border-purple-500/10 p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-purple-500/20 relative z-10">
        
        {/* Terminal Header Elements */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/15 to-indigo-500/5 border border-purple-500/20 text-purple-400 shadow-inner">
            <Shield className="h-7 w-7" />
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white m-0">
            Admin <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Portal</span>
          </h1>

          <p className="mt-2.5 text-sm text-slate-400 max-w-[280px] mx-auto leading-relaxed">
            Provide identity tokens to access terminal controls and tracking indices.
          </p>
        </div>

        {/* Input Interface System */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <Input
              label="Admin Security Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-[#0b0816]/80 border-purple-500/15 focus:border-purple-500/40 text-white placeholder-slate-500"
            />
          </div>

          <div className="space-y-1">
            <Input
              label="Security Key Phrase"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-[#0b0816]/80 border-purple-500/15 focus:border-purple-500/40 text-white placeholder-slate-500"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={loading}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold tracking-wide rounded-xl shadow-lg shadow-purple-950/20 active:translate-y-[1px] transition-all duration-150"
            >
              Verify Credentials
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;