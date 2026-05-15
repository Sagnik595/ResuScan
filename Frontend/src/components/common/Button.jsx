import React from "react";
import clsx from "clsx";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  icon: Icon,
  className = "",
  onClick,
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md",
    secondary:
      "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50",
    outline:
      "border border-indigo-600 text-indigo-600 hover:bg-indigo-50",
    ghost:
      "text-slate-600 hover:bg-slate-100",
    danger:
      "bg-red-600 text-white hover:bg-red-700 shadow-sm hover:shadow-md",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Loading...
        </>
      ) : (
        <>
          {Icon && <Icon className="h-4 w-4" />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;