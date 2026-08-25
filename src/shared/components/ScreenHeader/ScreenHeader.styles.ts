import { StyleSheet } from 'react-native';
import { gapHorizontal, pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: pixelHeight(12),
    gap: gapHorizontal(8),
  },
  side: {
    minWidth: pixelWidth(28),
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: pixelFont(16),
    fontWeight: '600',
  },
});
