import React from "react";
import { RefreshCw } from "lucide-react";

interface WidgetContainerProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  lastUpdated?: Date | null;
  onRefresh: () => void;
  error?: string | null;
}

export const WidgetContainer: React.FC<WidgetContainerProps> = ({
  title,
  icon,
  children,
  lastUpdated,
  onRefresh,
  error,
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        {icon}
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="flex items-center space-x-2">
        {lastUpdated && (
          <span className="text-xs text-gray-500">
            {lastUpdated.toLocaleTimeString()}
          </span>
        )}
        <button
          onClick={onRefresh}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          title="Refresh"
          aria-label={`Refresh ${title}`}
        >
          <RefreshCw className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
    {error ? (
      <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
        <span className="text-sm">Error: {error}</span>
      </div>
    ) : (
      children
    )}
  </div>
);
