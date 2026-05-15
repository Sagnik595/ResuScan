import React from "react";

const EmptyState = ({
  title = "No data found",
  description = "",
  action = null,
}) => {
  return (
    <div className="card p-10 text-center">
      <h3 className="text-xl font-semibold text-slate-900">
        {title}
      </h3>

      {description && (
        <p className="mt-2 text-slate-600">
          {description}
        </p>
      )}

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};

export default EmptyState;