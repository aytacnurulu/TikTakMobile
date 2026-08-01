import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../../features/auth/store/auth.store';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import BasketScreen from '../../features/basket/screens/BasketScreen';
import CheckoutScreen from '../../features/basket/screens/CheckoutScreen';
import OrderSuccessScreen from '../../features/basket/screens/OrderSuccessScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const token = useAuthStore(state => state.token);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <>
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen name="Basket" component={BasketScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
