import React from "react";

const RecommendationList = ({
  title,
  items = [],
}) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="card p-6">
      <h3 className="text-xl font-semibold text-slate-900">
        {title}
      </h3>

      <ul className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex gap-3 text-slate-700"
          >
            <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationList;