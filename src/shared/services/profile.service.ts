import { apiFetch } from '@/shared/lib/api-fetch';
import { API } from '@/shared/constants/api.constants';
import { ApiResponse } from '@/shared/types/api-response.type';
import { Profile, UpdateProfilePayload } from '@/shared/types/profile.types';

export const profileService = {
  getProfile: () => apiFetch<ApiResponse<Profile>>(API.CLIENT.PROFILE.GET),
  updateProfile: (payload: UpdateProfilePayload) =>
    apiFetch<ApiResponse<Profile>>(API.CLIENT.PROFILE.UPDATE, {
      method: 'PUT',
      data: payload,
    }),
};