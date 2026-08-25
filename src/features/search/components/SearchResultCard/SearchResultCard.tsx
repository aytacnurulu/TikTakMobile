import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { useLocaleStore } from '@/shared/store/locale.store';
import { formatPrice } from '@/shared/utils/currency';
import { Product } from '@/shared/types/product.types';
import { styles } from './SearchResultCard.styles';

interface SearchResultCardProps {
  product: Product;
  onPress: () => void;
}

const SearchResultCard = ({ product, onPress }: SearchResultCardProps) => {
  const { colors } = useTheme();
  const locale = useLocaleStore(state => state.locale);

  return (
    <TouchableOpacity
      style={[styles.container, { borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: product.img_url }} style={styles.image} />
      <View style={styles.info}>
        <Text
          style={[styles.title, { color: colors.textPrimary }]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {product.title}
        </Text>
        <Text style={[styles.price, { color: colors.textPrimary }]}>
          {formatPrice(product.price, locale)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchResultCard;
