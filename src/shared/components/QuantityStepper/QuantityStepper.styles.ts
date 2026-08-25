import { StyleSheet } from 'react-native';
import { pixelWidth } from '@/shared/utils/metrics';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: pixelWidth(8),
  },
  decrementButton: {
    width: undefined,
    aspectRatio: 1,
    height: '100%',
    paddingVertical: 0,
    borderRadius: pixelWidth(10),
  },
  incrementButton: {
    width: undefined,
    flex: 1,
    height: '100%',
    paddingVertical: 0,
    borderRadius: pixelWidth(10),
  },
});
