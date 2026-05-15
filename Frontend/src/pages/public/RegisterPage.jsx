import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import api from "../../services/axiosInstance";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

      const { data } = await api.post("/user/register", formData);

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
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
              Create Account
            </h1>

            <p className="mt-2 text-slate-600">
              Start optimizing your resume today.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

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
                Create Account
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default RegisterPage;