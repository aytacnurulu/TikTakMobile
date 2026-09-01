import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelWidth } from '@/shared/utils/metrics';
import EmptyState from '@/shared/components/EmptyState';
import QueryStateView from '@/shared/components/QueryStateView';
import { useCategories } from '@/shared/hooks/category.hooks';
import { Category } from '@/shared/types/category.type';
import HomeHeader from '@/shared/components/HomeHeader';
import DeliveryAddressCard from '@/features/home/components/DeliveryAddressCard';
import PromoBanner from '@/features/home/components/PromoBanner';
import CategoryCard from '@/features/home/components/CategoryCard';

const renderCategory = ({ item }: { item: Category }) => (
  <CategoryCard category={item} />
);

const ListHeader = () => (
  <>
    <HomeHeader />
    <DeliveryAddressCard />
    <PromoBanner />
  </>
);

const HomeScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { data, isPending } = useCategories();
  const categories = data?.data ?? [];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <QueryStateView isPending={isPending}>
        <FlatList
          data={categories}
          numColumns={3}
          keyExtractor={item => String(item.id)}
          renderItem={renderCategory}
          ListHeaderComponent={ListHeader}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <EmptyState message={t('home.categoriesEmpty')} />
          }
        />
      </QueryStateView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: pixelWidth(16),
  },
  listContent: {
    paddingBottom: pixelWidth(16),
  },
});

export default HomeScreen;
