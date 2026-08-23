import { Locale } from '@/shared/store/locale.store';

// Formatted by hand instead of Intl.NumberFormat: Hermes' bundled ICU data is
// inconsistent across Android builds, so currency symbol/decimal output can't
// be trusted to just work. All prices come from the API in AZN.
const CURRENCY_LABEL: Record<Locale, string> = {
  az: '₼',
  ru: 'AZN',
  en: 'AZN',
};

const DECIMAL_SEPARATOR: Record<Locale, string> = {
  az: '.',
  ru: ',',
  en: '.',
};

export const formatPrice = (price: string, locale: Locale): string => {
  const value = Number(price);
  const formatted = (Number.isFinite(value) ? value : 0)
    .toFixed(2)
    .replace('.', DECIMAL_SEPARATOR[locale]);

  return `${formatted} ${CURRENCY_LABEL[locale]}`;
};
