import React from "react";
import { X } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) => {
  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className={`w-full ${sizes[size]} rounded-2xl bg-white shadow-2xl`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;