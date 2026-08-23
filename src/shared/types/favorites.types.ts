import { ApiResponse } from '@/shared/types/api-response.type';
import { Product } from '@/shared/types/product.types';

export type FavoritesListResponse = ApiResponse<Product[]>;
