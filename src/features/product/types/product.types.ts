export interface ProductCategory {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  title: string;
  img_url: string;
  description: string;
  price: string;
  type: string;
  created_at: string;
  category: ProductCategory;
  is_favorite?: boolean;
}

export interface ProductPagination {
  next: number | null;
  prev: number | null;
  current: number;
  total: number;
  totalPages: number;
}

export interface ProductListResponse {
  message: string;
  data: Product[];
  pagination: ProductPagination;
  result: boolean;
}
