import { AccountStackParamList } from '@/app/stack/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, View } from 'react-native';
import OrderHistoryItem from '../../components/OrderHistoryItem/OrderHistoryItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/shared/hooks/useTheme';
import { createStyles } from './OrderHistoryScreen.styles';
import { useOrderHistory } from '../../hooks/order-history.hooks';
import ScreenHeader from '@/shared/components/ScreenHeader';
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
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(colors);
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
      navigation.navigate('Account' as any);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title={t('orderHistory.title')} onBackPress={handleBackPress} />

      {isPending ? (
        <View style={styles.loader}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => String(item.id)}
          renderItem={props => renderOrder(props, handleOrderPress)}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<EmptyState message={t('orderHistory.empty')} />}
        />
      )}
      <OrderDetailSheet ref={detailSheetRef} />
    </SafeAreaView>

  );
};

export default OrderHistoryScreen;
