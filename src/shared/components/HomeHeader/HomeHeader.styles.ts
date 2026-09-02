import { StyleSheet } from 'react-native';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: pixelHeight(12),
    },
    logo: {
      fontSize: pixelFont(20),
      fontWeight: '800',
      letterSpacing: 1,
      color: colors.textPrimary,
    },
    basketButton: {
      padding: pixelWidth(4),
    },
    badge: {
      position: 'absolute',
      top: -pixelHeight(4),
      right: -pixelWidth(4),
      minWidth: pixelWidth(16),
      height: pixelWidth(16),
      borderRadius: pixelWidth(8),
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: pixelWidth(3),
      backgroundColor: colors.primary,
    },
    badgeText: {
      fontSize: pixelFont(10),
      fontWeight: '700',
      color: colors.textOnPrimary,
    },
  });
