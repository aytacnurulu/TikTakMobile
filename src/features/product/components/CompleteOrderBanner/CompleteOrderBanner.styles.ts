import { StyleSheet } from 'react-native';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      left: pixelWidth(16),
      right: pixelWidth(16),
      bottom: pixelHeight(12),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: pixelHeight(12),
      paddingHorizontal: pixelWidth(16),
      borderRadius: pixelWidth(12),
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
      height: pixelHeight(48),
      backgroundColor: colors.primary,
      shadowColor: colors.textPrimary,
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: pixelWidth(10),
    },
    badge: {
      width: pixelWidth(24),
      height: pixelWidth(24),
      borderRadius: pixelWidth(12),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.textOnPrimary,
    },
    badgeText: {
      fontSize: pixelFont(13),
      fontWeight: '700',
      color: colors.primary,
    },
    label: {
      fontSize: pixelFont(15),
      fontWeight: '700',
      color: colors.textOnPrimary,
    },
    price: {
      fontSize: pixelFont(15),
      fontWeight: '700',
      color: colors.textOnPrimary,
    },
  });
