// api/axios.instance.ts
import Config from 'react-native-config';
import axios, { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../../features/auth/store/auth.store';
import { API } from '../constants/api.constants';
import { ApiResponse } from '../types/api-response.type';
import { AuthTokens } from '../../features/auth/types/auth.types';

interface RetryableRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export const axiosInstance = axios.create({
  baseURL: Config.API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // Handle request error here
    return Promise.reject(error);
  },
);

let isRefreshing = false;
let refreshQueue: Array<(token: string | null) => void> = [];

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = useAuthStore.getState().refreshToken;
  if (!refreshToken) {
    return null;
  }

  const response = await axios.post<ApiResponse<AuthTokens>>(
    `${Config.API_BASE_URL}${API.CLIENT.AUTH.REFRESH}`,
    { refresh_token: refreshToken },
  );

  const tokens = response.data.data;
  useAuthStore.getState().setTokens(tokens);
  return tokens.access_token;
};

axiosInstance.interceptors.response.use(
  response => {
    // You can modify the response data here if needed
    return response;
  },
  async error => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const isRefreshCall = originalRequest?.url === API.CLIENT.AUTH.REFRESH;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isRefreshCall
    ) {
      if (error.response?.status === 401 && (isRefreshCall || !originalRequest)) {
        useAuthStore.getState().logout();
      }
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push(newToken => {
          if (!newToken) {
            reject(error);
            return;
          }
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newToken}`,
          };
          resolve(axiosInstance(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      const newToken = await refreshAccessToken();

      if (!newToken) {
        useAuthStore.getState().logout();
        refreshQueue.forEach(callback => callback(null));
        return Promise.reject(error);
      }

      refreshQueue.forEach(callback => callback(newToken));
      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${newToken}`,
      };
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      useAuthStore.getState().logout();
      refreshQueue.forEach(callback => callback(null));
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
      refreshQueue = [];
    }
  },
);
