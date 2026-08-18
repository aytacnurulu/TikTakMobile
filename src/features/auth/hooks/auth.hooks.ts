import { useMutation } from '@tanstack/react-query';
import { authService } from '@/features/auth/services/auth.service';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { LoginPayload, SignupPayload } from '@/features/auth/types/auth.types';

export const useLogin = () => {
  const login = useAuthStore(state => state.login);

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: res => {
      login(res.data.tokens, res.data.profile);
    },
  });
};

export const useRegister = () => {
  const login = useAuthStore(state => state.login);

  return useMutation({
    mutationFn: async (payload: SignupPayload) => {
      await authService.register(payload);
      return authService.login({
        phone: payload.phone,
        password: payload.password,
      });
    },
    onSuccess: res => {
      login(res.data.tokens, res.data.profile);
    },
  });
};

export const useLogout = () => useAuthStore(state => state.logout);
