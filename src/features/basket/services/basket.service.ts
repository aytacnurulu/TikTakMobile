import { apiFetch } from '../../../shared/lib/api-fetch';
import { API } from '../../../shared/constants/api.constants';
import { ApiResponse } from '../../../shared/types/api-response.type';
import { Basket } from '../types/basket.types';

export const basketService = {
  getBasket: () => apiFetch<ApiResponse<Basket>>(API.CLIENT.BASKET.LIST),
  addToBasket: async () => {},
  removeFromBasket: async () => {},
};
