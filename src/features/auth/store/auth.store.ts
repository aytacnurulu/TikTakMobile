import { create } from 'zustand';

interface AuthStore {
  token: string | null;
  role: string | null;
}

export const useAuthStore = create<AuthStore>(() => ({
  token: null,
  role: null,
}));
