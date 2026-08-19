import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/features/basket/services/order.service';
import { CreateOrderPayload } from '@/features/basket/types/order.types';

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOrderPayload) =>
      orderService.createOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['basket'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
