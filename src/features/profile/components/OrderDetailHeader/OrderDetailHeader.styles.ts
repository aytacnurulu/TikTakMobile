import { StyleSheet } from 'react-native';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';

export const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    marginBottom: pixelHeight(16),
  },
  infoColumn: {
    flex: 1,
    gap: pixelHeight(4),
    paddingRight: pixelWidth(12),
  },
  label: {
    fontSize: pixelFont(12),
  },
  value: {
    fontSize: pixelFont(14),
    fontWeight: '600',
  },
  divider: {
  height: 1,
  width: '100%',
  marginBottom: pixelHeight(16),
},
});