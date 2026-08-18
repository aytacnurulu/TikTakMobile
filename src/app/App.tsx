import '../shared/lib/i18n';
import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';
import AppProviders from '@/app/providers/AppProviders';
import RootNavigator from '@/app/stack/RootNavigator';

const App = () => {
  const onNavigationReady = useCallback(() => {
    BootSplash.hide({ fade: true });
  }, []);

  return (
    <AppProviders>
      <NavigationContainer onReady={onNavigationReady}>
        <RootNavigator />
      </NavigationContainer>
    </AppProviders>
  );
};

export default App;
