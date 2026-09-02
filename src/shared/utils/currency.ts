import i18n from '@/shared/lib/i18n';
import { Locale } from '@/shared/store/locale.store';

// Formatted by hand instead of Intl.NumberFormat: Hermes' bundled ICU data is
// inconsistent across Android builds, so currency symbol/decimal output can't
// be trusted to just work. All prices come from the API in AZN; the symbol and
// decimal separator are per-locale (see `currency.*` in the i18n locale files).
export const formatPrice = (price: string, locale: Locale): string => {
  const value = Number(price);
  const separator = i18n.t('currency.decimalSeparator', { lng: locale });
  const symbol = i18n.t('currency.symbol', { lng: locale });
  const formatted = (Number.isFinite(value) ? value : 0)
    .toFixed(2)
    .replace('.', separator);

  return `${formatted} ${symbol}`;
};
