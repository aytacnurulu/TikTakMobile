import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { useLocaleStore } from '@/features/settings/store/locale.store';
import { deviceWidth, pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';
import { formatPrice } from '@/shared/utils/currency';
import Card from '@/shared/components/Card';
import Button from '@/shared/components/Button';
import QuantityStepper from '@/shared/components/QuantityStepper';
import {
  useAddToBasket,
  useBasket,
  useRemoveFromBasket,
} from '@/features/basket/hooks/basket.hooks';
import { Product } from '@/features/product/types/product.types';

interface ProductCardProps {
  product: Product;
}

// Fixed 2-column grid: screen padding (16) on each edge + card margin (6) on
// all 4 card edges across the row. A flex:1 card would stretch to fill the
// row when the last row has an odd item out, so width must be computed, not flexible.
const SCREEN_PADDING = pixelWidth(16);
const CARD_MARGIN = pixelWidth(6);
const CARD_WIDTH = (deviceWidth - SCREEN_PADDING * 2 - CARD_MARGIN * 4) / 2;
const CARD_HEIGHT = pixelHeight(260);
// Add-to-basket Button and QuantityStepper swap in the same slot, so they
// share one fixed size — otherwise the row's height/width shifts when one
// replaces the other.
const ACTION_HEIGHT = pixelHeight(38);

const ProductCard = ({ product }: ProductCardProps) => {
  const { colors } = useTheme();
  const locale = useLocaleStore(state => state.locale);
  const { data } = useBasket();
  const addToBasket = useAddToBasket();
  const removeFromBasket = useRemoveFromBasket();

  const basketItem = data?.data.items.find(item => item.product.id === product.id);
  const isMutating = addToBasket.isPending || removeFromBasket.isPending;

  return (
    <Card style={styles.card}>
      <Image source={{ uri: product.img_url }} style={styles.image} />
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

      {basketItem ? (
        <QuantityStepper
          value={basketItem.quantity}
          onIncrement={() => addToBasket.mutate({ product })}
          onDecrement={() =>
            removeFromBasket.mutate({
              productId: product.id,
              removeAll: basketItem.quantity <= 1,
            })
          }
          style={styles.action}
        />
      ) : (
        <Button
          title="Səbətə əlavə et"
          onPress={() => addToBasket.mutate({ product })}
          loading={isMutating}
          style={styles.action}
        />
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    margin: CARD_MARGIN,
  },
  image: {
    width: '100%',
    height: pixelWidth(120),
    borderRadius: pixelWidth(10),
    resizeMode: 'cover',
  },
  title: {
    height: pixelHeight(34),
    marginTop: pixelHeight(8),
    fontSize: pixelFont(13),
    fontWeight: '600',
  },
  price: {
    marginTop: pixelHeight(4),
    marginBottom: pixelHeight(8),
    fontSize: pixelFont(14),
    fontWeight: '700',
  },
  action: {
    width: '100%',
    height: ACTION_HEIGHT,
    paddingVertical: 0,
  },
});

export default ProductCard;
