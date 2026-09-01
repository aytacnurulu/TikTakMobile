import { StyleSheet } from 'react-native';
import {
  pixelFont,
  pixelHorizontal,
  pixelVertical,
} from '@/shared/utils/metrics';

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: pixelHorizontal(32),
  },
  card: {
    width: '100%',
    borderRadius: 20,
    padding: pixelHorizontal(24),
    gap: pixelVertical(12),
  },
  title: {
    fontSize: pixelFont(17),
    fontWeight: '700',
    textAlign: 'center',
  },
  message: {
    fontSize: pixelFont(14),
    lineHeight: pixelFont(20),
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: pixelHorizontal(12),
    marginTop: pixelVertical(8),
  },
  button: {
    flex: 1,
    height: pixelVertical(48),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    borderWidth: 1,
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: pixelFont(15),
    fontWeight: '700',
  },
  cancelText: {
    fontSize: pixelFont(15),
    fontWeight: '600',
  },
});
