import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/shared/hooks/useTheme';
import { Locale } from '@/shared/store/locale.store';
import { formatPrice } from '@/shared/utils/currency';
import { OrderHistoryItem } from '@/shared/types/order.types';
import { styles } from './OrderDetailHeader.styles';


type ThemeColors = ReturnType<typeof useTheme>['colors'];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}.${month}.${date.getFullYear()}`;
};

interface OrderDetailHeaderProps {
  order: OrderHistoryItem;
  itemsCount: number;
  colors: ThemeColors;
  locale: Locale;
}

const OrderDetailHeader = ({
  order,
  itemsCount,
  colors,
  locale,
}: OrderDetailHeaderProps) => {
  const { t } = useTranslation();

  const statusLabel =
    t(`orderHistory.statuses.${order.status}`, { defaultValue: order.status });

  return (
    <>
      <View style={styles.infoRow}>
        <View style={styles.infoColumn}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            {t('orderHistory.date')}
          </Text>
          <Text style={[styles.value, { color: colors.textPrimary }]}>
            {formatDate(order.createdAt)}
          </Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            {t('orderHistory.orderNo')}
          </Text>
          <Text style={[styles.value, { color: colors.textPrimary }]}>
            #{order.orderNumber}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoColumn}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            {t('orderHistory.itemsCount')}
          </Text>
          <Text style={[styles.value, { color: colors.textPrimary }]}>
            {itemsCount}
          </Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            {t('orderHistory.deliveryAddress')}
          </Text>
          <Text
            style={[styles.value, { color: colors.textPrimary }]}
            numberOfLines={2}
          >
            {order.address}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoColumn}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            {t('orderHistory.status')}
          </Text>
          <Text style={[styles.value, { color: colors.textPrimary }]}>
            {statusLabel}
          </Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            {t('orderHistory.subtotalDelivery')}
          </Text>
          <Text style={[styles.value, { color: colors.textPrimary }]}>
            {formatPrice(order.total, locale)} /{' '}
            {Number(order.deliveryFee) === 0
              ? t('orderHistory.free')
              : formatPrice(order.deliveryFee, locale)}
          </Text>
        </View>
      </View>

      <View
        style={[styles.divider, { backgroundColor: colors.border }]}
      />
    </>
  );
};

export default OrderDetailHeader;