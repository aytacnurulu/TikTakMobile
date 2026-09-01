import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Clipboard from '@react-native-clipboard/clipboard';
import { DevToolsBubble } from 'react-native-react-query-devtools';
import { queryClient } from '@/shared/lib/query-client';
import Toast from '@/shared/components/Toast';
import ResultModal from '@/shared/components/ResultModal';

interface AppProvidersProps {
  children: React.ReactNode;
}

const onCopy = async (text: string) => {
  try {
    Clipboard.setString(text);
    return true;
  } catch {
    return false;
  }
};

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
          {/* Rendered after BottomSheetModalProvider so toasts/modals paint
              above any open bottom sheet. */}
          <Toast />
          <ResultModal />
          {__DEV__ && (
            <DevToolsBubble onCopy={onCopy} queryClient={queryClient} />
          )}
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default AppProviders;
