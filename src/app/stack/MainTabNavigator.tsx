import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import SearchScreen from '../../features/search/screens/SearchScreen';
import AccountStackNavigator from './AccountStackNavigator';
import { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
      <Tab.Screen name="SearchTab" component={SearchScreen} />
      <Tab.Screen name="AccountTab" component={AccountStackNavigator} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
