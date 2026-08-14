import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { gapHorizontal, pixelFont, pixelHeight, pixelWidth } from '../utils/metrics';
import ChevronLeftIcon from '../icons/chevron-left.svg';

interface ScreenHeaderProps {
  title: string;
  onBackPress: () => void;
  rightElement?: React.ReactNode;
}

const ScreenHeader = ({ title, onBackPress, rightElement }: ScreenHeaderProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} style={styles.side} activeOpacity={0.7}>
        <ChevronLeftIcon
          width={pixelWidth(18)}
          height={pixelWidth(11)}
          fill={colors.textPrimary}
        />
      </TouchableOpacity>
      <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.side}>{rightElement}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: pixelHeight(12),
    gap: gapHorizontal(8),
  },
  side: {
    minWidth: pixelWidth(28),
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: pixelFont(16),
    fontWeight: '600',
  },
});

export default ScreenHeader;
