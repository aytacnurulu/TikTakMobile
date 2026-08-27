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
    paddingTop: pixelHeight(8),
    paddingBottom: pixelHeight(32),
  },
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
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: pixelHeight(16),
  },
  productImageWrapper: {
    width: pixelWidth(48),
    height: pixelWidth(48),
    borderRadius: pixelWidth(10),
    overflow: 'hidden',
    marginRight: pixelWidth(12),
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productInfo: {
    flex: 1,
    gap: pixelHeight(4),
  },
  productTitle: {
    fontSize: pixelFont(14),
    fontWeight: '500',
  },
  productSubtitle: {
    fontSize: pixelFont(12),
  },
  productPrice: {
    fontSize: pixelFont(14),
    fontWeight: '600',
  },
});