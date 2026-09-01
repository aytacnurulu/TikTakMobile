import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/stack/types';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelWidth } from '@/shared/utils/metrics';
import { useBasket } from '@/shared/hooks/basket.hooks';
import BasketIcon from '@/shared/icons/basket.svg';
import { createStyles } from './HomeHeader.styles';

const HomeHeader = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data } = useBasket();
  const count = data?.data.count ?? 0;

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>TIK TAK</Text>

      <TouchableOpacity
        style={styles.basketButton}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Basket')}
      >
        <BasketIcon
          width={pixelWidth(22)}
          height={pixelWidth(22)}
          color={colors.textPrimary}
        />
        {count > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
