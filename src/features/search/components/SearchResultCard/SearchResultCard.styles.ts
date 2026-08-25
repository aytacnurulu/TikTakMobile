import { StyleSheet } from 'react-native';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: pixelHeight(10),
    borderBottomWidth: 1,
  },
  image: {
    width: pixelWidth(48),
    height: pixelWidth(48),
    borderRadius: pixelWidth(10),
    resizeMode: 'contain',
    marginRight: pixelWidth(12),
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: pixelFont(13),
    fontWeight: '600',
  },
  price: {
    marginTop: pixelHeight(2),
    fontSize: pixelFont(13),
    fontWeight: '700',
  },
});
