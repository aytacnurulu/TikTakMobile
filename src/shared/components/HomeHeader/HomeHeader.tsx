import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/stack/types';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelWidth } from '@/shared/utils/metrics';
import { useBasket } from '@/shared/hooks/basket.hooks';
import BasketIcon from '@/shared/icons/basket.svg';
import { styles } from './HomeHeader.styles';

const HomeHeader = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data } = useBasket();
  const count = data?.data.count ?? 0;

  return (
    <View style={styles.container}>
      <Text style={[styles.logo, { color: colors.textPrimary }]}>TIK TAK</Text>

      <TouchableOpacity
        style={styles.basketButton}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Basket')}
      >
        <BasketIcon
          width={pixelWidth(22)}
          height={pixelWidth(22)}
          fill={colors.textPrimary}
        />
        {count > 0 && (
          <View style={[styles.badge, { backgroundColor: colors.primary }]}>
            <Text style={[styles.badgeText, { color: colors.textOnPrimary }]}>
              {count}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
