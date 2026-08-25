import { StyleSheet } from 'react-native';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: pixelHeight(12),
  },
  logo: {
    fontSize: pixelFont(20),
    fontWeight: '800',
    letterSpacing: 1,
  },
  basketButton: {
    padding: pixelWidth(4),
  },
  badge: {
    position: 'absolute',
    top: -pixelHeight(4),
    right: -pixelWidth(4),
    minWidth: pixelWidth(16),
    height: pixelWidth(16),
    borderRadius: pixelWidth(8),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: pixelWidth(3),
  },
  badgeText: {
    fontSize: pixelFont(10),
    fontWeight: '700',
  },
});
