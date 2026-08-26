import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '@/features/profile/screens/AccountScreen/AccountScreen';
import AccountInfoScreen from '@/features/profile/screens/AccountInfoScreen/AccountInfoScreen';
import OrderHistoryScreen from '@/features/profile/screens/OrderHistoryScreen';
import OrderHistoryDetailScreen from '@/features/profile/screens/OrderHistoryDetailScreen';
import FavoritesScreen from '@/features/favorites/screens/FavoritesScreen';
import SettingsScreen from '@/features/settings/screens/SettingsScreen/SettingsScreen';
import { AccountStackParamList } from '@/app/stack/types';

const Stack = createNativeStackNavigator<AccountStackParamList>();

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="AccountInfo" component={AccountInfoScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Stack.Screen
        name="OrderHistoryDetail"
        component={OrderHistoryDetailScreen}
      />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default AccountStackNavigator;
