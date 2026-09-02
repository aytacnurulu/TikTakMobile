import { AccountStackParamList } from '@/app/stack/types';
import { ACCOUNT_ROUTES } from '@/shared/constants/routes.constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import OrderHistoryItem from '../../components/OrderHistoryItem/OrderHistoryItem';
import { styles } from './OrderHistoryScreen.styles';
import { useOrderHistory } from '../../hooks/order-history.hooks';
import ScreenContainer from '@/shared/components/ScreenContainer';
import QueryStateView from '@/shared/components/QueryStateView';
import { OrderHistoryItem as OrderHistoryItemType } from '@/shared/types/order.types';
import EmptyState from '@/shared/components/EmptyState';
import { useRef } from 'react';
import OrderDetailSheet, { OrderDetailSheetRef } from '../../components/OrderDetailSheet/OrderDetailSheet';


type Props = NativeStackScreenProps<AccountStackParamList, 'OrderHistory'>;

const renderOrder = (
  { item }: { item: OrderHistoryItemType },
  onPress: (id: number) => void,
) => <OrderHistoryItem order={item} onPress={() => onPress(item.id)} />;

const OrderHistoryScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const { data, isPending } = useOrderHistory();
  const orders = data ?? [];
  const detailSheetRef = useRef<OrderDetailSheetRef>(null);


  const handleOrderPress = (id: number) => {
    const order = orders.find(o => o.id === id);
    if (order) {
      detailSheetRef.current?.open(order);
    }
  };

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(ACCOUNT_ROUTES.ACCOUNT);
    }
  };

  return (
    <ScreenContainer title={t('orderHistory.title')} onBack={handleBackPress}>
      <QueryStateView isPending={isPending}>
        <FlatList
          data={orders}
          keyExtractor={item => String(item.id)}
          renderItem={props => renderOrder(props, handleOrderPress)}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<EmptyState message={t('orderHistory.empty')} />}
        />
      </QueryStateView>
      <OrderDetailSheet ref={detailSheetRef} />
    </ScreenContainer>
  );
};

export default OrderHistoryScreen;
