import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppProviders from './providers/AppProviders';
import RootNavigator from './stack/RootNavigator';

const App = () => {
  return (
    <AppProviders>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AppProviders>
  );
};

export default App;
