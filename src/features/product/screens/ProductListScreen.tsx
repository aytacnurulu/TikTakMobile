import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { HomeStackParamList } from '@/app/stack/types';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelWidth } from '@/shared/utils/metrics';
import EmptyState from '@/shared/components/EmptyState';
import HomeHeader from '@/shared/components/HomeHeader';
import { useProducts } from '@/features/product/hooks/product.hooks';
import { Product } from '@/shared/types/product.types';
import { Category } from '@/shared/types/category.type';
import ProductCard from '@/features/product/components/ProductCard';
import ProductDetailSheet, {
  ProductDetailSheetRef,
} from '@/features/product/components/ProductDetailSheet';
import CategoriesBanner from '@/features/product/components/CategoriesBanner';
import CategoryChips from '@/features/product/components/CategoryChips';
import CompleteOrderBanner from '@/features/product/components/CompleteOrderBanner';

type ProductListScreenRouteProp = RouteProp<HomeStackParamList, 'Products'>;

const ProductListScreen = () => {
  const { params } = useRoute<ProductListScreenRouteProp>();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<Pick<Category, 'id' | 'name'>>({
    id: params.categoryId,
    name: params.categoryName,
  });
  const sheetRef = useRef<ProductDetailSheetRef>(null);

  const { data, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } = useProducts(
    selectedCategory.id,
  );
  const products = data?.pages.flatMap(page => page.data) ?? [];

  const renderProduct = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard product={item} onPress={() => sheetRef.current?.open(item)} />
    ),
    [],
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <HomeHeader />
      <CategoriesBanner />
      <CategoryChips
        selectedCategoryId={selectedCategory.id}
        onSelect={category => setSelectedCategory(category)}
      />

      {isPending ? (
        <View style={styles.loader}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={item => String(item.id)}
          renderItem={renderProduct}
          style={styles.productsList}
          contentContainerStyle={styles.listContent}
          onEndReached={() => hasNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={<EmptyState message={t('product.empty')} />}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator style={styles.footerLoader} color={colors.primary} />
            ) : null
          }
        />
      )}

      <ProductDetailSheet ref={sheetRef} />
      <CompleteOrderBanner />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: pixelWidth(16),
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productsList: {
    flex: 1,
  },
  listContent: {
    paddingBottom: pixelWidth(90),
  },
  footerLoader: {
    marginVertical: pixelWidth(16),
  },
});

export default ProductListScreen;
