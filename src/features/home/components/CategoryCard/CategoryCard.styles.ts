import { StyleSheet } from 'react-native';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: pixelWidth(6),
    borderRadius: pixelWidth(12),
    borderWidth: 1,
    paddingVertical: pixelHeight(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: pixelWidth(56),
    height: pixelWidth(56),
    borderRadius: pixelWidth(8),
    resizeMode: 'cover',
  },
  name: {
    marginTop: pixelHeight(8),
    fontSize: pixelFont(12),
    fontWeight: '500',
  },
});
