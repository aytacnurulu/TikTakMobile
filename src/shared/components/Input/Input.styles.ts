import { StyleSheet } from 'react-native';
import {
  gapVertical,
  pixelFont,
  pixelHeight,
  pixelWidth,
} from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      gap: gapVertical(6),
    },
    label: {
      fontSize: pixelFont(13),
      color: colors.textPrimary,
    },
    inputWrapper: {
      justifyContent: 'center',
    },
    input: {
      borderRadius: pixelWidth(10),
      paddingHorizontal: pixelWidth(14),
      paddingVertical: pixelHeight(12),
      fontSize: pixelFont(14),
      backgroundColor: colors.surface,
      color: colors.textPrimary,
    },
    inputWithIcon: {
      paddingRight: pixelWidth(44),
    },
    inputDisabled: {
      color: colors.textSecondary,
      opacity: 0.6,
    },
    inputError: {
      borderColor: colors.danger,
      borderWidth: 1,
    },
    eyeButton: {
      position: 'absolute',
      right: pixelWidth(12),
      top: 0,
      bottom: 0,
      justifyContent: 'center',
    },
    multiline: {
      minHeight: pixelHeight(90),
      textAlignVertical: 'top',
    },
    error: {
      fontSize: pixelFont(12),
      color: colors.danger,
    },
  });
