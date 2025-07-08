import React from "react";

interface ErrorMessageProps {
  message: string;
  icon?: React.ReactNode;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  icon,
}) => (
  <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
    {icon && <span className="w-5 h-5">{icon}</span>}
    <span className="text-sm">Error: {message}</span>
  </div>
);
