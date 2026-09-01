import { Appearance } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandMmkvStorage } from '@/shared/lib/localStorage';

export type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const systemTheme: Theme = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';

export const useThemeStore = create<ThemeStore>()(
  persist(
    set => ({
      theme: systemTheme,
      setTheme: theme => set({ theme }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => zustandMmkvStorage),
    },
  ),
);
