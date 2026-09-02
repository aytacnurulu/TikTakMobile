import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { Dimensions} from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { useTheme } from '@/shared/hooks/useTheme';
import { useLocaleStore } from '@/shared/store/locale.store';
import { OrderHistoryItem, OrderItem } from '@/shared/types/order.types';
import { styles } from './OrderDetailSheet.styles';
import OrderDetailProductItem from '../OrderDetailProductItem/OrderDetailProductItem';
import OrderDetailHeader from '../OrderDetailHeader/OrderDetailHeader';

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

  const renderItem = useCallback(
    ({ item, index }: { item: OrderItem; index: number }) => (
      <OrderDetailProductItem
        item={item}
        isLast={index === (order?.items.length ?? 0) - 1}
      />
    ),
    [order],
  );

  const keyExtractor = useCallback((item: OrderItem) => String(item.id), []);

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
      <BottomSheetFlatList
        data={order?.items ?? []}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={
          order ? (
            <OrderDetailHeader
              order={order}
              itemsCount={itemsCount}
              colors={colors}
              locale={locale}
            />
          ) : null
        }
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheetModal>
  );
});

export default OrderDetailSheet;