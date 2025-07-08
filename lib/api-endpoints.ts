const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const API_ENDPOINTS = {
  USERS: `${BASE_URL}/users`,
  POSTS: `${BASE_URL}/posts`, 
  ALBUMS: `${BASE_URL}/albums`,
  COMMENTS: `${BASE_URL}/comments`,
  TODOS: `${BASE_URL}/todos`,
  PHOTOS: `${BASE_URL}/photos`,
} as const;

export type ApiEndpoint = keyof typeof API_ENDPOINTS;

export const getEndpoint = (endpoint: ApiEndpoint): string => {
  return API_ENDPOINTS[endpoint];
};

export const API_CONFIG = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  REFRESH_INTERVAL: 10000,
} as const;
