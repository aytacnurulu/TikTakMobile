import { axiosInstance } from '../../../shared/lib/axios';
import { API } from '../../../shared/constants/api.constants';
import { Product, ProductsResponse } from '../types/product.types';

export interface GetProductsParams {
  search?: string;
  category_id?: number;
  page?: number;
  limit?: number;
}

export const productService = {
  getProducts: async (params?: GetProductsParams): Promise<Product[]> => {
    const { data } = await axiosInstance.get<ProductsResponse>(
      API.CLIENT.PRODUCTS.LIST,
      { params },
    );
    return data.data;
  },
  getProductById: async (id: number): Promise<Product> => {
    const { data } = await axiosInstance.get<{ message: string; data: Product; result: boolean }>(
      API.CLIENT.PRODUCTS.DETAIL(id),
    );
    return data.data;
  },
};
