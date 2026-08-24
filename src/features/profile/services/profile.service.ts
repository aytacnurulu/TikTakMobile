import { apiFetch } from "@/shared/lib/api-fetch";
import { ApiResponse } from "@/shared/types/api-response.type";
import { User } from "../types/profile.types";
import { API } from "@/shared/constants/api.constants";

export const profileService = {
  getProfile: () =>
    apiFetch<ApiResponse<User>>(API.CLIENT.PROFILE.GET),
};