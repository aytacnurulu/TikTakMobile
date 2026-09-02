import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '@/app/stack/types';
import { ROOT_ROUTES } from '@/shared/constants/routes.constants';
import { useTheme } from '@/shared/hooks/useTheme';
import { formatPrice } from '@/shared/utils/currency';
import { useLocaleStore } from '@/shared/store/locale.store';
import { useBasket } from '@/shared/hooks/basket.hooks';
import { createStyles } from './CompleteOrderBanner.styles';

const CompleteOrderBanner = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation();
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
      style={styles.container}
      activeOpacity={0.85}
      onPress={() => navigation.navigate(ROOT_ROUTES.BASKET)}
    >
      <View style={styles.left}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
        <Text style={styles.label}>{t('basket.orders')}</Text>
      </View>
      <Text style={styles.price}>
        {formatPrice(String(totalPrice), locale)}
      </Text>
    </TouchableOpacity>
  );
};

export default CompleteOrderBanner;
