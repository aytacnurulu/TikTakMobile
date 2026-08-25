import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '@/features/onboarding/screens/OnboardingScreen';
import WelcomeScreen from '@/features/auth/screens/WelcomeScreen';
import LoginScreen from '@/features/auth/screens/LoginScreen';
import SignupScreen from '@/features/auth/screens/SignupScreen';
import { AuthStackParamList } from '@/app/stack/types';
import { useOnboardingStore } from '@/features/onboarding/store/onboarding.store';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  const hasCompletedOnboarding = useOnboardingStore(
    state => state.hasCompletedOnboarding,
  );

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={hasCompletedOnboarding ? 'Welcome' : 'Onboarding'}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
