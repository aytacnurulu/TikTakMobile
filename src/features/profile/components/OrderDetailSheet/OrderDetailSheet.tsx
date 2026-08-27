import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useTheme } from '@/shared/hooks/useTheme';
import { useLocaleStore } from '@/shared/store/locale.store';
import { formatPrice } from '@/shared/utils/currency';
import { OrderHistoryItem } from '@/shared/types/order.types';
import { styles } from './OrderDetailSheet.styles';

export interface OrderDetailSheetRef {
  open: (order: OrderHistoryItem) => void;
}

const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    {...props}
    disappearsOnIndex={-1}
    appearsOnIndex={0}
    pressBehavior="close"
  />
);

const statusLabels: Record<string, string> = {
  pending: 'Sifariş qəbul edilib',
  accepted: 'Sifariş qəbul edilib',
  delivered: 'Çatdırılıb',
  cancelled: 'Ləğv edilib',
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}.${month}.${date.getFullYear()}`;
};

const OrderDetailSheet = forwardRef<OrderDetailSheetRef>((_props, ref) => {
  const { colors } = useTheme();
  const locale = useLocaleStore(state => state.locale);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [order, setOrder] = useState<OrderHistoryItem | null>(null);

  useImperativeHandle(ref, () => ({
    open: (nextOrder: OrderHistoryItem) => {
      setOrder(nextOrder);
      bottomSheetModalRef.current?.present();
    },
  }));

  const itemsCount =
    order?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

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
        {order && (
          <>
            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  Tarix
                </Text>
                <Text style={[styles.value, { color: colors.textPrimary }]}>
                  {formatDate(order.createdAt)}
                </Text>
              </View>
              <View style={styles.infoColumn}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  No
                </Text>
                <Text style={[styles.value, { color: colors.textPrimary }]}>
                  #{order.orderNumber}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  Məhsul sayı
                </Text>
                <Text style={[styles.value, { color: colors.textPrimary }]}>
                  {itemsCount}
                </Text>
              </View>
              <View style={styles.infoColumn}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  Çatdırılma ünvanı
                </Text>
                <Text
                  style={[styles.value, { color: colors.textPrimary }]}
                  numberOfLines={2}
                >
                  {order.address}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  Status
                </Text>
                <Text style={[styles.value, { color: colors.textPrimary }]}>
                  {statusLabels[order.status] ?? order.status}
                </Text>
              </View>
              <View style={styles.infoColumn}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  Subtotal/Çatdırılma
                </Text>
                <Text style={[styles.value, { color: colors.textPrimary }]}>
                  {formatPrice(order.total, locale)} /{' '}
                  {Number(order.deliveryFee) === 0
                    ? 'pulsuz'
                    : formatPrice(order.deliveryFee, locale)}
                </Text>
              </View>
            </View>

            <View
              style={[styles.divider, { backgroundColor: colors.border }]}
            />

            {order.items.map(item => (
              <View key={item.id} style={styles.productRow}>
                <View
                  style={[
                    styles.productImageWrapper,
                    { backgroundColor: colors.surface },
                  ]}
                >
                  <Image
                    source={{ uri: item.product.img_url }}
                    style={styles.productImage}
                  />
                </View>
                <View style={styles.productInfo}>
                  <Text
                    style={[styles.productTitle, { color: colors.textPrimary }]}
                    numberOfLines={1}
                  >
                    {item.product.title}
                  </Text>
                  <Text
                    style={[
                      styles.productSubtitle,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {item.quantity} {item.product.type}
                  </Text>
                </View>
                <Text
                  style={[styles.productPrice, { color: colors.textPrimary }]}
                >
                  {formatPrice(item.total_price, locale)}
                </Text>
              </View>
            ))}
          </>
        )}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

export default OrderDetailSheet;