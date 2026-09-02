import { StyleSheet } from 'react-native';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: pixelHeight(10),
      borderBottomWidth: 1,
      borderColor: colors.border,
    },
    image: {
      width: pixelWidth(48),
      height: pixelWidth(48),
      borderRadius: pixelWidth(10),
      resizeMode: 'contain',
      marginRight: pixelWidth(12),
    },
    info: {
      flex: 1,
    },
    title: {
      fontSize: pixelFont(13),
      fontWeight: '600',
      color: colors.textPrimary,
    },
    price: {
      marginTop: pixelHeight(2),
      fontSize: pixelFont(13),
      fontWeight: '700',
      color: colors.textPrimary,
    },
  });
