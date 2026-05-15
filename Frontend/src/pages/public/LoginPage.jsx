import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import useAuth from "../../hooks/useAuth";
import api from "../../services/axiosInstance";

const LoginPage = () => {
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

      const { data } = await api.post("/user/login", formData);

      if (data.success) {
        login(data.token, "user");
        toast.success(data.message);
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="flex min-h-[calc(100vh-128px)] items-center bg-slate-50 py-12">
        <div className="container-custom">
          <div className="mx-auto max-w-md card p-8">
            <h1 className="text-3xl font-bold text-slate-900">
              Welcome Back
            </h1>

            <p className="mt-2 text-slate-600">
              Sign in to your ResuScan account.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <Input
                label="Email"
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
                Login
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LoginPage;