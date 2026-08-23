import { apiFetch } from '@/shared/lib/api-fetch';
import { API } from '@/shared/constants/api.constants';
import { ApiResponse } from '@/shared/types/api-response.type';
import {
  AuthResponseData,
  AuthTokens,
  LoginPayload,
  SignupPayload,
} from '@/shared/types/auth.types';

export const authService = {
  login: (payload: LoginPayload) =>
    apiFetch<ApiResponse<AuthResponseData>>(API.CLIENT.AUTH.LOGIN, {
      method: 'POST',
      data: payload,
    }),

  register: (payload: SignupPayload) =>
    apiFetch<ApiResponse<null>>(API.CLIENT.AUTH.SIGNUP, {
      method: 'POST',
      data: payload,
    }),

  refresh: (refreshToken: string) =>
    apiFetch<ApiResponse<AuthTokens>>(API.CLIENT.AUTH.REFRESH, {
      method: 'POST',
      data: { refresh_token: refreshToken },
    }),
};
