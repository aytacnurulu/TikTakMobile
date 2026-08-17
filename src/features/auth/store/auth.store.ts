import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandMmkvStorage } from '@/shared/lib/localStorage';
import { AuthTokens, User } from '@/features/auth/types/auth.types';

interface AuthStore {
  token: string | null;
  refreshToken: string | null;
  profile: User | null;
  login: (tokens: AuthTokens, profile: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      token: null,
      refreshToken: null,
      profile: null,
      login: (tokens, profile) =>
        set({
          token: tokens.access_token,
          refreshToken: tokens.refresh_token,
          profile,
        }),
      logout: () => set({ token: null, refreshToken: null, profile: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => zustandMmkvStorage),
      partialize: state => ({
        token: state.token,
        refreshToken: state.refreshToken,
        profile: state.profile,
      }),
    },
  ),
);
