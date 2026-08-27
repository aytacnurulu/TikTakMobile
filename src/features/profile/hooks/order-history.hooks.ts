import { useQuery } from '@tanstack/react-query';
import { orderHistoryService } from '@/features/profile/services/order-history.service';

export const useOrderHistory = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => orderHistoryService.getOrderHistory(),
  });
};

export const useOrderDetail = (id: number) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => orderHistoryService.getOrderDetail(id),
    enabled: !!id,
  });
};