import { StyleSheet } from 'react-native';
import { pixelWidth } from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    padded: {
      paddingHorizontal: pixelWidth(16),
    },
  });
