import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
// import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from '@/shared/hooks/useTheme';
import { useLocaleStore } from '@/shared/store/locale.store';
import { formatPrice } from '@/shared/utils/currency';
import Button from '@/shared/components/Button';
import QuantityStepper from '@/shared/components/QuantityStepper';
import FavoriteButton from '@/shared/components/FavoriteButton';
import {
  useAddToBasket,
  useBasket,
  useRemoveFromBasket,
} from '@/shared/hooks/basket.hooks';
import {
  useIsFavorite,
  useToggleFavorite,
} from '@/shared/hooks/favorites.hooks';
import { Product } from '@/shared/types/product.types';
import { styles } from './ProductDetailSheet.styles';

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
                  unit={product.type}
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

export default ProductDetailSheet;
