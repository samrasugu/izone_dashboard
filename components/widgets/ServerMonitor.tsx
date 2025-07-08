import React, { useMemo } from "react";
import { Activity } from "lucide-react";
import { useDataFetcher } from "../../hooks/useApiData";
import { Album, SystemHealthData } from "../../types/dashboard";
import { MetricCard } from "./MetricCard";
import { ActivityIndicator } from "../ui/ActivityIndicator";
import { API_ENDPOINTS } from "@/lib/api-endpoints";

export const ServerMonitor: React.FC = () => {
  const { data, loading, error, lastUpdated, refetch } = useDataFetcher<Album[]>(
    API_ENDPOINTS.ALBUMS
  );

  const systemData = useMemo((): SystemHealthData[] => {
    if (!data) return [];

    return [
      {
        name: "CPU Usage",
        value: Math.floor(Math.random() * 40) + 20,
        color: "var(--primary)",
      },
      {
        name: "Memory",
        value: Math.floor(Math.random() * 30) + 40,
        color: "var(--accent)",
      },
      {
        name: "Disk",
        value: Math.floor(Math.random() * 20) + 15,
        color: "var(--warning)",
      },
      {
        name: "Network",
        value: Math.floor(Math.random() * 25) + 10,
        color: "var(--error)",
      },
    ];
  }, [data]);

  const overallHealth =
    systemData.reduce((sum, item) => sum + (100 - item.value), 0) /
    systemData.length;

  return (
    <MetricCard
      title="Server Monitor"
      icon={<Activity className="w-6 h-6 text-purple-500" />}
      lastUpdated={lastUpdated}
      onRefresh={refetch}
      error={error}
    >
      {loading ? (
        <ActivityIndicator color="border-purple-500" />
      ) : (
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Overall Health</span>
              <span className="text-xl font-semibold text-purple-600">
                {overallHealth.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-purple-500 to-blue-600"
                style={{ width: `${overallHealth}%` }}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            {systemData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {item.name}
                  </span>
                  <span 
                    className="text-sm font-semibold"
                    style={{ color: item.color }}
                  >
                    {item.value}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300 ease-out"
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </MetricCard>
  );
};
