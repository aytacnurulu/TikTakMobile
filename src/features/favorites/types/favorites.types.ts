import { ApiResponse } from '@/shared/types/api-response.type';
import { Product } from '@/features/product/types/product.types';

export type FavoritesListResponse = ApiResponse<Product[]>;
