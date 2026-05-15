import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthContextProvider, {
  AuthContext,
} from "../context/AuthContext";

// Public Pages
import LandingPage from "../pages/public/LandingPage";
import LoginPage from "../pages/public/LoginPage";
import RegisterPage from "../pages/public/RegisterPage";
import NotFoundPage from "../pages/public/NotFoundPage";

// User Pages
import DashboardPage from "../pages/user/DashboardPage";
import UploadPage from "../pages/user/UploadPage";
import JobsPage from "../pages/user/JobsPage";
import AnalysisPage from "../pages/user/AnalysisPage";
import ProfilePage from "../pages/user/ProfilePage";

// Admin Pages
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AddJobPage from "../pages/admin/AddJobPage";
import ManageJobsPage from "../pages/admin/ManageJobsPage";
import UsersPage from "../pages/admin/UsersPage";

// Route Guard for User Pages
const UserRoute = ({ children }) => {
  const { token, role } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "user") {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Route Guard for Admin Pages
const AdminRoute = ({ children }) => {
  const { token, role } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Prevent logged-in users from seeing login/register pages
const PublicRoute = ({ children }) => {
  const { token, role } = useContext(AuthContext);

  if (token && role === "user") {
    return <Navigate to="/dashboard" replace />;
  }

  if (token && role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          {/* User Routes */}
          <Route
            path="/dashboard"
            element={
              <UserRoute>
                <DashboardPage />
              </UserRoute>
            }
          />

          <Route
            path="/upload"
            element={
              <UserRoute>
                <UploadPage />
              </UserRoute>
            }
          />

          <Route
            path="/jobs"
            element={
              <UserRoute>
                <JobsPage />
              </UserRoute>
            }
          />

          <Route
            path="/analysis/:id"
            element={
              <UserRoute>
                <AnalysisPage />
              </UserRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <UserRoute>
                <ProfilePage />
              </UserRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/login"
            element={
              <PublicRoute>
                <AdminLoginPage />
              </PublicRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboardPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/add-job"
            element={
              <AdminRoute>
                <AddJobPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/jobs"
            element={
              <AdminRoute>
                <ManageJobsPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <UsersPage />
              </AdminRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;