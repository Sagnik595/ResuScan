import React, { useState, useEffect } from "react";
import { User, Mail, Shield, CreditCard, Sparkles } from "lucide-react";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/common/Button";
import api from "../../services/axiosInstance";

/* ─── Inject Profile CSS Theme ────────────────────────────────────────────── */
const STYLES = `
  .pro-page {
    min-height: 100vh;
    background:
      radial-gradient(circle at top right, rgba(139, 92, 246, 0.08), transparent 40%),
      radial-gradient(circle at bottom left, rgba(99, 102, 241, 0.06), transparent 35%),
      #05070f;
    color: #f8fafc;
    position: relative;
    padding: 2rem 1rem;
  }

  .pro-content {
    position: relative;
    z-index: 1;
    max-width: 850px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .pro-card {
    background: #0c0f1e;
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 20px;
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }

  .pro-gradient-card {
    background: linear-gradient(135deg, #111528 0%, #0c0f1e 100%);
    border: 1px solid rgba(99, 102, 241, 0.2);
    box-shadow: 0 20px 50px rgba(99, 102, 241, 0.05);
  }

  .pro-cta-card {
    background: linear-gradient(135deg, #1e1b4b 0%, #311042 100%);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 20px;
    padding: 2.5rem;
    position: relative;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  }

  .pro-cta-glow {
    position: absolute;
    top: -50%;
    right: -20%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%);
    pointer-events: none;
  }

  /* Skeleton Loading State Animation */
  .pro-skeleton {
    background: linear-gradient(90deg, #111528 25%, #1c2342 50%, #111528 75%);
    background-size: 200% 100%;
    animation: pro-shimmer 1.5s infinite linear;
    border-radius: 8px;
  }

  @keyframes pro-shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

let styleInjected = false;
function injectStyles() {
  if (styleInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.textContent = STYLES;
  document.head.appendChild(el);
  styleInjected = true;
}

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    injectStyles();

    const fetchProfile = async () => {
      try {
        setLoading(true);

        // 1. Extract the token from your local storage key
        const token = localStorage.getItem("token"); // adjust key name if you use "authToken", etc.
        
        // 2. Pass the full endpoint path and attach the authorization configuration block
        const response = await api.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        console.log(response.data.success);
        

        if (response.data.success) {
          setUserData(response.data.data);
        } else {
          toast.error(
            response.data.message || "Failed to retrieve profile data.",
          );
        }
      } catch (error) {
        console.error("Profile Fetch Error:", error);
        toast.error(
          error.response?.data?.message ||
            "An error occurred while connecting to the server.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /* ─── Render Shimmer Skeleton While Fetching ────────────────────────────── */
  if (loading) {
    return (
      <DashboardLayout>
        <div className="pro-page">
          <div className="pro-content">
            <div className="space-y-3">
              <div className="pro-skeleton h-9 w-48" />
              <div className="pro-skeleton h-5 w-96" />
            </div>
            <div className="pro-card flex items-center gap-6">
              <div className="pro-skeleton h-24 w-24 rounded-full" />
              <div className="flex-1 space-y-3">
                <div className="pro-skeleton h-7 w-1/3" />
                <div className="pro-skeleton h-4 w-1/4" />
                <div className="flex gap-2 pt-2">
                  <div className="pro-skeleton h-6 w-16 rounded-full" />
                  <div className="pro-skeleton h-6 w-20 rounded-full" />
                </div>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="pro-card space-y-3">
                  <div className="pro-skeleton h-5 w-1/2" />
                  <div className="pro-skeleton h-6 w-3/4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Fallback state if server returns empty payload gracefully
  const profile = userData || {
    name: "User",
    email: "Not provided",
    role: "Guest",
    subscription: "Free tier",
    resumeLimit: 0,
  };

  return (
    <DashboardLayout>
      <div className="pro-page">
        <div className="pro-content">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              My Profile
            </h1>
            <p className="mt-2 text-slate-400">
              Manage your account credentials, view usage quotas, and configure
              subscription layouts.
            </p>
          </div>

          {/* Profile Badge Hero Card */}
          <div className="pro-card pro-gradient-card">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                <User className="h-12 w-12" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {profile.name}
                </h2>
                <p className="mt-1 text-slate-400 font-normal">
                  {profile.email}
                </p>

                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                    {profile.role}
                  </span>

                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    {profile.subscription}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Analytics Metrics Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="pro-card">
              <div className="flex items-center gap-3 text-slate-400">
                <Mail className="h-5 w-5 text-indigo-400" />
                <span className="text-sm font-medium tracking-wide">
                  Email Address
                </span>
              </div>
              <p className="mt-3 text-white font-semibold text-lg">
                {profile.email}
              </p>
            </div>

            <div className="pro-card">
              <div className="flex items-center gap-3 text-slate-400">
                <Shield className="h-5 w-5 text-indigo-400" />
                <span className="text-sm font-medium tracking-wide">
                  Account Authorization
                </span>
              </div>
              <p className="mt-3 text-white font-semibold text-lg">
                {profile.role}
              </p>
            </div>

            <div className="pro-card">
              <div className="flex items-center gap-3 text-slate-400">
                <CreditCard className="h-5 w-5 text-indigo-400" />
                <span className="text-sm font-medium tracking-wide">
                  Plan Category
                </span>
              </div>
              <p className="mt-3 text-white font-semibold text-lg">
                {profile.subscription}
              </p>
            </div>

            <div className="pro-card">
              <div className="flex items-center gap-3 text-slate-400">
                <CreditCard className="h-5 w-5 text-indigo-400" />
                <span className="text-sm font-medium tracking-wide">
                  Remaining Parsing Balance
                </span>
              </div>
              <p className="mt-3 text-emerald-400 font-bold text-2xl tracking-tight">
                {profile.resumeLimit}
              </p>
            </div>
          </div>

          {/* Upgrade Ecosystem CTA Banner */}
          <div className="pro-cta-card">
            <div className="pro-cta-glow" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-width: 550px">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-purple-400 animate-pulse" />
                  Upgrade Your Allocation Plan
                </h3>
                <p className="mt-2 text-indigo-200/80 text-sm leading-relaxed">
                  Unlock deep metaheuristic tracking engines, comprehensive
                  automated feedback loops, and unlimited AI-driven resume
                  architectural breakdowns.
                </p>
              </div>

              <div className="shrink-0">
                <Button
                  variant="secondary"
                  className="shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Upgrade Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
