export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Album {
  userId: number;
  id: number;
  title: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface UserStatsData {
  name: string;
  posts: number;
  comments: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  growth: number;
}

export interface SystemHealthData {
  name: string;
  value: number;
  color: string;
}

export interface PerformanceTrendData {
  name: string;
  value: number;
  trend: "up" | "down";
}

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}
