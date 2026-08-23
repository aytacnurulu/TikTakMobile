import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/shared/services/category.service';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getCategories,
  });
};
