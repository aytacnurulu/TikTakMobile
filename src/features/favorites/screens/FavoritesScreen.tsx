import React, { useCallback, useRef } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '@/shared/hooks/favorites.hooks';
import { Product } from '@/shared/types/product.types';
import ScreenContainer from '@/shared/components/ScreenContainer';
import QueryStateView from '@/shared/components/QueryStateView';
import ProductCard from '@/features/product/components/ProductCard';
import ProductDetailSheet, {
  ProductDetailSheetRef,
} from '@/features/product/components/ProductDetailSheet';
import CompleteOrderBanner from '@/features/product/components/CompleteOrderBanner';
import { pixelWidth } from '@/shared/utils/metrics';

const FavoritesScreen = () => {
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

  return (
    <ScreenContainer title={t('favorites.title')}>
      <QueryStateView
        isPending={isPending}
        isEmpty={products.length === 0}
        emptyMessage={t('favorites.empty')}
      >
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={item => String(item.id)}
          renderItem={renderProduct}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </QueryStateView>

      <ProductDetailSheet ref={sheetRef} />
      <CompleteOrderBanner />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: pixelWidth(90),
  },
});

export default FavoritesScreen;
