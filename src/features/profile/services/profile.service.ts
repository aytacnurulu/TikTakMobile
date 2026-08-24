import { apiFetch } from "@/shared/lib/api-fetch";
import { ApiResponse } from "@/shared/types/api-response.type";
import { Profile } from "../types/profile.types";
import { API } from "@/shared/constants/api.constants";

export interface UpdateProfilePayload {
  full_name: string;
  address: string | null;
  phone: string;
  email?: string;
  password?: string;
}

export const profileService = {
  getProfile: () =>
    apiFetch<ApiResponse<Profile>>(API.CLIENT.PROFILE.GET),

  updateProfile: (payload: UpdateProfilePayload) =>
    apiFetch<ApiResponse<Profile>>(API.CLIENT.PROFILE.UPDATE, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),
};