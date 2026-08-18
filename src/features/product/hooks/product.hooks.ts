import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { productService } from '@/features/product/services/product.service';

export const useProducts = (categoryId: number) => {
  return useInfiniteQuery({
    queryKey: ['products', categoryId],
    queryFn: ({ pageParam }) => productService.getProducts({ categoryId, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.pagination.current < lastPage.pagination.totalPages
        ? lastPage.pagination.current + 1
        : undefined,
    enabled: !!categoryId,
    placeholderData: keepPreviousData,
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
  });
};
