import React, { useCallback, useRef } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/shared/hooks/useTheme';
import { useFavorites } from '@/shared/hooks/favorites.hooks';
import { Product } from '@/shared/types/product.types';
import ScreenContainer from '@/shared/components/ScreenContainer';
import EmptyState from '@/shared/components/EmptyState';
import ProductCard from '@/features/product/components/ProductCard';
import ProductDetailSheet, {
  ProductDetailSheetRef,
} from '@/features/product/components/ProductDetailSheet';
import CompleteOrderBanner from '@/features/product/components/CompleteOrderBanner';
import { pixelWidth } from '@/shared/utils/metrics';

const FavoritesScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const sheetRef = useRef<ProductDetailSheetRef>(null);
  const { data, isPending } = useFavorites();

  const products = data?.data ?? [];

  const renderProduct = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        product={item}
        onPress={() => sheetRef.current?.open(item)}
      />
    ),
    [],
  );

  if (isPending) {
    return (
      <ScreenContainer title={t('favorites.title')}>
        <View style={styles.loader}>
          <ActivityIndicator color={colors.primary} />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer title={t('favorites.title')}>
      {products.length === 0 ? (
        <View style={styles.emptyState}>
          <EmptyState message={t('favorites.empty')} />
        </View>
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={item => String(item.id)}
          renderItem={renderProduct}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <ProductDetailSheet ref={sheetRef} />
      <CompleteOrderBanner />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: pixelWidth(90),
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default FavoritesScreen;
