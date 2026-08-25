import { StyleSheet } from 'react-native';
import { gapHorizontal, pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';

export const styles = StyleSheet.create({
  list: {
    flexGrow: 0,
    flexShrink: 0,
  },
  listContent: {
    gap: gapHorizontal(8),
    paddingVertical: pixelHeight(12),
  },
  chip: {
    paddingHorizontal: pixelWidth(14),
    paddingVertical: pixelHeight(8),
    borderRadius: pixelWidth(10),
    borderWidth: 1,
  },
  label: {
    fontSize: pixelFont(13),
    fontWeight: '600',
  },
});
