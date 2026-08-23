import { apiFetch } from '@/shared/lib/api-fetch';
import { API } from '@/shared/constants/api.constants';
import { ApiResponse } from '@/shared/types/api-response.type';
import { FavoritesListResponse } from '@/shared/types/favorites.types';

export const favoritesService = {
  getFavorites: () => apiFetch<FavoritesListResponse>(API.CLIENT.PRODUCT.FAVORITES_LIST),
  toggleFavorite: (productId: number) =>
    apiFetch<ApiResponse<unknown>>(API.CLIENT.PRODUCT.FAVORITE_TOGGLE(productId), {
      method: 'POST',
    }),
};
