import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { useAuthStore } from '@/shared/store/auth.store';
import { styles } from './DeliveryAddressCard.styles';

const DeliveryAddressCard = () => {
  const { colors } = useTheme();
  const address = useAuthStore(state => state.profile?.address);

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.label, { color: colors.textPrimary }]}>
        Çatdırılma ünvanı:
      </Text>
      <Text
        style={[styles.address, { color: colors.textSecondary }]}
        numberOfLines={1}
      >
        {address}
      </Text>
    </View>
  );
};

export default DeliveryAddressCard;
