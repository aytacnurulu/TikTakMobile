import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/shared/services/profile.service';
import { useStatusStore } from '@/shared/store/status.store';

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
      useStatusStore.getState().show('success', 'Uğurla yadda saxlanıldı');
    },
    onError: () => {
      useStatusStore.getState().show('error', 'Yadda saxlanılarkən xəta baş verdi');
    },
  });
};