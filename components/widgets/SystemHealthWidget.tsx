import React, { useMemo } from "react";
import { Activity } from "lucide-react";
import { useApiData } from "../../hooks/useApiData";
import { Album, SystemHealthData } from "../../types/dashboard";
import { WidgetContainer } from "./WidgetContainer";
import { LoadingSpinner } from "../ui/LoadingSpinner";

export const SystemHealthWidget: React.FC = () => {
  const { data, loading, error, lastUpdated, refetch } = useApiData<Album[]>(
    "https://jsonplaceholder.typicode.com/albums"
  );

  const systemData = useMemo((): SystemHealthData[] => {
    if (!data) return [];

    return [
      {
        name: "CPU Usage",
        value: Math.floor(Math.random() * 40) + 20,
        color: "#3B82F6",
      },
      {
        name: "Memory",
        value: Math.floor(Math.random() * 30) + 40,
        color: "#10B981",
      },
      {
        name: "Disk",
        value: Math.floor(Math.random() * 20) + 15,
        color: "#F59E0B",
      },
      {
        name: "Network",
        value: Math.floor(Math.random() * 25) + 10,
        color: "#EF4444",
      },
    ];
  }, [data]);

  const overallHealth =
    systemData.reduce((sum, item) => sum + (100 - item.value), 0) /
    systemData.length;

  return (
    <WidgetContainer
      title="System Health"
      icon={<Activity className="w-6 h-6 text-purple-500" />}
      lastUpdated={lastUpdated}
      onRefresh={refetch}
      error={error}
    >
      {loading ? (
        <LoadingSpinner color="border-purple-500" />
      ) : (
        <>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Overall Health</span>
              <span className="text-lg font-bold text-purple-600">
                {overallHealth.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${overallHealth}%` }}
              />
            </div>
          </div>
          <div className="space-y-3">
            {systemData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.name}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${item.value}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: item.color }}
                  >
                    {item.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </WidgetContainer>
  );
};
