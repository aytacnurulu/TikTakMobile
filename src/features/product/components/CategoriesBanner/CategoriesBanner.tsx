import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { HomeStackParamList } from '@/app/stack/types';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelWidth } from '@/shared/utils/metrics';
import GridIcon from '@/shared/icons/grid.svg';
import { styles } from './CategoriesBanner.styles';

type CategoriesBannerNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'Products'
>;

const CategoriesBanner = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<CategoriesBannerNavigationProp>();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.primary }]}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Home')}
    >
      <GridIcon
        width={pixelWidth(18)}
        height={pixelWidth(18)}
        fill={colors.textOnPrimary}
      />
      <Text style={[styles.label, { color: colors.textOnPrimary }]}>
        {t('product.browseCategories')}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoriesBanner;
