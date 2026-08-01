import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../../features/auth/screens/WelcomeScreen';
import LoginScreen from '../../features/auth/screens/LoginScreen';
import SignupScreen from '../../features/auth/screens/SignupScreen';
import { AuthStackParamList } from './types';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <SafeAreaView>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AuthNavigator;
