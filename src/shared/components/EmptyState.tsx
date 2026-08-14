import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { gapVertical, pixelFont, pixelWidth } from '../utils/metrics';
import CloseIcon from '../icons/close.svg';

interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
}

const EmptyState = ({ message, icon }: EmptyStateProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {icon ?? <CloseIcon width={pixelWidth(64)} height={pixelWidth(64)} />}
      <Text style={[styles.message, { color: colors.textPlaceholder }]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: gapVertical(12),
  },
  message: {
    fontSize: pixelFont(14),
    textAlign: 'center',
  },
});

export default EmptyState;
