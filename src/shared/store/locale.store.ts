import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandMmkvStorage } from '@/shared/lib/localStorage';

export type Locale = 'az' | 'ru' | 'en';

interface LocaleStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleStore>()(
  persist(
    set => ({
      locale: 'az',
      setLocale: locale => set({ locale }),
    }),
    {
      name: 'locale-storage',
      storage: createJSONStorage(() => zustandMmkvStorage),
    },
  ),
);
