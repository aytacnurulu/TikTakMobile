import { StyleSheet } from 'react-native';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: pixelWidth(8),
    paddingVertical: pixelHeight(14),
    borderRadius: pixelWidth(12),
    width: '100%',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  title: {
    fontSize: pixelFont(15),
    fontWeight: '600',
  },
  textTitle: {
    fontSize: pixelFont(13),
    fontWeight: '600',
  },
});
