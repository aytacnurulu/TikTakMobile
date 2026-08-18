import { AxiosRequestConfig } from 'axios';
import { axiosInstance } from '@/shared/lib/axios';

export const apiFetch = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await axiosInstance.request<T>({ url, ...config });
  return response.data;
};
