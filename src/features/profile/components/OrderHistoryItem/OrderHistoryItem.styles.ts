import { StyleSheet } from 'react-native';
import { pixelFont, pixelWidth } from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: pixelWidth(16),
    },
    left: {
      flexDirection: 'row',
      flex: 1,
      gap: pixelWidth(40),
    },
    column: {
      gap: pixelWidth(4),
    },
    label: {
      fontSize: pixelFont(14),
      color: colors.label,
      fontWeight: '400'
    },
    value: {
      fontSize: pixelFont(14),
      fontWeight: '300',
      color: colors.label,
    },
    addressColumn: {
      flex: 1,
      gap: pixelWidth(2),
    },
    addressValue: {
      fontSize: pixelFont(16),
      fontWeight: '300',
      color: colors.label,
    },
  });