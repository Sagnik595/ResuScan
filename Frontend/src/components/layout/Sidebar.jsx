import React from "react";
import { NavLink } from "react-router-dom";
import {
  BarChart3,
  Briefcase,
  FileSearch,
  LayoutDashboard,
  LogOut,
  Upload,
  Users,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Sidebar = ({ admin = false }) => {
  const { logout } = useAuth();

  const userLinks = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Upload Resume", path: "/upload", icon: Upload },
    { name: "Jobs", path: "/jobs", icon: Briefcase },
  ];

  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Add Job", path: "/admin/add-job", icon: Upload },
    { name: "Manage Jobs", path: "/admin/jobs", icon: FileSearch },
    { name: "Users", path: "/admin/users", icon: Users },
  ];

  const links = admin ? adminLinks : userLinks;

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-6 py-5">
        <h1 className="text-2xl font-bold text-indigo-600">ResuScan</h1>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {link.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;