import { StyleSheet } from 'react-native';
import { pixelFont, pixelWidth } from '@/shared/utils/metrics';

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: pixelWidth(32),
  },
  card: {
    borderRadius: pixelWidth(12),
    paddingVertical: pixelWidth(16),
    paddingHorizontal: pixelWidth(20),
    maxWidth: '100%',
  },
  message: {
    color: '#FFFFFF',
    fontSize: pixelFont(14),
    fontWeight: '600',
    textAlign: 'center',
  },
});
