import { apiFetch } from '@/shared/lib/api-fetch';
import { API } from '@/shared/constants/api.constants';
import { ApiResponse } from '@/shared/types/api-response.type';
import { Product, ProductListResponse } from '@/shared/types/product.types';

interface GetProductsParams {
  categoryId: number;
  page: number;
}

export const productService = {
  getProducts: ({ categoryId, page }: GetProductsParams) =>
    apiFetch<ProductListResponse>(API.CLIENT.PRODUCT.LIST, {
      params: { category_id: categoryId, page },
    }),
  getProductById: (id: number) =>
    apiFetch<ApiResponse<Product>>(API.CLIENT.PRODUCT.DETAIL(id)),
};
