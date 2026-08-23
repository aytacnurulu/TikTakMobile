import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { favoritesService } from '@/shared/services/favorites.service';
import { useAuthStore } from '@/shared/store/auth.store';
import { FavoritesListResponse } from '@/shared/types/favorites.types';
import { Product } from '@/shared/types/product.types';

const FAVORITES_KEY = ['favorites'];

export const useFavorites = () => {
  const token = useAuthStore(state => state.token);

  return useQuery({
    queryKey: FAVORITES_KEY,
    queryFn: favoritesService.getFavorites,
    enabled: !!token,
    staleTime: 30_000,
  });
};

export const useIsFavorite = (productId: number) => {
  const { data } = useFavorites();
  return !!data?.data.some(product => product.id === productId);
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: Product) => favoritesService.toggleFavorite(product.id),
    onMutate: async (product: Product) => {
      await queryClient.cancelQueries({ queryKey: FAVORITES_KEY });
      const previous = queryClient.getQueryData<FavoritesListResponse>(FAVORITES_KEY);

      queryClient.setQueryData<FavoritesListResponse>(FAVORITES_KEY, current => {
        if (!current) {
          return current;
        }

        const isFavorite = current.data.some(item => item.id === product.id);

        return {
          ...current,
          data: isFavorite
            ? current.data.filter(item => item.id !== product.id)
            : [product, ...current.data],
        };
      });

      return { previous };
    },
    onError: (_error, _product, context) => {
      if (context?.previous) {
        queryClient.setQueryData(FAVORITES_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: FAVORITES_KEY });
    },
  });
};
