import React from "react";
import { FileText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-custom py-10">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-indigo-600 p-2 text-white">
              <FileText className="h-4 w-4" />
            </div>
            <span className="font-semibold text-slate-900">ResuScan</span>
          </div>

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} ResuScan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;