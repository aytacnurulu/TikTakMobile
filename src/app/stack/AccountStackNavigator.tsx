import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../../features/profile/screens/AccountScreen';
import AccountInfoScreen from '../../features/profile/screens/AccountInfoScreen';
import OrderHistoryScreen from '../../features/profile/screens/OrderHistoryScreen';
import OrderHistoryDetailScreen from '../../features/profile/screens/OrderHistoryDetailScreen';
import FavoritesScreen from '../../features/favorites/screens/FavoritesScreen';
import { AccountStackParamList } from './types';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<AccountStackParamList>();

const AccountStackNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="AccountInfo" component={AccountInfoScreen} />
        <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
        <Stack.Screen
          name="OrderHistoryDetail"
          component={OrderHistoryDetailScreen}
        />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AccountStackNavigator;
