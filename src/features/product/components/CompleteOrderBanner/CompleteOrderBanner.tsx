import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/stack/types';
import { useTheme } from '@/shared/hooks/useTheme';
import { formatPrice } from '@/shared/utils/currency';
import { useLocaleStore } from '@/shared/store/locale.store';
import { useBasket } from '@/shared/hooks/basket.hooks';
import { styles } from './CompleteOrderBanner.styles';

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

export default CompleteOrderBanner;
