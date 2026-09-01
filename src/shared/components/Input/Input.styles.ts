import { StyleSheet } from 'react-native';
import { gapVertical, pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';

export const styles = StyleSheet.create({
  container: {
    gap: gapVertical(6),
  },
  label: {
    fontSize: pixelFont(13),
  },
  inputWrapper: {
    justifyContent: 'center',
  },
  input: {
    borderRadius: pixelWidth(10),
    paddingHorizontal: pixelWidth(14),
    paddingVertical: pixelHeight(12),
    fontSize: pixelFont(14),
  },
  inputWithIcon: {
    paddingRight: pixelWidth(44),
  },
  eyeButton: {
    position: 'absolute',
    right: pixelWidth(12),
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  multiline: {
    minHeight: pixelHeight(90),
    textAlignVertical: 'top',
  },
  error: {
    fontSize: pixelFont(12),
    color: '#E5484D',
  },
});
