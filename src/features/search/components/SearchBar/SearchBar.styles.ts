import { StyleSheet } from 'react-native';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: pixelWidth(8),
    borderRadius: pixelWidth(12),
    paddingHorizontal: pixelWidth(14),
    marginBottom: pixelHeight(12),
  },
  input: {
    flex: 1,
    fontSize: pixelFont(14),
    paddingVertical: pixelHeight(12),
  },
});
