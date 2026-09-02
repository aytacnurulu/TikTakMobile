import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '@/shared/store/auth.store';
import AuthNavigator from '@/app/stack/AuthNavigator';
import MainTabNavigator from '@/app/stack/MainTabNavigator';
import BasketScreen from '@/features/basket/screens/BasketScreen';
import CheckoutScreen from '@/features/basket/screens/CheckoutScreen';
import OrderSuccessScreen from '@/features/basket/screens/OrderSuccessScreen';
import { RootStackParamList } from '@/app/stack/types';
import { ROOT_ROUTES } from '@/shared/constants/routes.constants';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const token = useAuthStore(state => state.token);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <>
          <Stack.Screen name={ROOT_ROUTES.MAIN} component={MainTabNavigator} />
          <Stack.Screen name={ROOT_ROUTES.BASKET} component={BasketScreen} />
          <Stack.Screen name={ROOT_ROUTES.CHECKOUT} component={CheckoutScreen} />
          <Stack.Screen
            name={ROOT_ROUTES.ORDER_SUCCESS}
            component={OrderSuccessScreen}
          />
        </>
      ) : (
        <Stack.Screen name={ROOT_ROUTES.AUTH} component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
