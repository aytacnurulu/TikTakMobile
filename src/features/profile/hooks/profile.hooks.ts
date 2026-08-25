import { useQuery } from '@tanstack/react-query';
import { profileService } from '@/features/profile/services/profile.service';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => profileService.getProfile(),
  });
};