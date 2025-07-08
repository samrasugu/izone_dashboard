import { useState, useEffect, useCallback } from "react";
import { ApiState } from "../types/dashboard";

interface ApiDataHook<T> extends ApiState<T> {
  refetch: () => Promise<void>;
}

const DEFAULT_REFRESH_INTERVAL = 10000;

export function useDataFetcher<T>(url: string, interval = DEFAULT_REFRESH_INTERVAL): ApiDataHook<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
    lastUpdated: null,
  });

  const performDataFetch = useCallback(async () => {
    setState(prev => ({ ...prev, error: null }));
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json() as T;
      
      setState({
        data: result,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      
      console.error("API fetch error:", errorMessage);
    }
  }, [url]);

  useEffect(() => {
    performDataFetch();
    
    const intervalId = setInterval(performDataFetch, interval);
    return () => clearInterval(intervalId);
  }, [performDataFetch, interval]);

  return {
    ...state,
    refetch: performDataFetch,
  };
}
