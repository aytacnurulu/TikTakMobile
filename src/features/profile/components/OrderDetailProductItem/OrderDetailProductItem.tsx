import React from 'react';
import { Image, Text, View } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { useLocaleStore } from '@/shared/store/locale.store';
import { formatPrice } from '@/shared/utils/currency';
import { OrderItem } from '@/shared/types/order.types';
import { styles } from './OrderDetailProductItem.styles';

interface OrderDetailProductItemProps {
  item: OrderItem;
}

const OrderDetailProductItem = ({ item }: OrderDetailProductItemProps) => {
  const { colors } = useTheme();
  const locale = useLocaleStore(state => state.locale);

  return (
    <View style={styles.container}>
      <View
        style={[styles.imageWrapper, { backgroundColor: colors.surface }]}
      >
        <Image source={{ uri: item.product.img_url }} style={styles.image} />
      </View>
      <View style={styles.info}>
        <Text
          style={[styles.title, { color: colors.textPrimary }]}
          numberOfLines={1}
        >
          {item.product.title}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {item.quantity} {item.product.type}
        </Text>
      </View>
      <Text style={[styles.price, { color: colors.textPrimary }]}>
        {formatPrice(item.total_price, locale)}
      </Text>
    </View>
  );
};

export default OrderDetailProductItem;