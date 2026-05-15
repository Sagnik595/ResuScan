import React from "react";

const Textarea = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  rows = 6,
  error = "",
  required = false,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`input-field resize-none ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-slate-300 focus:ring-indigo-500"
        } ${className}`}
        {...props}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Textarea;