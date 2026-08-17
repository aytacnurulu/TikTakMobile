import '../shared/lib/i18n';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppProviders from '@/app/providers/AppProviders';
import RootNavigator from '@/app/stack/RootNavigator';

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
