import { StyleSheet } from 'react-native';
import { gapVertical, pixelFont, pixelWidth } from '@/shared/utils/metrics';

export const styles = StyleSheet.create({
  container: {
    borderRadius: pixelWidth(12),
    padding: pixelWidth(12),
    gap: gapVertical(4),
  },
  label: {
    fontSize: pixelFont(13),
    fontWeight: '700',
  },
  address: {
    fontSize: pixelFont(13),
  },
});
