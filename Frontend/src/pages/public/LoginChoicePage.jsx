import React from "react";
import { Link } from "react-router-dom";
import { Users, Shield, ArrowRight } from "lucide-react";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Button from "../../components/common/Button";

const LoginChoicePage = () => {
  return (
    <>
      <Navbar />

      <section className="flex min-h-[calc(100vh-128px)] items-center bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-50 py-12">
        <div className="container-custom w-full">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-slate-900">
              Welcome to ResuScan
            </h1>
            <p className="mt-3 text-lg text-slate-600">
              Choose how you'd like to access your account
            </p>
          </div>

          <div className="mx-auto grid gap-8 max-w-4xl md:grid-cols-2">
            {/* User Login Card */}
            <Link to="/login" className="group">
              <div className="card h-full p-8 transition-all duration-300 hover:shadow-lg hover:scale-105">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-200">
                  <Users className="h-8 w-8" />
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Job Seeker
                </h2>

                <p className="mt-2 text-slate-600">
                  Sign in to your ResuScan account to upload your resume,
                  compare it with job descriptions, and get AI-powered
                  recommendations.
                </p>

                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    Upload and parse your resume
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    View job opportunities
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    Get detailed analysis reports
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    Receive AI recommendations
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-2 font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                  Sign In <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>

            {/* Admin Login Card */}
            <Link to="/admin/login" className="group">
              <div className="card h-full p-8 transition-all duration-300 hover:shadow-lg hover:scale-105">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 transition-colors group-hover:bg-purple-200">
                  <Shield className="h-8 w-8" />
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Admin Panel
                </h2>

                <p className="mt-2 text-slate-600">
                  Sign in as an administrator to manage job postings, view
                  applicant statistics, and oversee the platform.
                </p>

                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-purple-500" />
                    Post and manage job listings
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-purple-500" />
                    View all registered users
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-purple-500" />
                    Monitor platform analytics
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-purple-500" />
                    Control system settings
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-2 font-semibold text-purple-600 group-hover:translate-x-1 transition-transform">
                  Admin Login <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LoginChoicePage;
