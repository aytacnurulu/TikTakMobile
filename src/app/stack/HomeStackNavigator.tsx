import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../features/home/screens/HomeScreen';
import ProductListScreen from '../../features/product/screens/ProductListScreen';
import { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Products" component={ProductListScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
