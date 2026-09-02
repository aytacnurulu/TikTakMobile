import { apiFetch } from '@/shared/lib/api-fetch';
import { API } from '@/shared/constants/api.constants';
import { OrderHistoryItem, OrderDetail } from '@/shared/types/order.types';
import { ApiResponse } from '@/shared/types/api-response.type';

export const orderHistoryService = {
  getOrderHistory: async () => {
    const response = await apiFetch<ApiResponse<OrderHistoryItem[]>>(
      API.CLIENT.ORDERS.LIST,
    );
    return response.data;
  },
  getOrderDetail: async (id: number) => {
    const response = await apiFetch<ApiResponse<OrderDetail>>(
      API.CLIENT.ORDERS.DETAIL(id),
    );
    return response.data;
  },
};