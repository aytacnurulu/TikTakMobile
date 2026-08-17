import { useQuery } from '@tanstack/react-query';
import { basketService } from '../services/basket.service';
import { useAuthStore } from '../../auth/store/auth.store';

export const useBasket = () => {
  const token = useAuthStore(state => state.token);

  return useQuery({
    queryKey: ['basket'],
    queryFn: basketService.getBasket,
    enabled: !!token,
    staleTime: 30_000,
  });
};

export const useAddToBasket = () => {};

export const useRemoveFromBasket = () => {};
