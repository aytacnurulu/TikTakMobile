import { AccountStackParamList } from '@/app/stack/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, FlatList, View } from 'react-native';
import OrderHistoryItem from '../../components/OrderHistoryItem/OrderHistoryItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/shared/hooks/useTheme';
import { createStyles } from '../AccountInfoScreen/AccountInfoScreen.styles';
import { useOrderHistory } from '../../hooks/order-history.hooks';
import ScreenHeader from '@/shared/components/ScreenHeader';
import { OrderHistoryItem as OrderHistoryItemType } from '@/shared/types/order.types';
import EmptyState from '@/shared/components/EmptyState';


type Props = NativeStackScreenProps<AccountStackParamList, 'OrderHistory'>;

const renderOrder = (
  { item }: { item: OrderHistoryItemType },
  onPress: (id: number) => void,
) => <OrderHistoryItem order={item} onPress={() => onPress(item.id)} />;

const OrderHistoryScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { data, isPending } = useOrderHistory();
  const orders = data ?? [];

  const handleOrderPress = (id: number) => {
    navigation.navigate('OrderHistoryDetail' as any, { id } as any);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Sifariş tarixçəsi" onBack={() => navigation.goBack()} />
 
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
          ListEmptyComponent={<EmptyState message="Sifariş tapılmadı" />}
        />
      )}
    </SafeAreaView>

  );
};

export default OrderHistoryScreen;
