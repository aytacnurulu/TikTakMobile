import { StyleSheet } from 'react-native';
import { pixelFont, pixelWidth } from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: pixelWidth(16),
    },
    loader: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: pixelFont(20),
      fontWeight: '700',
      textAlign: 'center',
      color: colors.textPrimary,
      marginTop: pixelWidth(8),
    },
    profileHeader: {
      alignItems: 'center',
      marginTop: pixelWidth(24),
      marginBottom: pixelWidth(16),
    },
    avatar: {
      width: pixelWidth(88),
      height: pixelWidth(88),
      borderRadius: pixelWidth(44),
    },
    avatarPlaceholder: {
      width: pixelWidth(88),
      height: pixelWidth(88),
      borderRadius: pixelWidth(44),
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    name: {
      fontSize: pixelFont(16),
      fontWeight: '600',
      color: colors.textPrimary,
      marginTop: pixelWidth(12),
    },
    phone: {
      fontSize: pixelFont(13),
      color: colors.textSecondary,
      marginTop: pixelWidth(4),
    },
    menuList: {
      marginTop: pixelWidth(8),
    },
  });