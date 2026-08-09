import { Product } from '../types/product.types';

/**
 * Temporary local data source.
 * Backend base URL is not configured yet in `shared/constants/api.constants.ts`.
 * Once it is, replace the body of `productService.getProducts` with a real
 * request and this file can be removed.
 */
export const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Qızıl əhmədi alması 1 kq',
    img_url: '',
    description: '',
    price: '3.30',
    type: 'fruit',
    created_at: '',
    category: { id: 1, name: 'Meyvələr' },
  },
  {
    id: 2,
    title: 'Yaşıl alma 1 kq',
    img_url: '',
    description: '',
    price: '2.80',
    type: 'fruit',
    created_at: '',
    category: { id: 1, name: 'Meyvələr' },
  },
  {
    id: 3,
    title: 'Alma sirkəsi 500 ml',
    img_url: '',
    description: '',
    price: '4.10',
    type: 'grocery',
    created_at: '',
    category: { id: 2, name: 'Ərzaq' },
  },
  {
    id: 4,
    title: 'Banan 1 kq',
    img_url: '',
    description: '',
    price: '3.60',
    type: 'fruit',
    created_at: '',
    category: { id: 1, name: 'Meyvələr' },
  },
  {
    id: 5,
    title: 'Pomidor 1 kq',
    img_url: '',
    description: '',
    price: '2.20',
    type: 'vegetable',
    created_at: '',
    category: { id: 3, name: 'Tərəvəzlər' },
  },
  {
    id: 6,
    title: 'Portağal 1 kq',
    img_url: '',
    description: '',
    price: '3.10',
    type: 'fruit',
    created_at: '',
    category: { id: 1, name: 'Meyvələr' },
  },
];
