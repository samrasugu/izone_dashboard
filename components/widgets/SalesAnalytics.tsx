import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DollarSign } from "lucide-react";
import { useDataFetcher } from "../../hooks/useApiData";
import { Post, RevenueData } from "../../types/dashboard";
import { MetricCard } from "./MetricCard";
import { ActivityIndicator } from "../ui/ActivityIndicator";
import { API_ENDPOINTS } from "@/lib/api-endpoints";

export const SalesAnalytics: React.FC = () => {
  const { data, loading, error, lastUpdated, refetch } = useDataFetcher<Post[]>(
    API_ENDPOINTS.POSTS
  );

  const revenueData = useMemo((): RevenueData[] => {
    if (!data) return [];

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return months.map((month) => ({
      month,
      revenue: Math.floor(Math.random() * 50000) + 20000,
      growth: Math.floor(Math.random() * 20) + 5,
    }));
  }, [data]);

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const avgGrowth =
    revenueData.reduce((sum, item) => sum + item.growth, 0) /
    revenueData.length;

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <MetricCard
      title="Revenue Analytics"
      icon={<DollarSign className="w-6 h-6 text-green-500" />}
      lastUpdated={lastUpdated}
      onRefresh={refetch}
      error={error}
    >
      {loading ? (
        <ActivityIndicator color="border-green-500" />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(totalRevenue)}
              </div>
              <div className="text-sm text-green-600">Total Revenue</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {avgGrowth.toFixed(1)}%
              </div>
              <div className="text-sm text-blue-600">Avg Growth</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [
                  formatCurrency(value),
                  "Revenue",
                ]}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </MetricCard>
  );
};
