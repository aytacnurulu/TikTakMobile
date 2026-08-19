import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/stack/types';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';
import { formatPrice } from '@/shared/utils/currency';
import { useLocaleStore } from '@/features/settings/store/locale.store';
import { useBasket } from '@/features/basket/hooks/basket.hooks';

const CompleteOrderBanner = () => {
  const { colors } = useTheme();
  const locale = useLocaleStore(state => state.locale);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data } = useBasket();

  const items = data?.data.items ?? [];
  const count = data?.data.count ?? 0;

  if (count === 0) {
    return null;
  }

  const totalPrice = items.reduce(
    (sum, item) => sum + Number(item.total_price),
    0,
  );

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.primary, shadowColor: colors.textPrimary },
      ]}
      activeOpacity={0.85}
      onPress={() => navigation.navigate('Basket')}
    >
      <View style={styles.left}>
        <View style={[styles.badge, { backgroundColor: colors.textOnPrimary }]}>
          <Text style={[styles.badgeText, { color: colors.primary }]}>
            {count}
          </Text>
        </View>
        <Text style={[styles.label, { color: colors.textOnPrimary }]}>
          Sifarişlər
        </Text>
      </View>
      <Text style={[styles.price, { color: colors.textOnPrimary }]}>
        {formatPrice(String(totalPrice), locale)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: pixelWidth(16),
    right: pixelWidth(16),
    bottom: pixelHeight(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: pixelHeight(12),
    paddingHorizontal: pixelWidth(16),
    borderRadius: pixelWidth(12),
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    height: pixelHeight(48),

  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: pixelWidth(10),
  },
  badge: {
    width: pixelWidth(24),
    height: pixelWidth(24),
    borderRadius: pixelWidth(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: pixelFont(13),
    fontWeight: '700',
  },
  label: {
    fontSize: pixelFont(15),
    fontWeight: '700',
  },
  price: {
    fontSize: pixelFont(15),
    fontWeight: '700',
  },
});

export default CompleteOrderBanner;
