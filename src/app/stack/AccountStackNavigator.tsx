import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '@/features/profile/screens/AccountScreen/AccountScreen';
import AccountInfoScreen from '@/features/profile/screens/AccountInfoScreen/AccountInfoScreen';
import OrderHistoryScreen from '@/features/profile/screens/OrderHistoryScreen/OrderHistoryScreen';
import FavoritesScreen from '@/features/favorites/screens/FavoritesScreen';
import SettingsScreen from '@/features/settings/screens/SettingsScreen/SettingsScreen';
import { AccountStackParamList } from '@/app/stack/types';
import { ACCOUNT_ROUTES } from '@/shared/constants/routes.constants';

const Stack = createNativeStackNavigator<AccountStackParamList>();

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ACCOUNT_ROUTES.ACCOUNT} component={AccountScreen} />
      <Stack.Screen name={ACCOUNT_ROUTES.ACCOUNT_INFO} component={AccountInfoScreen} />
      <Stack.Screen name={ACCOUNT_ROUTES.ORDER_HISTORY} component={OrderHistoryScreen} />
      <Stack.Screen name={ACCOUNT_ROUTES.FAVORITES} component={FavoritesScreen} />
      <Stack.Screen name={ACCOUNT_ROUTES.SETTINGS} component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default AccountStackNavigator;
