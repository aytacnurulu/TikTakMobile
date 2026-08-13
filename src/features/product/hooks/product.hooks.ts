import { useQuery } from '@tanstack/react-query';
import { GetProductsParams, productService } from '../services/product.service';

export const useProducts = (params?: GetProductsParams, enabled = true) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getProducts(params),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};

export const useProduct = (id?: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id as number),
    enabled: !!id,
  });
};
