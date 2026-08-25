import { apiFetch } from '@/shared/lib/api-fetch';
import { API } from '@/shared/constants/api.constants';
import { ApiResponse } from '@/shared/types/api-response.type';
import { Profile } from '@/shared/types/profile.types';

export const profileService = {
  getProfile: () => apiFetch<ApiResponse<Profile>>(API.CLIENT.PROFILE.GET),
    updateProfile: (payload: Partial<Profile>) =>
    apiFetch<ApiResponse<Profile>>(API.CLIENT.PROFILE.UPDATE, {
      method: 'PUT', 
      data: payload,
    }),
};