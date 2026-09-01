import { StyleSheet } from 'react-native';
import {
  pixelFont,
  pixelHorizontal,
  pixelVertical,
} from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.45)',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: pixelHorizontal(32),
    },
    card: {
      width: '100%',
      borderRadius: 20,
      padding: pixelHorizontal(24),
      alignItems: 'center',
      gap: pixelVertical(12),
      backgroundColor: colors.background,
    },
    glyph: {
      width: pixelHorizontal(56),
      height: pixelHorizontal(56),
      borderRadius: pixelHorizontal(28),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: pixelVertical(4),
    },
    glyphText: {
      color: colors.textOnPrimary,
      fontSize: pixelFont(26),
      fontWeight: '700',
    },
    title: {
      fontSize: pixelFont(17),
      fontWeight: '700',
      textAlign: 'center',
      color: colors.textPrimary,
    },
    message: {
      fontSize: pixelFont(14),
      lineHeight: pixelFont(20),
      textAlign: 'center',
      color: colors.textSecondary,
    },
    actions: {
      flexDirection: 'row',
      gap: pixelHorizontal(12),
      marginTop: pixelVertical(8),
      alignSelf: 'stretch',
    },
    button: {
      flex: 1,
      height: pixelVertical(48),
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonSecondary: {
      borderWidth: 1,
      borderColor: colors.border,
    },
    buttonPrimaryText: {
      color: colors.textOnPrimary,
      fontSize: pixelFont(15),
      fontWeight: '700',
    },
    buttonSecondaryText: {
      fontSize: pixelFont(15),
      fontWeight: '600',
      color: colors.textPrimary,
    },
  });
