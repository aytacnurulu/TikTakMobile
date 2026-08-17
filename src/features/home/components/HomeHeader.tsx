import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList, RootStackParamList } from '../../../app/stack/types';
import { useTheme } from '../../../shared/hooks/useTheme';
import { pixelFont, pixelHeight, pixelWidth } from '../../../shared/utils/metrics';
import { useBasket } from '../../basket/hooks/basket.hooks';
import BasketIcon from '../../../shared/icons/basket.svg';

type HomeHeaderNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const HomeHeader = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<HomeHeaderNavigationProp>();
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: pixelHeight(12),
  },
  logo: {
    fontSize: pixelFont(20),
    fontWeight: '800',
    letterSpacing: 1,
  },
  basketButton: {
    padding: pixelWidth(4),
  },
  badge: {
    position: 'absolute',
    top: -pixelHeight(4),
    right: -pixelWidth(4),
    minWidth: pixelWidth(16),
    height: pixelWidth(16),
    borderRadius: pixelWidth(8),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: pixelWidth(3),
  },
  badgeText: {
    fontSize: pixelFont(10),
    fontWeight: '700',
  },
});

export default HomeHeader;
