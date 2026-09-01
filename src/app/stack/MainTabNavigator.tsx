import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import HomeStackNavigator from '@/app/stack/HomeStackNavigator';
import SearchScreen from '@/features/search/screens/SearchScreen';
import AccountStackNavigator from '@/app/stack/AccountStackNavigator';
import { MainTabParamList } from '@/app/stack/types';
import { useTheme } from '@/shared/hooks/useTheme';
import HomeIcon from '@/shared/icons/home.svg';
import SearchIcon from '@/shared/icons/search.svg';
import AccountIcon from '@/shared/icons/account.svg';

const Tab = createBottomTabNavigator<MainTabParamList>();

const renderHomeIcon = ({ color, size }: { color: string; size: number }) => (
  <HomeIcon width={size} height={size} fill={color} color={color} />
);

const renderSearchIcon = ({ color, size }: { color: string; size: number }) => (
  <SearchIcon width={size} height={size} fill={color} color={color} />
);

const renderAccountIcon = ({
  color,
  size,
}: {
  color: string;
  size: number;
}) => <AccountIcon width={size} height={size} fill={color} color={color} />;

const MainTabNavigator = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textPlaceholder,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ tabBarLabel: t('tabs.home'), tabBarIcon: renderHomeIcon }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ tabBarLabel: t('tabs.search'), tabBarIcon: renderSearchIcon }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStackNavigator}
        options={{ tabBarLabel: t('tabs.account'), tabBarIcon: renderAccountIcon }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
