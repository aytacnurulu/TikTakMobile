import { useQuery } from '@tanstack/react-query';
import { campaignService } from '@/features/home/services/campaign.service';

export const useCampaigns = () => {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: campaignService.getCampaigns,
  });
};
