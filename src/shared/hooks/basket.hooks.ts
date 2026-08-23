import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { basketService } from '@/shared/services/basket.service';
import { useAuthStore } from '@/shared/store/auth.store';
import { Basket } from '@/shared/types/basket.types';
import { Product } from '@/shared/types/product.types';
import { ApiResponse } from '@/shared/types/api-response.type';

const BASKET_KEY = ['basket'];

export const useBasket = () => {
  const token = useAuthStore(state => state.token);

  return useQuery({
    queryKey: BASKET_KEY,
    queryFn: basketService.getBasket,
    enabled: !!token,
    staleTime: 30_000,
  });
};

export const useAddToBasket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ product }: { product: Product }) => basketService.addToBasket(product.id),
    onMutate: async ({ product }) => {
      await queryClient.cancelQueries({ queryKey: BASKET_KEY });
      const previous = queryClient.getQueryData<ApiResponse<Basket>>(BASKET_KEY);

      queryClient.setQueryData<ApiResponse<Basket>>(BASKET_KEY, current => {
        if (!current) {
          return current;
        }

        const existing = current.data.items.find(item => item.product.id === product.id);
        const items = existing
          ? current.data.items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
          : [
              ...current.data.items,
              { id: -product.id, quantity: 1, total_price: product.price, product },
            ];

        return {
          ...current,
          data: { ...current.data, items, count: current.data.count + 1 },
        };
      });

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(BASKET_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: BASKET_KEY });
    },
  });
};

export const useRemoveFromBasket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, removeAll }: { productId: number; removeAll?: boolean }) =>
      removeAll
        ? basketService.removeAllFromBasket(productId)
        : basketService.removeFromBasket(productId),
    onMutate: async ({ productId, removeAll }) => {
      await queryClient.cancelQueries({ queryKey: BASKET_KEY });
      const previous = queryClient.getQueryData<ApiResponse<Basket>>(BASKET_KEY);

      queryClient.setQueryData<ApiResponse<Basket>>(BASKET_KEY, current => {
        if (!current) {
          return current;
        }

        const existing = current.data.items.find(item => item.product.id === productId);
        if (!existing) {
          return current;
        }

        const items =
          removeAll || existing.quantity <= 1
            ? current.data.items.filter(item => item.product.id !== productId)
            : current.data.items.map(item =>
                item.product.id === productId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item,
              );

        return {
          ...current,
          data: { ...current.data, items, count: Math.max(current.data.count - 1, 0) },
        };
      });

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(BASKET_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: BASKET_KEY });
    },
  });
};
