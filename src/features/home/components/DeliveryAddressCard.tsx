import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { gapVertical, pixelFont, pixelWidth } from '@/shared/utils/metrics';
import { useAuthStore } from '@/shared/store/auth.store';

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

const styles = StyleSheet.create({
  container: {
    borderRadius: pixelWidth(12),
    padding: pixelWidth(12),
    gap: gapVertical(4),
  },
  label: {
    fontSize: pixelFont(13),
    fontWeight: '700',
  },
  address: {
    fontSize: pixelFont(13),
  },
});

export default DeliveryAddressCard;
