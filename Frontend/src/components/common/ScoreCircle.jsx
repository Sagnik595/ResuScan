import React from "react";

const ScoreCircle = ({ score = 0 }) => {
  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return "#10B981";
    if (score >= 60) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <div className="relative flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#E2E8F0"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={getColor()}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </svg>

      <div className="absolute text-center">
        <p className="text-3xl font-bold text-slate-900">
          {Math.round(score)}%
        </p>
        <p className="text-sm text-slate-500">Match</p>
      </div>
    </div>
  );
};

export default ScoreCircle;