import React from "react";
import { Link } from "react-router-dom";
import {
  Upload,
  Brain,
  BarChart3,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Button from "../../components/common/Button";

const LandingPage = () => {
  const features = [
    {
      icon: Upload,
      title: "Upload Resume",
      description:
        "Upload your resume in PDF, DOC, or DOCX format.",
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description:
        "Compare your skills against real job descriptions.",
    },
    {
      icon: BarChart3,
      title: "Match Score",
      description:
        "Get a detailed compatibility score and missing skills.",
    },
  ];

  const benefits = [
    "Identify missing technical skills",
    "Receive AI-powered recommendations",
    "Improve your resume strategically",
    "Prepare targeted project ideas",
  ];

  return (
    <>
      <Navbar />

      <section className="bg-linear-to-br from-slate-50 to-indigo-50">
        <div className="container-custom py-24">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-600">
                AI-Powered Resume Analysis
              </div>

              <h1 className="mt-6 text-5xl font-bold leading-tight text-slate-900">
                Optimize Your Resume for Your Dream Job
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Upload your resume, compare it with job descriptions,
                and receive actionable recommendations to improve
                your chances of getting hired.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/register">
                  <Button size="lg">
                    Get Started
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>

                <Link to="/login">
                  <Button variant="secondary" size="lg">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>

            <div className="card p-8">
              <h3 className="text-2xl font-bold text-slate-900">
                Why ResuScan?
              </h3>

              <div className="mt-6 space-y-4">
                {benefits.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-white py-20">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-900">
              Powerful Features
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Everything you need to tailor your resume.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div key={index} className="card p-8 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LandingPage;