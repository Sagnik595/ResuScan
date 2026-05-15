import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
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

      const { data } = await api.post("/admin/login", formData);

      if (data.success) {
        login(data.token, "admin");
        toast.success(data.message);
        navigate("/admin/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Admin login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
            <Shield className="h-8 w-8" />
          </div>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            Admin Login
          </h1>

          <p className="mt-2 text-slate-600">
            Sign in to access the admin panel.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Admin Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={loading}
          >
            Login as Admin
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;