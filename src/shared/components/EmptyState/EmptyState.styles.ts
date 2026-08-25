import { StyleSheet } from 'react-native';
import { gapVertical, pixelFont } from '@/shared/utils/metrics';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: gapVertical(38),
  },
  message: {
    fontSize: pixelFont(14),
    textAlign: 'center',
  },
});
