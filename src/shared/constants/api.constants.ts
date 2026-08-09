export const BASE_URL = 'https://api.sarkhanrahimli.dev/api/tiktak';

export const API = {
  CLIENT: {
    AUTH: {
      LOGIN: '/auth/login',
      SIGNUP: '/auth/signup',
      REFRESH: '/auth/refresh',
    },
    PROFILE: '/profile',
    PRODUCTS: {
      LIST: '/products',
      DETAIL: (id: number | string) => `/products/${id}`,
      FAVORITE: (id: number | string) => `/products/${id}/favorite`,
      FAVORITES: '/products/favorites',
    },
    BASKET: {
      LIST: '/basket',
      CLEAR: '/basket/clear',
      ADD: (productId: number | string) => `/basket/${productId}/add`,
      REMOVE: (productId: number | string) => `/basket/${productId}/remove`,
      REMOVE_ALL: (productId: number | string) =>
        `/basket/${productId}/remove-all`,
    },
    CATEGORIES: '/categories',
    CAMPAIGNS: '/campaigns',
    ORDERS: {
      CHECKOUT: '/orders/checkout',
      LIST: '/orders/user',
      DETAIL: (id: number | string) => `/orders/user/${id}`,
    },
  },
  ADMIN: {},
  UPLOAD: '/upload',
};
