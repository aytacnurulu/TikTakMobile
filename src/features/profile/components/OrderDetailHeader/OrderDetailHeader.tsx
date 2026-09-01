import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Locale } from '@/shared/store/locale.store';
import { formatPrice } from '@/shared/utils/currency';
import { ThemeColors } from '@/shared/constants/theme.constants';
import { OrderHistoryItem } from '@/shared/types/order.types';
import { createStyles } from './OrderDetailHeader.styles';

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
  const styles = createStyles(colors);

  const statusLabel =
    t(`orderHistory.statuses.${order.status}`, { defaultValue: order.status });

  return (
    <>
      <View style={styles.infoRow}>
        <View style={styles.infoColumn}>
          <Text style={styles.label}>{t('orderHistory.date')}</Text>
          <Text style={styles.value}>{formatDate(order.createdAt)}</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.label}>{t('orderHistory.orderNo')}</Text>
          <Text style={styles.value}>#{order.orderNumber}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoColumn}>
          <Text style={styles.label}>{t('orderHistory.itemsCount')}</Text>
          <Text style={styles.value}>{itemsCount}</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.label}>{t('orderHistory.deliveryAddress')}</Text>
          <Text style={styles.value} numberOfLines={2}>
            {order.address}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoColumn}>
          <Text style={styles.label}>{t('orderHistory.status')}</Text>
          <Text style={styles.value}>{statusLabel}</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.label}>{t('orderHistory.subtotalDelivery')}</Text>
          <Text style={styles.value}>
            {formatPrice(order.total, locale)} /{' '}
            {Number(order.deliveryFee) === 0
              ? t('orderHistory.free')
              : formatPrice(order.deliveryFee, locale)}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />
    </>
  );
};

export default OrderDetailHeader;
