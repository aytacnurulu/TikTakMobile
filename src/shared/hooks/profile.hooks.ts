import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/shared/services/profile.service';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => profileService.getProfile(),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};