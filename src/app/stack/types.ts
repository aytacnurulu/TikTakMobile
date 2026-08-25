import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Onboarding: undefined;
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Products: { categoryId: number; categoryName: string };
};

export type AccountStackParamList = {
  Account: undefined;
  AccountInfo: undefined;
  OrderHistory: undefined;
  OrderHistoryDetail: { orderId: string };
  Favorites: undefined;
};

export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Search: undefined;
  Account: NavigatorScreenParams<AccountStackParamList>;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Basket: undefined;
  Checkout: undefined;
  OrderSuccess: undefined;
};
