import { StyleSheet } from 'react-native';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: pixelHeight(16),
  },
    wrapper: {
    marginBottom: pixelHeight(16),
  },
  divider: {
    height: 1,
    width: '100%',
    marginTop: pixelHeight(17),
    backgroundColor: '#F6F5FB',
  },
  imageWrapper: {
    width: pixelWidth(70.36),
    height: pixelWidth(66),
    borderRadius: pixelWidth(10),
    overflow: 'hidden',
    marginRight: pixelWidth(17),
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
    fontSize: pixelFont(16),
    fontWeight: '300',
  },
  subtitle: {
    fontSize: pixelFont(16),
    fontWeight: '300',
  },
  price: {
    fontSize: pixelFont(16),
    fontWeight: '300',
  },
});