import { apiFetch } from '@/shared/lib/api-fetch';
import { API } from '@/shared/constants/api.constants';
import { ApiResponse } from '@/shared/types/api-response.type';
import { CreateOrderPayload, Order } from '@/shared/types/order.types';

export const orderService = {
  createOrder: async (payload: CreateOrderPayload) => {
    const response = await apiFetch<ApiResponse<Order>>(
      API.CLIENT.ORDERS.CREATE,
      {
        method: 'POST',
        data: payload,
      },
    );

    if (!response.result) {
      throw new Error(response.message || 'Sifariş yaradılmadı');
    }

    return response;
  },
};
