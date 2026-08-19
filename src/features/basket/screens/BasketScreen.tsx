import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/app/stack/types';
import ScreenHeader from '@/shared/components/ScreenHeader';
import QuantityStepper from '@/shared/components/QuantityStepper';
import Button from '@/shared/components/Button';
import EmptyState from '@/shared/components/EmptyState';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';
import { formatPrice } from '@/shared/utils/currency';
import { useLocaleStore } from '@/features/settings/store/locale.store';
import {
  useAddToBasket,
  useBasket,
  useRemoveFromBasket,
} from '@/features/basket/hooks/basket.hooks';
import { BasketItem } from '@/features/basket/types/basket.types';

const BasketScreen = () => {
  const { colors } = useTheme();
  const locale = useLocaleStore(state => state.locale);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data, isPending, isFetching, isError, refetch } = useBasket();
  const addToBasket = useAddToBasket();
  const removeFromBasket = useRemoveFromBasket();
  const items = data?.data.items ?? [];
  const total = data?.data.total ?? '0';
  const isMutating = addToBasket.isPending || removeFromBasket.isPending;

  const renderItem = ({ item }: { item: BasketItem }) => (
    <View style={[styles.item, { borderBottomColor: colors.border }]}>
      <Image
        source={{ uri: item.product.img_url }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text
          style={[styles.productTitle, { color: colors.textPrimary }]}
          numberOfLines={2}
        >
          {item.product.title}
        </Text>
        <Text style={[styles.productPrice, { color: colors.textSecondary }]}>
          {formatPrice(item.product.price, locale)}
        </Text>
      </View>
      <QuantityStepper
        value={item.quantity}
        onIncrement={() => addToBasket.mutate({ product: item.product })}
        onDecrement={() =>
          removeFromBasket.mutate({
            productId: item.product.id,
            removeAll: item.quantity <= 1,
          })
        }
        style={styles.stepper}
      />
    </View>
  );

  if (isPending) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <ScreenHeader title="Səbətim" onBackPress={() => navigation.goBack()} />
        <View style={styles.loader}>
          <ActivityIndicator color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <ScreenHeader title="Səbətim" onBackPress={() => navigation.goBack()} />
        <EmptyState message="Səbət yüklənmədi" />
        <Button
          title="Yenidən yoxla"
          onPress={() => refetch()}
          style={styles.retryButton}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScreenHeader title="Səbətim" onBackPress={() => navigation.goBack()} />
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <EmptyState message="Səbətinizdə məhsul yoxdur" />
        </View>
      ) : (
        <View style={styles.content}>
          <FlatList
            data={items}
            keyExtractor={item => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={refetch}
                tintColor={colors.primary}
              />
            }
          />
          <View style={[styles.summary, { borderTopColor: colors.border }]}>
            <View>
              <Text style={[styles.summaryText, { color: colors.textPrimary }]}>
                Ümumi: {formatPrice(total, locale)}
              </Text>
              <Text style={[styles.summaryText, { color: colors.textPrimary }]}>
                Çatdırılma: Pulsuz
              </Text>
            </View>
            <View style={styles.totalBlock}>
              <Text style={[styles.totalLabel, { color: colors.textPrimary }]}>
                Yekun məbləğ:
              </Text>
              <Text style={[styles.totalValue, { color: colors.textPrimary }]}>
                {formatPrice(total, locale)}
              </Text>
            </View>
          </View>
          <Button
            title="Sifarişi tamamla"
            onPress={() => navigation.navigate('Checkout')}
            disabled={isMutating}
            style={styles.checkoutButton}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: pixelWidth(16),
  },
  content: {
    flex: 1,
  },
  listContent: {
    paddingTop: pixelHeight(18),
    paddingBottom: pixelHeight(12),
  },
  item: {
    minHeight: pixelHeight(80),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: pixelHeight(10),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  productImage: {
    width: pixelWidth(58),
    height: pixelWidth(58),
    borderRadius: pixelWidth(12),
    marginRight: pixelWidth(12),
  },
  productInfo: {
    flex: 1,
    alignSelf: 'center',
  },
  productTitle: {
    fontSize: pixelFont(14),
    fontWeight: '700',
    lineHeight: pixelFont(18),
  },
  productPrice: {
    marginTop: pixelHeight(3),
    fontSize: pixelFont(13),
  },
  stepper: {
    width: pixelWidth(104),
    height: pixelHeight(36),
    gap: pixelWidth(5),
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: pixelHeight(14),
    marginTop: 'auto',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  summaryText: {
    fontSize: pixelFont(12),
    lineHeight: pixelFont(18),
  },
  totalBlock: {
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: pixelFont(13),
    fontWeight: '700',
  },
  totalValue: {
    marginTop: pixelHeight(2),
    fontSize: pixelFont(14),
    fontWeight: '800',
  },
  checkoutButton: {
    marginTop: pixelHeight(14),
    marginBottom: pixelHeight(10),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: pixelHeight(80),
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryButton: {
    marginBottom: pixelHeight(16),
  },
});

export default BasketScreen;
