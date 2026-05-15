import React from "react";

const StatsCard = ({
  title,
  value,
  subtitle = "",
  icon: Icon,
  color = "indigo",
}) => {
  const colorClasses = {
    indigo: "bg-indigo-100 text-indigo-600",
    green: "bg-green-100 text-green-600",
    amber: "bg-amber-100 text-amber-600",
    red: "bg-red-100 text-red-600",
    blue: "bg-blue-100 text-blue-600",
  };

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h3>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>

        {Icon && (
          <div
            className={`rounded-xl p-3 ${
              colorClasses[color] || colorClasses.indigo
            }`}
          >
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;