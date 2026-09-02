import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/shared/services/profile.service';
import { FEEDBACK } from '@/shared/constants/feedback.constants';
import { showFeedback } from '@/shared/hooks/useFeedback';
import { useAuthStore } from '../store/auth.store';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => profileService.getProfile(),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const setProfile = useAuthStore(state => state.setProfile);

  return useMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      setProfile(response.data);
      showFeedback('success', FEEDBACK.PROFILE.SAVED);
    },
    onError: () => {
      showFeedback('error', FEEDBACK.PROFILE.SAVE_FAILED);
    },
  });
};
