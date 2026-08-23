import { create } from 'zustand';

export type Locale = 'az' | 'ru' | 'en';

interface LocaleStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleStore>(() => ({
  locale: 'az',
  setLocale: () => {},
}));
