import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import SearchScreen from '../../features/search/screens/SearchScreen';
import AccountStackNavigator from './AccountStackNavigator';
import { MainTabParamList } from './types';
import HomeIcon from '../../shared/icons/home.svg';
import SearchIcon from '../../shared/icons/search.svg';
import AccountIcon from '../../shared/icons/account.svg';

const Tab = createBottomTabNavigator<MainTabParamList>();

const renderHomeIcon = ({ color, size }: { color: string; size: number }) => (
  <HomeIcon width={size} height={size} color={color} />
);

const renderSearchIcon = ({ color, size }: { color: string; size: number }) => (
  <SearchIcon width={size} height={size} color={color} />
);

const renderAccountIcon = ({
  color,
  size,
}: {
  color: string;
  size: number;
}) => <AccountIcon width={size} height={size} color={color} />;

const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Əsas',
          tabBarIcon: renderHomeIcon,
          tabBarActiveTintColor: '#76CB4F',
          tabBarInactiveTintColor: 'gray',
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Axtar',
          tabBarIcon: renderSearchIcon,
          tabBarActiveTintColor: '#76CB4F',
          tabBarInactiveTintColor: 'gray',
        }}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountStackNavigator}
        options={{
          tabBarLabel: 'Hesabım',
          tabBarIcon: renderAccountIcon,
          tabBarActiveTintColor: '#76CB4F',
          tabBarInactiveTintColor: 'gray',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
