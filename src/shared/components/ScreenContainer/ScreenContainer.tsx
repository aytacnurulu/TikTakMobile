import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '@/shared/components/ScreenHeader';
import { useTheme } from '@/shared/hooks/useTheme';
import { createStyles } from './ScreenContainer.styles';

interface ScreenContainerProps {
  title: string;
  /** Back handler. Defaults to `navigation.goBack()`. */
  onBack?: () => void;
  headerRight?: React.ReactNode;
  /** Horizontal screen padding (16px). Disable for edge-to-edge content. */
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

/**
 * Standard screen shell: safe-area background + `ScreenHeader`. Replaces the
 * `SafeAreaView` + `ScreenHeader` boilerplate repeated across stacked screens.
 */
const ScreenContainer = ({
  title,
  onBack,
  headerRight,
  padded = true,
  style,
  children,
}: ScreenContainerProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation();
  const handleBack = onBack ?? (() => navigation.goBack());

  return (
    <SafeAreaView
      style={[styles.container, padded && styles.padded, style]}
    >
      <ScreenHeader
        title={title}
        onBackPress={handleBack}
        rightElement={headerRight}
      />
      {children}
    </SafeAreaView>
  );
};

export default ScreenContainer;
