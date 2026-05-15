import React from "react";
import { User, Mail, Shield, CreditCard } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/common/Button";

const ProfilePage = () => {
  // Replace with actual API data later
  const userData = {
    name: "Sagnik",
    email: "sagnik@example.com",
    role: "User",
    subscription: "Basic",
    resumeLimit: 7,
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            My Profile
          </h1>
          <p className="mt-2 text-slate-600">
            Manage your account information and subscription details.
          </p>
        </div>

        {/* Profile Card */}
        <div className="card p-8">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <User className="h-12 w-12" />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900">
                {userData.name}
              </h2>
              <p className="mt-1 text-slate-600">
                {userData.email}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-600">
                  {userData.role}
                </span>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-600">
                  {userData.subscription}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-indigo-600" />
              <span className="font-medium text-slate-700">
                Email Address
              </span>
            </div>
            <p className="mt-3 text-slate-900 font-semibold">
              {userData.email}
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-indigo-600" />
              <span className="font-medium text-slate-700">
                Account Role
              </span>
            </div>
            <p className="mt-3 text-slate-900 font-semibold">
              {userData.role}
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-indigo-600" />
              <span className="font-medium text-slate-700">
                Subscription
              </span>
            </div>
            <p className="mt-3 text-slate-900 font-semibold">
              {userData.subscription}
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-indigo-600" />
              <span className="font-medium text-slate-700">
                Remaining Analyses
              </span>
            </div>
            <p className="mt-3 text-slate-900 font-semibold">
              {userData.resumeLimit}
            </p>
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="card p-8 bg-linear-to-r from-indigo-600 to-purple-600 text-white">
          <h3 className="text-2xl font-bold">
            Upgrade Your Plan
          </h3>
          <p className="mt-2 text-indigo-100">
            Get unlimited resume analyses and advanced AI recommendations.
          </p>

          <div className="mt-6">
            <Button
              variant="secondary"
              className="text-indigo-600!"
            >
              Upgrade Now
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;