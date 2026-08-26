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
      fontSize: pixelFont(22),
      fontWeight: '700',
      textAlign: 'center',
      color: colors.textPrimary,
      marginTop: pixelWidth(8),
    },
    profileHeader: {
      alignItems: 'center',
      marginTop: pixelWidth(33),
    },
    avatar: {
      width: pixelWidth(152),
      height: pixelWidth(152),
      borderRadius: pixelWidth(76),
      overflow: 'hidden',
    },
    avatarPlaceholder: {
      width: pixelWidth(152),
      height: pixelWidth(152),
      borderRadius: pixelWidth(76),
      backgroundColor: colors.accent,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    name: {
      fontSize: pixelFont(16),
      fontWeight: '500',
      color: colors.textPrimary,
      marginTop: pixelWidth(19),
    },
    phone: {
      fontSize: pixelFont(14),
      color: colors.textSecondary,
      marginTop: pixelWidth(6),
      fontWeight: '300',
    },
    menuList: {
      marginTop: pixelWidth(35),
      gap: pixelWidth(4),
    },
  });