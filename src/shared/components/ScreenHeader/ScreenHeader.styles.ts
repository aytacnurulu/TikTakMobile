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
      color: colors.textPrimary,
    },
  });
