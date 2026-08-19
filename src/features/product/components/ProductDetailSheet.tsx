import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
// import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
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
import {
  useIsFavorite,
  useToggleFavorite,
} from '@/features/favorites/hooks/favorites.hooks';
import { Product } from '@/features/product/types/product.types';

export interface ProductDetailSheetRef {
  open: (product: Product) => void;
}

const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    {...props}
    disappearsOnIndex={-1}
    appearsOnIndex={0}
    pressBehavior="close"
  />
);

const ProductDetailSheet = forwardRef<ProductDetailSheetRef>((_props, ref) => {
  const { colors } = useTheme();
  const locale = useLocaleStore(state => state.locale);
  // const tabBarHeight = useBottomTabBarHeight();
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

  const basketItem = data?.data.items.find(
    item => item.product.id === product?.id,
  );
  const isMutating = addToBasket.isPending || removeFromBasket.isPending;

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      enableDynamicSizing
      maxDynamicContentSize={Dimensions.get('window').height * 0.85}
      enablePanDownToClose
      bottomInset={0}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: colors.background }}
      handleIndicatorStyle={[
        styles.handleIndicator,
        { backgroundColor: colors.textPlaceholder },
      ]}
      containerStyle={styles.sheetContainer}
    >
      <BottomSheetScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {product && (
          <>
            <FavoriteButton
              isFavorite={isFavorite}
              onToggle={() => toggleFavorite.mutate(product)}
              size={22}
              style={{
                ...styles.favoriteButton,
                backgroundColor: colors.surface,
                shadowColor: colors.textPrimary,
              }}
            />
            <View
              style={[styles.imageWrapper, { backgroundColor: colors.surface }]}
            >
              <Image source={{ uri: product.img_url }} style={styles.image} />
            </View>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              {product.title}
            </Text>
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
                  style={styles.addButton}
                />
              )}
            </View>
          </>
        )}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  sheetContainer: {
    zIndex: 1000,
    elevation: 1000,
  },
  handleIndicator: {
    width: pixelWidth(40),
    height: pixelHeight(5),
  },
  content: {
    paddingHorizontal: pixelWidth(20),
    paddingTop: pixelHeight(4),
    paddingBottom: pixelHeight(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButton: {
    alignSelf: 'flex-end',
    marginBottom: pixelHeight(8),
    width: pixelWidth(38),
    height: pixelWidth(38),
    borderRadius: pixelWidth(19),
    padding: pixelWidth(8),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
    
  },
  imageWrapper: {
    width: pixelWidth(180),
    height: pixelWidth(180),
    borderRadius: pixelWidth(16),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    marginTop: pixelHeight(20),
    fontSize: pixelFont(18),
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    marginTop: pixelHeight(10),
    fontSize: pixelFont(14),
    textAlign: 'center',
  },
  price: {
    marginTop: pixelHeight(20),
    fontSize: pixelFont(22),
    fontWeight: '700',
  },
  action: {
    width: '100%',
    marginTop: pixelHeight(24),
    alignItems: 'center',
  },
  actionInner: {
    width: pixelWidth(243),
    height: pixelHeight(52),
    marginBottom: pixelHeight(42),

  },
  addButton: {
    width: pixelWidth(243),
    height: pixelHeight(52),
    marginBottom: pixelHeight(42),
  },
});

export default ProductDetailSheet;
