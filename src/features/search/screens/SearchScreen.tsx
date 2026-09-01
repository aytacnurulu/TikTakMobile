import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/shared/hooks/useTheme';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import { pixelWidth } from '@/shared/utils/metrics';
import EmptyState from '@/shared/components/EmptyState';
import QueryStateView from '@/shared/components/QueryStateView';
import HomeHeader from '@/shared/components/HomeHeader';
import SearchBar from '@/features/search/components/SearchBar';
import SearchResultCard from '@/features/search/components/SearchResultCard';
import { useSearchProducts } from '@/features/search/hooks/search.hooks';
import ProductDetailSheet, {
  ProductDetailSheetRef,
} from '@/features/product/components/ProductDetailSheet';
import { Product } from '@/shared/types/product.types';

const SearchScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query);
  const sheetRef = useRef<ProductDetailSheetRef>(null);

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useSearchProducts(debouncedQuery);
  const products = data?.pages.flatMap(page => page.data) ?? [];

  const renderProduct = useCallback(
    ({ item }: { item: Product }) => (
      <SearchResultCard product={item} onPress={() => sheetRef.current?.open(item)} />
    ),
    [],
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <HomeHeader />
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder={t('search.placeholder')}
      />

      {debouncedQuery.length === 0 ? (
        <EmptyState message={t('search.prompt')} icon={null} />
      ) : (
        <QueryStateView isPending={isFetching && !isFetchingNextPage}>
          <FlatList
            data={products}
            keyExtractor={item => String(item.id)}
            renderItem={renderProduct}
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
        </QueryStateView>
      )}

      <ProductDetailSheet ref={sheetRef} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: pixelWidth(16),
  },
  listContent: {
    paddingBottom: pixelWidth(90),
  },
  footerLoader: {
    marginVertical: pixelWidth(16),
  },
});

export default SearchScreen;
