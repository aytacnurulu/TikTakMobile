import { StyleSheet } from 'react-native';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: pixelHeight(16),
    },
    imageWrapper: {
      width: pixelWidth(48),
      height: pixelWidth(48),
      borderRadius: pixelWidth(10),
      overflow: 'hidden',
      marginRight: pixelWidth(12),
      backgroundColor: colors.surface,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    info: {
      flex: 1,
      gap: pixelHeight(4),
    },
    title: {
      fontSize: pixelFont(14),
      fontWeight: '500',
      color: colors.textPrimary,
    },
    subtitle: {
      fontSize: pixelFont(12),
      color: colors.textSecondary,
    },
    price: {
      fontSize: pixelFont(14),
      fontWeight: '600',
      color: colors.textPrimary,
    },
  });
