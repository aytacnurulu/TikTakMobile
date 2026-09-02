import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandMmkvStorage } from '@/shared/lib/localStorage';
import { AuthTokens, User } from '@/shared/types/auth.types';

interface AuthStore {
  token: string | null;
  refreshToken: string | null;
  profile: User | null;
  login: (tokens: AuthTokens, profile: User) => void;
  setTokens: (tokens: AuthTokens) => void;
  setProfile: (
    profile: Partial<Omit<User, 'address' | 'img_url'>> & {
      address?: string | null;
      img_url?: string | null;
    },
  ) => void;
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
      setTokens: tokens =>
        set({
          token: tokens.access_token,
          refreshToken: tokens.refresh_token,
        }),
      setProfile: profile =>
        set(state => {
          if (!state.profile) return { profile: state.profile };
          return {
            profile: {
              ...state.profile,
              ...profile,
              address: profile.address ?? state.profile.address,
              img_url: profile.img_url ?? state.profile.img_url,
            },
          };
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
