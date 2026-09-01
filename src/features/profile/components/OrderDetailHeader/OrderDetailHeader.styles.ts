import { StyleSheet } from 'react-native';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    infoRow: {
      flexDirection: 'row',
      marginBottom: pixelHeight(16),
    },
    infoColumn: {
      flex: 1,
      gap: pixelHeight(4),
      paddingRight: pixelWidth(12),
    },
    label: {
      fontSize: pixelFont(12),
      color: colors.textSecondary,
    },
    value: {
      fontSize: pixelFont(14),
      fontWeight: '600',
      color: colors.textPrimary,
    },
    divider: {
      height: 1,
      width: '100%',
      marginBottom: pixelHeight(16),
      backgroundColor: colors.border,
    },
  });
