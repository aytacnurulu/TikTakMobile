export const API = {
  CLIENT: {
    AUTH: {
      LOGIN: '/api/tiktak/auth/login',
      SIGNUP: '/api/tiktak/auth/signup',
      REFRESH: '/api/tiktak/auth/refresh',
    },
    PRODUCT: {
      LIST: '/api/tiktak/products',
      DETAIL: (id: number) => `/api/tiktak/products/${id}`,
      FAVORITE_TOGGLE: (id: number) => `/api/tiktak/products/${id}/favorite`,
      FAVORITES_LIST: '/api/tiktak/products/favorites',
    },
    CATEGORY: {
      LIST: '/api/tiktak/categories',
    },
    CAMPAIGN: {
      LIST: '/api/tiktak/campaigns',
    },
    BASKET: {
      LIST: '/api/tiktak/basket',
      ADD: (productId: number) => `/api/tiktak/basket/${productId}/add`,
      REMOVE: (productId: number) => `/api/tiktak/basket/${productId}/remove`,
      REMOVE_ALL: (productId: number) =>
        `/api/tiktak/basket/${productId}/remove-all`,
      CLEAR: '/api/tiktak/basket/clear',
    },
    ORDERS: {
      CREATE: '/api/tiktak/orders/user',
      LIST: '/api/tiktak/orders/user',
    },
  },

  UPLOAD: '/api/tiktak/upload',
};
