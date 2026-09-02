import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/features/home/screens/HomeScreen';
import ProductListScreen from '@/features/product/screens/ProductListScreen';
import { HomeStackParamList } from '@/app/stack/types';
import { HOME_ROUTES } from '@/shared/constants/routes.constants';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={HOME_ROUTES.HOME} component={HomeScreen} />
      <Stack.Screen name={HOME_ROUTES.PRODUCTS} component={ProductListScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
