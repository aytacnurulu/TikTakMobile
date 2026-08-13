import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useProducts } from '../../product/hooks/product.hooks';
import { Product } from '../../product/types/product.types';
import SearchResultItem from '../components/SearchResultItem';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { pixelFont, pixelHeight, pixelWidth } from '../../../shared/utils/metrics';
import SearchIcon from '../../../shared/icons/search.svg';
import BasketIcon from '../../../shared/icons/basket.svg';
import { MainTabParamList, RootStackParamList } from '../../../app/stack/types';

type SearchScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'SearchTab'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const MIN_QUERY_LENGTH = 2;

const SearchScreen = () => {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const q = debouncedQuery.trim();
  const isSearching = q.length >= MIN_QUERY_LENGTH;

  // Backend supports server-side filtering (`?search=`), so we send the
  // debounced term straight to the API instead of filtering a full list
  // client-side.
  const { data: results = [], isLoading } = useProducts(
    { search: q },
    isSearching,
  );

  const handleProductPress = (product: Product) => {
    // TODO: navigate to product detail once ProductDetailSheet is built
    console.log('open product', product.id);
  };

  const renderEmptyState = () => {
    if (!isSearching) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            Axtarmaq istədiyiniz məhsulun adını yazın
          </Text>
        </View>
      );
    }

    if (isLoading) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Yüklənir...</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>Nəticə tapılmadı</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TIK TAK</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Basket')}>
          <BasketIcon width={pixelWidth(20)} height={pixelWidth(22)} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBox}>
        <SearchIcon width={pixelWidth(16)} height={pixelWidth(16)} />
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder="Axtar"
          placeholderTextColor="#9AA0A6"
          autoCapitalize="none"
          returnKeyType="search"
        />
      </View>

      <FlatList
        data={results}
        keyExtractor={item => String(item.id)}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
        renderItem={({ item }) => (
          <SearchResultItem product={item} onPress={handleProductPress} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: pixelWidth(20),
    paddingTop: pixelHeight(8),
    paddingBottom: pixelHeight(12),
  },
  headerTitle: {
    fontSize: pixelFont(18),
    fontWeight: '700',
    letterSpacing: 0.5,
    color: '#1A1A1A',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: pixelWidth(20),
    backgroundColor: '#F2F3F7',
    borderRadius: pixelWidth(10),
    paddingHorizontal: pixelWidth(14),
    height: pixelHeight(44),
  },
  searchInput: {
    flex: 1,
    marginLeft: pixelWidth(8),
    fontSize: pixelFont(14),
    color: '#1A1A1A',
    padding: 0,
  },
  listContent: {
    paddingHorizontal: pixelWidth(20),
    paddingTop: pixelHeight(16),
    flexGrow: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: pixelHeight(60),
  },
  emptyStateText: {
    fontSize: pixelFont(13),
    color: '#9AA0A6',
  },
});

export default SearchScreen;
