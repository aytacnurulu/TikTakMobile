import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../../product/types/product.types';
import { pixelFont, pixelHeight, pixelWidth } from '../../../shared/utils/metrics';

interface SearchResultItemProps {
  product: Product;
  onPress?: (product: Product) => void;
}

const SearchResultItem = ({ product, onPress }: SearchResultItemProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => onPress?.(product)}>
      {product.img_url ? (
        <Image source={{ uri: product.img_url }} style={styles.image} />
      ) : (
        <View style={styles.imageFallback}>
          <Text style={styles.imageFallbackText}>🍎</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>{product.price} AZN</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: pixelHeight(10),
  },
  image: {
    width: pixelWidth(44),
    height: pixelWidth(44),
    borderRadius: pixelWidth(10),
    backgroundColor: '#F2F3F7',
  },
  imageFallback: {
    width: pixelWidth(44),
    height: pixelWidth(44),
    borderRadius: pixelWidth(10),
    backgroundColor: '#F2F3F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageFallbackText: {
    fontSize: pixelFont(20),
  },
  info: {
    marginLeft: pixelWidth(12),
    flex: 1,
  },
  title: {
    fontSize: pixelFont(13),
    fontWeight: '500',
    color: '#1A1A1A',
  },
  price: {
    fontSize: pixelFont(12),
    color: '#8A8A8A',
    marginTop: pixelHeight(2),
  },
});

export default SearchResultItem;
