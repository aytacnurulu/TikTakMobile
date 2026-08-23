import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useLocaleStore } from '@/shared/store/locale.store';
import az from '@/shared/lib/i18n/locales/az.json';
import en from '@/shared/lib/i18n/locales/en.json';
import ru from '@/shared/lib/i18n/locales/ru.json';

i18n.use(initReactI18next).init({
  resources: {
    az: { translation: az },
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: useLocaleStore.getState().locale,
  fallbackLng: 'az',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
