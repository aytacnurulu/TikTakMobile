import { StyleSheet } from 'react-native';
import { pixelFont, pixelWidth } from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: pixelWidth(30),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: pixelWidth(8),
    },
    backButton: {
      position: 'absolute',
      left: 0,
      zIndex: 1,
      padding: pixelWidth(4),
    },
    title: {
      flex: 1,
      fontSize: pixelFont(22),
      fontWeight: '700',
      textAlign: 'center',
      color: '#000',
    },
    form: {
      marginTop: pixelWidth(28),
      gap: pixelWidth(18),
    },
    button: {
      marginTop: pixelWidth(35),
      marginBottom: pixelWidth(35),
    },
  });