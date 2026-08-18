import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { favoritesService } from '@/features/favorites/services/favorites.service';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { FavoritesListResponse } from '@/features/favorites/types/favorites.types';

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
    mutationFn: (productId: number) => favoritesService.toggleFavorite(productId),
    onMutate: async (productId: number) => {
      await queryClient.cancelQueries({ queryKey: FAVORITES_KEY });
      const previous = queryClient.getQueryData<FavoritesListResponse>(FAVORITES_KEY);

      queryClient.setQueryData<FavoritesListResponse>(FAVORITES_KEY, current => {
        if (!current) {
          return current;
        }

        const isFavorite = current.data.some(product => product.id === productId);
        if (!isFavorite) {
          return current;
        }

        return {
          ...current,
          data: current.data.filter(product => product.id !== productId),
        };
      });

      return { previous };
    },
    onError: (_error, _productId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(FAVORITES_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: FAVORITES_KEY });
    },
  });
};
