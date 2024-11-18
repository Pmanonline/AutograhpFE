import React from "react";
import { X } from "lucide-react";

export const AlertDescription = ({ children }) => (
  <div className="text-sm font-medium">{children}</div>
);

export const Alert = ({ children, variant = "default", onClose }) => {
  const baseClasses = "p-6 rounded-lg border relative min-w-[300px]";
  const variantClasses = {
    default: "bg-blue-100 border-blue-300 text-blue-800",
    destructive: "bg-red-100 border-red-300 text-red-800",
    success: "bg-yellow-100 border-yellow-300 text-yellow-800",
    warning: "bg-yellow-100 border-yellow-300 text-yellow-800",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 ">
      <div
        className={`${baseClasses} ${variantClasses[variant]} max-w-md mx-4 transform transition-all duration-200 ease-out`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-opacity-20 hover:bg-gray-900 transition-colors"
          aria-label="Close alert"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
};
