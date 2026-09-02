import { StyleSheet } from 'react-native';
import { pixelFont, pixelHeight } from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    divider: {
      height: StyleSheet.hairlineWidth,
      marginVertical: pixelHeight(14),
      backgroundColor: colors.border,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    text: {
      fontSize: pixelFont(12),
      lineHeight: pixelFont(18),
      color: colors.textPrimary,
    },
    totalBlock: {
      alignItems: 'flex-end',
    },
    totalLabel: {
      fontSize: pixelFont(13),
      fontWeight: '700',
      color: colors.textPrimary,
    },
    totalValue: {
      marginTop: pixelHeight(2),
      fontSize: pixelFont(14),
      fontWeight: '800',
      color: colors.textPrimary,
    },
  });
