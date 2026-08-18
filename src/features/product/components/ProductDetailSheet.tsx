import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useTheme } from '@/shared/hooks/useTheme';
import { useLocaleStore } from '@/features/settings/store/locale.store';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';
import { formatPrice } from '@/shared/utils/currency';
import Button from '@/shared/components/Button';
import QuantityStepper from '@/shared/components/QuantityStepper';
import FavoriteButton from '@/shared/components/FavoriteButton';
import {
  useAddToBasket,
  useBasket,
  useRemoveFromBasket,
} from '@/features/basket/hooks/basket.hooks';
import { useIsFavorite, useToggleFavorite } from '@/features/favorites/hooks/favorites.hooks';
import { Product } from '@/features/product/types/product.types';

export interface ProductDetailSheetRef {
  open: (product: Product) => void;
}

const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior="close" />
);

const ProductDetailSheet = forwardRef<ProductDetailSheetRef>((_props, ref) => {
  const { colors } = useTheme();
  const locale = useLocaleStore(state => state.locale);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [product, setProduct] = useState<Product | null>(null);

  const { data } = useBasket();
  const addToBasket = useAddToBasket();
  const removeFromBasket = useRemoveFromBasket();
  const isFavorite = useIsFavorite(product?.id ?? -1);
  const toggleFavorite = useToggleFavorite();

  useImperativeHandle(ref, () => ({
    open: (nextProduct: Product) => {
      setProduct(nextProduct);
      bottomSheetModalRef.current?.present();
    },
  }));

  const basketItem = data?.data.items.find(item => item.product.id === product?.id);
  const isMutating = addToBasket.isPending || removeFromBasket.isPending;

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      enableDynamicSizing
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: colors.background }}
      handleIndicatorStyle={{ backgroundColor: colors.border }}
    >
      <BottomSheetView style={styles.content}>
        {product && (
          <>
            <FavoriteButton
              isFavorite={isFavorite}
              onToggle={() => toggleFavorite.mutate(product.id)}
              size={22}
              style={styles.favoriteButton}
            />
            <Image source={{ uri: product.img_url }} style={styles.image} />
            <Text style={[styles.title, { color: colors.textPrimary }]}>{product.title}</Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              {product.description}
            </Text>
            <Text style={[styles.price, { color: colors.textPrimary }]}>
              {formatPrice(product.price, locale)}
            </Text>

            <View style={styles.action}>
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
                  style={styles.actionInner}
                />
              ) : (
                <Button
                  title="Səbətə əlavə et"
                  onPress={() => addToBasket.mutate({ product })}
                  loading={isMutating}
                  style={styles.actionInner}
                />
              )}
            </View>
          </>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: pixelWidth(20),
    paddingBottom: pixelHeight(24),
    alignItems: 'center',
  },
  favoriteButton: {
    alignSelf: 'flex-end',
    marginBottom: pixelHeight(4),
  },
  image: {
    width: pixelWidth(180),
    height: pixelWidth(180),
    resizeMode: 'contain',
  },
  title: {
    marginTop: pixelHeight(16),
    fontSize: pixelFont(18),
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    marginTop: pixelHeight(8),
    fontSize: pixelFont(14),
    textAlign: 'center',
  },
  price: {
    marginTop: pixelHeight(16),
    fontSize: pixelFont(22),
    fontWeight: '700',
  },
  action: {
    width: '100%',
    marginTop: pixelHeight(20),
  },
  actionInner: {
    width: '100%',
    height: pixelHeight(52),
  },
});

export default ProductDetailSheet;
