import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  return useMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      useStatusStore.getState().show('success', t('accountInfo.saveSuccess'));
    },
    onError: () => {
      useStatusStore.getState().show('error', t('accountInfo.saveError'));
    },
  });
};