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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '@/app/stack/types';
import ScreenContainer from '@/shared/components/ScreenContainer';
import QuantityStepper from '@/shared/components/QuantityStepper';
import Button from '@/shared/components/Button';
import EmptyState from '@/shared/components/EmptyState';
import OrderSummary from '@/shared/components/OrderSummary';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';
import { formatPrice } from '@/shared/utils/currency';
import { useLocaleStore } from '@/shared/store/locale.store';
import {
  useAddToBasket,
  useBasket,
  useRemoveFromBasket,
} from '@/shared/hooks/basket.hooks';
import { BasketItem } from '@/shared/types/basket.types';

const BasketScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
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
      <ScreenContainer title={t('basket.title')}>
        <View style={styles.loader}>
          <ActivityIndicator color={colors.primary} />
        </View>
      </ScreenContainer>
    );
  }

  if (isError) {
    return (
      <ScreenContainer title={t('basket.title')}>
        <EmptyState message={t('basket.loadError')} />
        <Button
          title={t('common.retry')}
          onPress={() => refetch()}
          style={styles.retryButton}
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer title={t('basket.title')}>
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <EmptyState message={t('basket.empty')} />
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
          <OrderSummary total={total} divider style={styles.summary} />
          <Button
            title={t('basket.checkout')}
            onPress={() => navigation.navigate('Checkout')}
            disabled={isMutating}
            style={styles.checkoutButton}
          />
        </View>
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 'auto',
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
