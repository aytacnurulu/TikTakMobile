import { StyleSheet } from 'react-native';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';
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
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: pixelWidth(16),
    },
    label: {
      fontSize: pixelFont(15),
      fontWeight: '500',
    },
    radioOuter: {
      width: pixelWidth(20),
      height: pixelWidth(20),
      borderRadius: pixelWidth(10),
      borderWidth: 1.5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioInner: {
      width: pixelWidth(10),
      height: pixelWidth(10),
      borderRadius: pixelWidth(5),
      backgroundColor: colors.primary,
    },
  });
