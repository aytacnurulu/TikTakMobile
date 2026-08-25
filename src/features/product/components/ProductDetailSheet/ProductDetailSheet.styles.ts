import { StyleSheet } from 'react-native';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';

export const styles = StyleSheet.create({
  sheetContainer: {
    zIndex: 1000,
    elevation: 1000,
  },
  handleIndicator: {
    width: pixelWidth(40),
    height: pixelHeight(5),
  },
  content: {
    paddingHorizontal: pixelWidth(20),
    paddingTop: pixelHeight(4),
    paddingBottom: pixelHeight(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButton: {
    alignSelf: 'flex-end',
    marginBottom: pixelHeight(8),
    width: pixelWidth(38),
    height: pixelWidth(38),
    borderRadius: pixelWidth(19),
    padding: pixelWidth(8),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,

  },
  imageWrapper: {
    width: pixelWidth(180),
    height: pixelWidth(180),
    borderRadius: pixelWidth(16),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    marginTop: pixelHeight(20),
    fontSize: pixelFont(18),
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    marginTop: pixelHeight(10),
    fontSize: pixelFont(14),
    textAlign: 'center',
  },
  price: {
    marginTop: pixelHeight(20),
    fontSize: pixelFont(22),
    fontWeight: '700',
  },
  action: {
    width: '100%',
    marginTop: pixelHeight(24),
    alignItems: 'center',
  },
  actionInner: {
    width: pixelWidth(243),
    height: pixelHeight(52),
    marginBottom: pixelHeight(42),

  },
  addButton: {
    width: pixelWidth(243),
    height: pixelHeight(52),
    marginBottom: pixelHeight(42),
  },
});
