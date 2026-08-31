import { StyleSheet } from 'react-native';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: pixelHeight(16),
  },
  imageWrapper: {
    width: pixelWidth(48),
    height: pixelWidth(48),
    borderRadius: pixelWidth(10),
    overflow: 'hidden',
    marginRight: pixelWidth(12),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  info: {
    flex: 1,
    gap: pixelHeight(4),
  },
  title: {
    fontSize: pixelFont(14),
    fontWeight: '500',
  },
  subtitle: {
    fontSize: pixelFont(12),
  },
  price: {
    fontSize: pixelFont(14),
    fontWeight: '600',
  },
});