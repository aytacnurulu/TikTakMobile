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
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    left: {
      flexDirection: 'row',
      flex: 1,
      gap: pixelWidth(24),
    },
    column: {
      gap: pixelWidth(4),
    },
    label: {
      fontSize: pixelFont(12),
      color: colors.textSecondary,
    },
    value: {
      fontSize: pixelFont(13),
      fontWeight: '500',
      color: colors.textPrimary,
    },
    addressColumn: {
      flex: 1,
      gap: pixelWidth(4),
    },
    addressValue: {
      fontSize: pixelFont(13),
      fontWeight: '500',
      color: colors.textPrimary,
    },
  });