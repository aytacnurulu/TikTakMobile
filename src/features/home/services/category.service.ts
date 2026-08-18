import { apiFetch } from '@/shared/lib/api-fetch';
import { API } from '@/shared/constants/api.constants';
import { ApiResponse } from '@/shared/types/api-response.type';
import { Category } from '@/shared/types/category.type';

export const categoryService = {
  getCategories: () =>
    apiFetch<ApiResponse<Category[]>>(API.CLIENT.CATEGORY.LIST),
};
