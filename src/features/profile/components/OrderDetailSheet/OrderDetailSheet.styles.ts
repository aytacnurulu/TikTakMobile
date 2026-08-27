import { StyleSheet } from 'react-native';
import { pixelHeight, pixelWidth } from '@/shared/utils/metrics';

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
  divider: {
    height: 1,
    width: '100%',
    marginBottom: pixelHeight(16),
  }
});