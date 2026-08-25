import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { useLocaleStore } from '@/shared/store/locale.store';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';
import { formatPrice } from '@/shared/utils/currency';
import { Product } from '@/shared/types/product.types';

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: pixelHeight(10),
    borderBottomWidth: 1,
  },
  image: {
    width: pixelWidth(48),
    height: pixelWidth(48),
    borderRadius: pixelWidth(10),
    resizeMode: 'contain',
    marginRight: pixelWidth(12),
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: pixelFont(13),
    fontWeight: '600',
  },
  price: {
    marginTop: pixelHeight(2),
    fontSize: pixelFont(13),
    fontWeight: '700',
  },
});

export default SearchResultCard;
