import { StyleSheet } from 'react-native';
import { pixelHeight } from '@/shared/utils/metrics';

export const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retry: {
    marginTop: pixelHeight(16),
  },
});
