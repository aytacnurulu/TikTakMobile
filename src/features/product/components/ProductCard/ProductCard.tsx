import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { useLocaleStore } from '@/shared/store/locale.store';
import { formatPrice } from '@/shared/utils/currency';
import Card from '@/shared/components/Card';
import Button from '@/shared/components/Button';
import QuantityStepper from '@/shared/components/QuantityStepper';
import {
  useAddToBasket,
  useBasket,
  useRemoveFromBasket,
} from '@/shared/hooks/basket.hooks';
import { Product } from '@/shared/types/product.types';
import { styles } from './ProductCard.styles';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

const ProductCard = ({ product, onPress }: ProductCardProps) => {
  const { colors } = useTheme();
  const locale = useLocaleStore(state => state.locale);
  const { data } = useBasket();
  const addToBasket = useAddToBasket();
  const removeFromBasket = useRemoveFromBasket();

  const basketItem = data?.data.items.find(
    item => item.product.id === product.id,
  );
  const isMutating = addToBasket.isPending || removeFromBasket.isPending;

  return (
    <Card style={styles.card}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
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
      </TouchableOpacity>

      {basketItem ? (
        <QuantityStepper
          value={basketItem.quantity}
          unit={product.type}
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

export default ProductCard;
