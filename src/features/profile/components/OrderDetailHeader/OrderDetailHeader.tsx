import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { Locale } from '@/shared/store/locale.store';
import { formatPrice } from '@/shared/utils/currency';
import { OrderHistoryItem } from '@/shared/types/order.types';
import { styles as sheetStyles } from './OrderDetailSheet.styles';
import { styles } from './OrderDetailHeader.styles';


type ThemeColors = ReturnType<typeof useTheme>['colors'];

const statusLabels: Record<string, string> = {
  pending: 'Sifariş qəbul edilib',
  accepted: 'Sifariş qəbul edilib',
  delivered: 'Çatdırılıb',
  cancelled: 'Ləğv edilib',
};

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
  return (
    <>
      <View style={styles.infoRow}>
        <View style={styles.infoColumn}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            Tarix
          </Text>
          <Text style={[styles.value, { color: colors.textPrimary }]}>
            {formatDate(order.createdAt)}
          </Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            No
          </Text>
          <Text style={[styles.value, { color: colors.textPrimary }]}>
            #{order.orderNumber}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoColumn}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            Məhsul sayı
          </Text>
          <Text style={[styles.value, { color: colors.textPrimary }]}>
            {itemsCount}
          </Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            Çatdırılma ünvanı
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
            Status
          </Text>
          <Text style={[styles.value, { color: colors.textPrimary }]}>
            {statusLabels[order.status] ?? order.status}
          </Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            Subtotal/Çatdırılma
          </Text>
          <Text style={[styles.value, { color: colors.textPrimary }]}>
            {formatPrice(order.total, locale)} /{' '}
            {Number(order.deliveryFee) === 0
              ? 'pulsuz'
              : formatPrice(order.deliveryFee, locale)}
          </Text>
        </View>
      </View>

      <View
        style={[sheetStyles.divider, { backgroundColor: colors.border }]}
      />
    </>
  );
};

export default OrderDetailHeader;