// api/axios.instance.ts
import Config from 'react-native-config';
import axios from 'axios';
import { storage } from './storage';
import { useAuthStore } from '../../features/auth/store/auth.store';

export const axiosInstance = axios.create({
  baseURL: Config.API_BASE_URL,
  headers: {
    'Accept-Language': 'az', // TODO: wire to i18next once language switching is added
  },
});

axiosInstance.interceptors.request.use(
  config => {
    // Falls back to the in-memory auth store until login persists the token
    // to MMKV (`storage`) as part of the auth flow.
    const token = storage.getString('access_token') ?? useAuthStore.getState().token;
    if (token && token !== 'true') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);