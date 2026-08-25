import { StyleSheet } from 'react-native';
import { gapHorizontal, pixelHeight } from '@/shared/utils/metrics';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: gapHorizontal(8),
  },
  dot: {
    height: pixelHeight(8),
    borderRadius: pixelHeight(4),
  },
});
