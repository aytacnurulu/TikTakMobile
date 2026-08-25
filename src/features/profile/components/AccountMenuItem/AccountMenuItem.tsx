import { StyleSheet } from 'react-native';
import { pixelFont, pixelWidth } from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: pixelWidth(14),
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: pixelWidth(12),
    },
    iconWrapper: {
      width: pixelWidth(36),
      height: pixelWidth(36),
      borderRadius: pixelWidth(10),
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      fontSize: pixelFont(14),
      fontWeight: '500',
      color: colors.textPrimary,
    },
  });