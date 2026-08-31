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
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: pixelWidth(8),
    },
    backButton: {
      position: 'absolute',
      left: 0,
      zIndex: 1,
      padding: pixelWidth(4),
    },
    title: {
      flex: 1,
      fontSize: pixelFont(20),
      fontWeight: '700',
      textAlign: 'center',
      color: colors.textPrimary,
    },
    optionList: {
      marginTop: pixelWidth(24),
      gap: pixelWidth(4),
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.border,
    },
  });
