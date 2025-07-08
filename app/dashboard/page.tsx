"use client";

import React, { useState } from "react";
import { RefreshCw } from "lucide-react";
import { PerformanceTrendsWidget } from "@/components/widgets/PerformanceTrendsWidget";
import { RevenueWidget } from "@/components/widgets/RevenueWidget";
import { SystemHealthWidget } from "@/components/widgets/SystemHealthWidget";
import { UserStatsWidget } from "@/components/widgets/UserStatsWidget";

const Dashboard: React.FC = () => {
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const handleGlobalRefresh = (): void => {
    setRefreshCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Izone Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Real-time insights for your SaaS platform
              </p>
            </div>
            <button
              onClick={handleGlobalRefresh}
              className="bg-blue-600 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Refresh all widgets"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh All</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserStatsWidget key={`users-${refreshCount}`} />
          <RevenueWidget key={`revenue-${refreshCount}`} />
          <SystemHealthWidget key={`health-${refreshCount}`} />
          <PerformanceTrendsWidget key={`trends-${refreshCount}`} />
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Last updated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
