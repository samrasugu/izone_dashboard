"use client";

import React, { useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import { GrowthInsights } from "@/components/widgets/GrowthInsights";
import { SalesAnalytics } from "@/components/widgets/SalesAnalytics";
import { ServerMonitor } from "@/components/widgets/ServerMonitor";
import { AudienceMetrics } from "@/components/widgets/AudienceMetrics";

const Dashboard: React.FC = () => {
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const handleGlobalRefresh = (): void => {
    setRefreshCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary)] via-[var(--secondary)] to-[var(--primary)] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="p-1.5 md:p-2 rounded-full bg-white/20 border border-white/30">
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    IZONE Analytics
                  </h1>
                </div>
                <p className="text-white/80 text-sm sm:text-base md:text-lg">
                  SaaS Platform Dashboard
                </p>
              </div>
              
              <button
                onClick={handleGlobalRefresh}
                className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 border border-white/30 hover:scale-105 active:scale-95 shadow-lg text-sm sm:text-base w-full sm:w-auto cursor-pointer"
                aria-label="Refresh all widgets"
              >
                <RefreshCw className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium">Refresh All</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AudienceMetrics key={`users-${refreshCount}`} />
          <SalesAnalytics key={`revenue-${refreshCount}`} />
          <ServerMonitor key={`health-${refreshCount}`} />
          <GrowthInsights key={`trends-${refreshCount}`} />
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
            <div className="w-2 h-2 rounded-full bg-[var(--accent)] mr-3 animate-pulse" />
            <p className="text-white/80 text-sm">
              Last updated: {new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
