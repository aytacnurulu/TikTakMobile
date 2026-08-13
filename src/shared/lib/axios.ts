// api/axios.instance.ts
import Config from 'react-native-config';
import axios from 'axios';
import { useAuthStore } from '../../features/auth/store/auth.store';

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

axiosInstance.interceptors.response.use(
  response => {
    // You can modify the response data here if needed
    return response;
  },
  error => {
    // Handle response error here
    return Promise.reject(error);
  },
);
