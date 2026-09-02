import { StyleSheet } from 'react-native';
import { pixelWidth } from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      borderRadius: pixelWidth(12),
      borderWidth: 1,
      padding: pixelWidth(10),
      backgroundColor: colors.background,
      borderColor: colors.border,
    },
  });
