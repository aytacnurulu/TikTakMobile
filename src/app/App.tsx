import '../shared/lib/i18n';
import React, { useCallback, useMemo } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';
import AppProviders from '@/app/providers/AppProviders';
import RootNavigator from '@/app/stack/RootNavigator';
import { useTheme } from '@/shared/hooks/useTheme';

const App = () => {
  const { theme, colors } = useTheme();

  const onNavigationReady = useCallback(() => {
    BootSplash.hide({ fade: true });
  }, []);

  const navigationTheme = useMemo<Theme>(() => {
    const base = theme === 'dark' ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        primary: colors.primary,
        background: colors.background,
        card: colors.background,
        text: colors.textPrimary,
        border: colors.border,
      },
    };
  }, [theme, colors]);

  return (
    <AppProviders>
      <NavigationContainer theme={navigationTheme} onReady={onNavigationReady}>
        <RootNavigator />
      </NavigationContainer>
    </AppProviders>
  );
};

export default App;
