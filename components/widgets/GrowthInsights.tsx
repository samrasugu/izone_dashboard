import React, { useMemo } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useDataFetcher } from "../../hooks/useApiData";
import { Comment, PerformanceTrendData } from "../../types/dashboard";
import { MetricCard } from "./MetricCard";
import { ActivityIndicator } from "../ui/ActivityIndicator";
import { API_ENDPOINTS } from "@/lib/api-endpoints";

export const GrowthInsights: React.FC = () => {
  const { data, loading, error, lastUpdated, refetch } = useDataFetcher<Comment[]>(
    API_ENDPOINTS.COMMENTS
  );

  const trendData = useMemo((): PerformanceTrendData[] => {
    if (!data) return [];

    return [
      { name: "Page Load", value: 85, trend: "up" as const },
      { name: "API Response", value: 92, trend: "up" as const },
      { name: "User Satisfaction", value: 78, trend: "down" as const },
      { name: "Error Rate", value: 95, trend: "up" as const },
    ];
  }, [data]);

  const TrendIcon: React.FC<{ trend: "up" | "down" }> = ({ trend }) => {
    return trend === "up" ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500" />
    );
  };

  return (
    <MetricCard
      title="Growth Insights"
      icon={<TrendingUp className="w-6 h-6 text-orange-500" />}
      lastUpdated={lastUpdated}
      onRefresh={refetch}
      error={error}
    >
      {loading ? (
        <ActivityIndicator color="border-orange-500" />
      ) : (
        <div className="space-y-4">
          {trendData.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {item.name}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-orange-600">
                    {item.value}%
                  </span>
                  <TrendIcon trend={item.trend} />
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </MetricCard>
  );
};
