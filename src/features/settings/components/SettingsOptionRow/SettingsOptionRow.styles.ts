import { StyleSheet } from 'react-native';
import { pixelFont, pixelWidth } from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: pixelWidth(14),
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: pixelWidth(26),
    },
    iconWrapper: {
      width: pixelWidth(26),
      height: pixelWidth(26),
      borderRadius: pixelWidth(10),
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      fontSize: pixelFont(14),
      fontWeight: '400',
      color: colors.textLabel,
    },
  });
