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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: pixelWidth(16),
  },
  label: {
    fontSize: pixelFont(15),
    fontWeight: '500',
  },
  radioOuter: {
    width: pixelWidth(20),
    height: pixelWidth(20),
    borderRadius: pixelWidth(10),
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: pixelWidth(10),
    height: pixelWidth(10),
    borderRadius: pixelWidth(5),
  },
});
