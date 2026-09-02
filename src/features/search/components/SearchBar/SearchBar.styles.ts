import { StyleSheet } from 'react-native';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: pixelWidth(8),
      borderRadius: pixelWidth(12),
      paddingHorizontal: pixelWidth(14),
      marginBottom: pixelHeight(12),
      backgroundColor: colors.surface,
    },
    input: {
      flex: 1,
      fontSize: pixelFont(14),
      paddingVertical: pixelHeight(12),
      color: colors.textPrimary,
    },
  });
