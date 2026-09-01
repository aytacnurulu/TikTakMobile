import { StyleSheet } from 'react-native';
import { pixelFont, pixelHeight } from '@/shared/utils/metrics';

export const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: pixelHeight(14),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: pixelFont(12),
    lineHeight: pixelFont(18),
  },
  totalBlock: {
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: pixelFont(13),
    fontWeight: '700',
  },
  totalValue: {
    marginTop: pixelHeight(2),
    fontSize: pixelFont(14),
    fontWeight: '800',
  },
});
