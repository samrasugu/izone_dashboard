import { useState, useEffect, useCallback } from "react";
import { ApiState } from "../types/dashboard";

export const useApiData = <T>(
  url: string,
  interval: number = 10000
): ApiState<T> & { refetch: () => Promise<void> } => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: T = await response.json();
      setData(result);
      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("API fetch error:", errorMessage);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, interval);

    return () => clearInterval(intervalId);
  }, [fetchData, interval]);

  return { data, loading, error, lastUpdated, refetch: fetchData };
};
