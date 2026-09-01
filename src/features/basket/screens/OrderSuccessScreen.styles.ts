import { StyleSheet } from 'react-native';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: pixelHeight(54),
    },
    successBadge: {
      width: pixelWidth(140),
      height: pixelWidth(140),
      borderRadius: pixelWidth(70),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: pixelHeight(42),
      backgroundColor: colors.surface,
    },
    successCircle: {
      width: pixelWidth(116),
      height: pixelWidth(116),
      borderRadius: pixelWidth(58),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
    },
    checkMark: {
      width: pixelWidth(58),
      height: pixelWidth(50),
      position: 'relative',
    },
    checkShort: {
      position: 'absolute',
      width: pixelWidth(24),
      height: pixelWidth(9),
      borderRadius: pixelWidth(2),
      backgroundColor: colors.textOnPrimary,
      left: pixelWidth(4),
      top: pixelWidth(27),
      transform: [{ rotate: '45deg' }],
    },
    checkLong: {
      position: 'absolute',
      width: pixelWidth(47),
      height: pixelWidth(9),
      borderRadius: pixelWidth(2),
      backgroundColor: colors.textOnPrimary,
      left: pixelWidth(20),
      top: pixelWidth(19),
      transform: [{ rotate: '-45deg' }],
    },
    title: {
      fontSize: pixelFont(18),
      fontWeight: '700',
      textAlign: 'center',
      color: colors.textPrimary,
    },
    message: {
      maxWidth: pixelWidth(280),
      marginTop: pixelHeight(8),
      fontSize: pixelFont(14),
      lineHeight: pixelFont(20),
      textAlign: 'center',
      color: colors.textSecondary,
    },
  });
