import React from "react";

const Loader = ({
  size = "md",
  fullScreen = false,
  text = "",
}) => {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizes[size]} animate-spin rounded-full border-indigo-600 border-t-transparent`}
      />
      {text && <p className="text-sm text-slate-600">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;