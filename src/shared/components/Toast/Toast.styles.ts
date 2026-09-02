import { StyleSheet } from 'react-native';
import {
  pixelFont,
  pixelHorizontal,
  pixelVertical,
} from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    wrapper: {
      position: 'absolute',
      left: pixelHorizontal(16),
      right: pixelHorizontal(16),
      zIndex: 9999,
      elevation: 12,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: pixelHorizontal(12),
      paddingVertical: pixelVertical(12),
      paddingHorizontal: pixelHorizontal(14),
      borderRadius: 14,
      borderWidth: StyleSheet.hairlineWidth,
      shadowColor: '#000000',
      shadowOpacity: 0.12,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
      backgroundColor: colors.background,
      borderColor: colors.border,
    },
    glyph: {
      width: pixelHorizontal(22),
      height: pixelHorizontal(22),
      borderRadius: pixelHorizontal(11),
      alignItems: 'center',
      justifyContent: 'center',
    },
    glyphText: {
      color: colors.textOnPrimary,
      fontSize: pixelFont(13),
      fontWeight: '700',
      lineHeight: pixelFont(16),
    },
    message: {
      flex: 1,
      fontSize: pixelFont(13),
      lineHeight: pixelFont(18),
      color: colors.textPrimary,
    },
    action: {
      fontSize: pixelFont(13),
      fontWeight: '700',
    },
  });
