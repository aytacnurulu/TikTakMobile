import { StyleSheet } from 'react-native';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    infoRow: {
      flexDirection: 'row',
      marginBottom: pixelHeight(16),
    },
    lastInfoRow: {
      flexDirection: 'row',
      marginBottom: pixelHeight(30),
    },
    infoColumn: {
      flex: 1,
      gap: pixelHeight(4),
      paddingRight: pixelWidth(12),
    },
    label: {
      fontSize: pixelFont(14),
      fontWeight: '400',
      color: colors.label,
    },
    value: {
      fontSize: pixelFont(14),
      fontWeight: '300',
      color: colors.label,
    },
  });
