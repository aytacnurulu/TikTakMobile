import { StyleSheet } from 'react-native';
import { gapVertical, pixelFont } from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: gapVertical(38),
    },
    message: {
      fontSize: pixelFont(14),
      textAlign: 'center',
      color: colors.textPlaceholder,
    },
  });
