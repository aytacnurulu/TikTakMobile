import { StyleSheet } from 'react-native';
import {
  gapHorizontal,
  pixelFont,
  pixelHeight,
  pixelWidth,
} from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: gapHorizontal(10),
      borderRadius: pixelWidth(12),
      paddingVertical: pixelHeight(14),
      paddingHorizontal: pixelWidth(16),
      backgroundColor: colors.primary,
    },
    label: {
      fontSize: pixelFont(14),
      fontWeight: '600',
      color: colors.textOnPrimary,
    },
  });
