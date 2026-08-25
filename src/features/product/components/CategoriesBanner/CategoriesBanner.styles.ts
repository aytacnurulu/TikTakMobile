import { StyleSheet } from 'react-native';
import { gapHorizontal, pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: gapHorizontal(10),
    borderRadius: pixelWidth(12),
    paddingVertical: pixelHeight(14),
    paddingHorizontal: pixelWidth(16),
  },
  label: {
    fontSize: pixelFont(14),
    fontWeight: '600',
  },
});
