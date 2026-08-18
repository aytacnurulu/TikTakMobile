import { apiFetch } from '@/shared/lib/api-fetch';
import { API } from '@/shared/constants/api.constants';
import { ApiResponse } from '@/shared/types/api-response.type';
import { Campaign } from '@/features/home/types/campaign.types';

export const campaignService = {
  getCampaigns: () =>
    apiFetch<ApiResponse<Campaign[]>>(API.CLIENT.CAMPAIGN.LIST),
};
