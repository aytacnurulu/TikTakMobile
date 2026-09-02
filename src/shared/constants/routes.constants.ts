import type {
  AuthStackParamList,
  HomeStackParamList,
  AccountStackParamList,
  MainTabParamList,
  RootStackParamList,
} from '@/app/stack/types';

/**
 * Route name constants, one map per navigator.
 *
 * `satisfies Record<string, keyof XParamList>` keeps these in sync with the
 * ParamList types in `@/app/stack/types` — a typo or a renamed screen fails to
 * compile here. `as const` preserves the string-literal types, so `name` props
 * and `navigation.navigate(...)` calls stay fully type-checked.
 */

export const AUTH_ROUTES = {
  ONBOARDING: 'Onboarding',
  WELCOME: 'Welcome',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
} as const satisfies Record<string, keyof AuthStackParamList>;

export const HOME_ROUTES = {
  HOME: 'Home',
  PRODUCTS: 'Products',
} as const satisfies Record<string, keyof HomeStackParamList>;

export const ACCOUNT_ROUTES = {
  ACCOUNT: 'Account',
  ACCOUNT_INFO: 'AccountInfo',
  ORDER_HISTORY: 'OrderHistory',
  FAVORITES: 'Favorites',
  SETTINGS: 'Settings',
} as const satisfies Record<string, keyof AccountStackParamList>;

export const TAB_ROUTES = {
  HOME: 'Home',
  SEARCH: 'Search',
  ACCOUNT: 'Account',
} as const satisfies Record<string, keyof MainTabParamList>;

export const ROOT_ROUTES = {
  AUTH: 'Auth',
  MAIN: 'Main',
  BASKET: 'Basket',
  CHECKOUT: 'Checkout',
  ORDER_SUCCESS: 'OrderSuccess',
} as const satisfies Record<string, keyof RootStackParamList>;
