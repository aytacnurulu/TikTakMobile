import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelWidth } from '@/shared/utils/metrics';
import CloseIcon from '@/shared/icons/close.svg';
import { createStyles } from './EmptyState.styles';

interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
}

const EmptyState = ({ message, icon }: EmptyStateProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      {icon !== null &&
        (icon ?? <CloseIcon width={pixelWidth(260)} height={pixelWidth(200)} />)}
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default EmptyState;
