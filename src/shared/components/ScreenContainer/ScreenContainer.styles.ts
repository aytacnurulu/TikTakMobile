import { StyleSheet } from 'react-native';
import { pixelWidth } from '@/shared/utils/metrics';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: pixelWidth(16),
  },
});
