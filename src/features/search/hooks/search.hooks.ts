import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { productService } from '@/features/product/services/product.service';

export const useSearchProducts = (query: string) => {
  const search = query.trim();

  return useInfiniteQuery({
    queryKey: ['products', 'search', search],
    queryFn: ({ pageParam }) => productService.getProducts({ search, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.pagination.current < lastPage.pagination.totalPages
        ? lastPage.pagination.current + 1
        : undefined,
    enabled: search.length > 0,
    placeholderData: keepPreviousData,
  });
};
