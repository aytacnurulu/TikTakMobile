import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '@/features/onboarding/screens/OnboardingScreen';
import WelcomeScreen from '@/features/auth/screens/WelcomeScreen';
import LoginScreen from '@/features/auth/screens/LoginScreen';
import SignupScreen from '@/features/auth/screens/SignupScreen';
import { AuthStackParamList } from '@/app/stack/types';
import { AUTH_ROUTES } from '@/shared/constants/routes.constants';
import { useOnboardingStore } from '@/features/onboarding/store/onboarding.store';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  const hasCompletedOnboarding = useOnboardingStore(
    state => state.hasCompletedOnboarding,
  );

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={
        hasCompletedOnboarding ? AUTH_ROUTES.WELCOME : AUTH_ROUTES.ONBOARDING
      }
    >
      <Stack.Screen name={AUTH_ROUTES.ONBOARDING} component={OnboardingScreen} />
      <Stack.Screen name={AUTH_ROUTES.WELCOME} component={WelcomeScreen} />
      <Stack.Screen name={AUTH_ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={AUTH_ROUTES.SIGNUP} component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
