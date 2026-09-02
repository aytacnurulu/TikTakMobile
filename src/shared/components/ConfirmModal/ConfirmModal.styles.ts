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
      gap: pixelVertical(12),
      backgroundColor: colors.background,
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
    },
    button: {
      flex: 1,
      height: pixelVertical(48),
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancelButton: {
      borderWidth: 1,
      borderColor: colors.border,
    },
    confirmText: {
      color: colors.textOnPrimary,
      fontSize: pixelFont(15),
      fontWeight: '700',
    },
    cancelText: {
      fontSize: pixelFont(15),
      fontWeight: '600',
      color: colors.textPrimary,
    },
  });
