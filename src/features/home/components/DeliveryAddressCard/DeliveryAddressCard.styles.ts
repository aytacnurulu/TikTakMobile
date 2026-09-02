import { StyleSheet } from 'react-native';
import { gapVertical, pixelFont, pixelWidth } from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      borderRadius: pixelWidth(12),
      padding: pixelWidth(12),
      gap: gapVertical(4),
      backgroundColor: colors.surface,
    },
    label: {
      fontSize: pixelFont(13),
      fontWeight: '700',
      color: colors.textPrimary,
    },
    address: {
      fontSize: pixelFont(13),
      color: colors.textSecondary,
    },
    addButton: {
      alignItems: 'flex-start',
      paddingHorizontal: 0,
    },
  });
