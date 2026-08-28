import { apiFetch } from '@/shared/lib/api-fetch';
import { API } from '@/shared/constants/api.constants';
import { OrderHistoryItem, OrderDetail } from '@/shared/types/order.types';

export const orderHistoryService = {
  getOrderHistory: () =>
    apiFetch<OrderHistoryItem[]>(API.CLIENT.ORDERS.LIST),
  getOrderDetail: (id: number) =>
    apiFetch<OrderDetail>(API.CLIENT.ORDERS.DETAIL(id)),
};