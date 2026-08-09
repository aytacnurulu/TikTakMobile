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
}

export interface ProductsResponse {
  message: string;
  data: Product[];
  result: boolean;
}
