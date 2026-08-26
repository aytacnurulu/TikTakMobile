import { StyleSheet } from 'react-native';
import { pixelFont, pixelWidth } from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: pixelWidth(16),
    },
    title: {
      fontSize: pixelFont(20),
      fontWeight: '700',
      color: colors.textPrimary,
      marginTop: pixelWidth(8),
    },
    optionList: {
      marginTop: pixelWidth(24),
      gap: pixelWidth(4),
    },
  });
