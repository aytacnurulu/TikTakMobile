import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelWidth } from '@/shared/utils/metrics';
import { OrderHistoryItem as OrderHistoryItemType } from '@/shared/types/order.types';
import ChevronRightIcon from '@/shared/icons/chevron-right.svg';
import { createStyles } from './OrderHistoryItem.styles';

interface OrderHistoryItemProps {
  order: OrderHistoryItemType;
  onPress: () => void;
}

const OrderHistoryItem = ({ order, onPress }: OrderHistoryItemProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.left}>
        <View style={styles.column}>
          <Text style={styles.label}>No</Text>
          <Text style={styles.value}>#{order.orderNumber}</Text>
        </View>
        <View style={styles.addressColumn}>
          <Text style={styles.label}>Çatdırılma ünvanı</Text>
          <Text style={styles.addressValue} numberOfLines={1} ellipsizeMode="tail">
            {order.address}
          </Text>
        </View>
      </View>
      <ChevronRightIcon
        width={pixelWidth(16)}
        height={pixelWidth(16)}
        color={colors.textSecondary}
      />
    </TouchableOpacity>
  );
};

export default OrderHistoryItem;