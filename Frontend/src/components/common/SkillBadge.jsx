import React from "react";

const SkillBadge = ({
  skill,
  variant = "default",
}) => {
  const variants = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-red-700",
    primary: "bg-indigo-100 text-indigo-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${variants[variant]}`}
    >
      {skill}
    </span>
  );
};

export default SkillBadge;