import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/shared/hooks/useTheme';
import { useLocaleStore } from '@/shared/store/locale.store';
import { formatPrice } from '@/shared/utils/currency';
import { styles } from './OrderSummary.styles';

interface OrderSummaryProps {
  total: string;
  /** Render a hairline separator above the totals (used inside the checkout card). */
  divider?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Totals block shared by the basket and checkout screens: subtotal + free
 * delivery line on the left, grand total on the right.
 */
const OrderSummary = ({ total, divider = false, style }: OrderSummaryProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const locale = useLocaleStore(state => state.locale);
  const formattedTotal = formatPrice(total, locale);

  return (
    <View style={style}>
      {divider ? (
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
      ) : null}
      <View style={styles.row}>
        <View>
          <Text style={[styles.text, { color: colors.textPrimary }]}>
            {t('basket.total')}: {formattedTotal}
          </Text>
          <Text style={[styles.text, { color: colors.textPrimary }]}>
            {t('basket.delivery')}: {t('basket.free')}
          </Text>
        </View>
        <View style={styles.totalBlock}>
          <Text style={[styles.totalLabel, { color: colors.textPrimary }]}>
            {t('basket.grandTotal')}:
          </Text>
          <Text style={[styles.totalValue, { color: colors.textPrimary }]}>
            {formattedTotal}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrderSummary;
