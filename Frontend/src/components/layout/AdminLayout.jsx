import React from "react";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar admin />
      <main className="flex-1 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;