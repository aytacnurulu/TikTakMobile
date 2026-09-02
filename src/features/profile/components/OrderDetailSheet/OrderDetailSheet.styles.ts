import { StyleSheet } from 'react-native';
import { pixelHeight, pixelWidth } from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    sheetContainer: {
      zIndex: 1000,
      elevation: 1000,
    },
    sheetBackground: {
      backgroundColor: colors.background,
    },
    handleIndicator: {
      width: pixelWidth(40),
      height: pixelHeight(5),
      backgroundColor: colors.textPlaceholder,
    },
    content: {
      paddingHorizontal: pixelWidth(20),
      paddingTop: pixelHeight(8),
      paddingBottom: pixelHeight(32),
    },
  });
