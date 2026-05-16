export const getScoreColor = (score) => {
  if (score >= 80) {
    return {
      text: "text-green-600",
      bg: "bg-green-100",
      ring: "ring-green-200",
      progress: "bg-green-500",
      label: "Excellent Match",
    };
  }

  if (score >= 60) {
    return {
      text: "text-yellow-600",
      bg: "bg-yellow-100",
      ring: "ring-yellow-200",
      progress: "bg-yellow-500",
      label: "Good Match",
    };
  }

  if (score >= 40) {
    return {
      text: "text-orange-600",
      bg: "bg-orange-100",
      ring: "ring-orange-200",
      progress: "bg-orange-500",
      label: "Average Match",
    };
  }

  return {
    text: "text-red-600",
    bg: "bg-red-100",
    ring: "ring-red-200",
    progress: "bg-red-500",
    label: "Needs Improvement",
  };
};