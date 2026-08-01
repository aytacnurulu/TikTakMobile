import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppProviders from './providers/AppProviders';
import RootNavigator from './stack/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <AppProviders>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </AppProviders>
  );
};

export default App;
