import React, { useCallback, useRef } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AccountStackParamList } from '@/app/stack/types';
import { useTheme } from '@/shared/hooks/useTheme';
import { useFavorites } from '@/shared/hooks/favorites.hooks';
import { Product } from '@/shared/types/product.types';
import ScreenHeader from '@/shared/components/ScreenHeader';
import EmptyState from '@/shared/components/EmptyState';
import ProductCard from '@/features/product/components/ProductCard';
import ProductDetailSheet, {
  ProductDetailSheetRef,
} from '@/features/product/components/ProductDetailSheet';
import CompleteOrderBanner from '@/features/product/components/CompleteOrderBanner';
import { pixelWidth } from '@/shared/utils/metrics';

const FavoritesScreen = () => {
  const { colors } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<AccountStackParamList>>();
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
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <ScreenHeader
          title="Siyahılarım"
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.loader}>
          <ActivityIndicator color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScreenHeader
        title="Siyahılarım"
        onBackPress={() => navigation.goBack()}
      />

      {products.length === 0 ? (
        <View style={styles.emptyState}>
          <EmptyState message="Siyahıda məhsul yoxdur" />
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
  listContent: {
    paddingBottom: pixelWidth(90),
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default FavoritesScreen;
