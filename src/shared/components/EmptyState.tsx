import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { gapVertical, pixelFont, pixelWidth } from '@/shared/utils/metrics';
import CloseIcon from '@/shared/icons/close.svg';

interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
}

const EmptyState = ({ message, icon }: EmptyStateProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {icon ?? <CloseIcon width={pixelWidth(260)} height={pixelWidth(200)} />}
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
    gap: gapVertical(38),
  },
  message: {
    fontSize: pixelFont(14),
    textAlign: 'center',
  },
});

export default EmptyState;
