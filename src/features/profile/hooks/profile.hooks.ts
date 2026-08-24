import { profileService, UpdateProfilePayload } from '../services/profile.service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

export const PROFILE_QUERY_KEY = ['profile'] as const;

export const useProfile = () => {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: () => profileService.getProfile(),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => profileService.updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });
};

