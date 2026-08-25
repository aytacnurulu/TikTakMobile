import { StyleSheet } from 'react-native';
import { pixelWidth } from '@/shared/utils/metrics';

export const styles = StyleSheet.create({
  container: {
    borderRadius: pixelWidth(12),
    borderWidth: 1,
    padding: pixelWidth(10),
  },
});
