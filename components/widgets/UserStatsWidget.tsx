import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users } from "lucide-react";
import { useApiData } from "../../hooks/useApiData";
import { User, UserStatsData } from "../../types/dashboard";
import { WidgetContainer } from "./WidgetContainer";
import { LoadingSpinner } from "../ui/LoadingSpinner";

export const UserStatsWidget: React.FC = () => {
  const { data, loading, error, lastUpdated, refetch } = useApiData<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  const processedData = useMemo((): UserStatsData[] => {
    if (!data) return [];

    return data.slice(0, 6).map((user) => ({
      name: user.name.split(" ")[0],
      posts: Math.floor(Math.random() * 50) + 10,
      comments: Math.floor(Math.random() * 100) + 20,
    }));
  }, [data]);

  const totalUsers = data?.length || 0;
  const activeUsers = Math.floor(totalUsers * 0.7);

  return (
    <WidgetContainer
      title="User Statistics"
      icon={<Users className="w-6 h-6 text-blue-500" />}
      lastUpdated={lastUpdated}
      onRefresh={refetch}
      error={error}
    >
      {loading ? (
        <LoadingSpinner color="border-blue-500" />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {totalUsers}
              </div>
              <div className="text-sm text-blue-600">Total Users</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {activeUsers}
              </div>
              <div className="text-sm text-green-600">Active Users</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="posts" fill="#3B82F6" />
              <Bar dataKey="comments" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </WidgetContainer>
  );
};
