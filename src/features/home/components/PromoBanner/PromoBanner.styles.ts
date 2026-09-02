import { StyleSheet } from 'react-native';
import {
  deviceWidth,
  gapHorizontal,
  pixelFont,
  pixelHeight,
  pixelWidth,
} from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const HORIZONTAL_PADDING = pixelWidth(16);
export const BANNER_WIDTH = deviceWidth - HORIZONTAL_PADDING * 2;
export const ITEM_SPACING = gapHorizontal(12);
export const ITEM_WIDTH = BANNER_WIDTH + ITEM_SPACING;

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    list: {
      marginVertical: pixelHeight(12),
    },
    listContent: {
      gap: ITEM_SPACING,
    },
    banner: {
      width: BANNER_WIDTH,
      height: pixelHeight(180),
      backgroundColor: colors.surface,
    },
    bannerImage: {
      borderRadius: pixelWidth(16),
    },
    scrim: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '45%',
      borderBottomLeftRadius: pixelWidth(16),
      borderBottomRightRadius: pixelWidth(16),
      overflow: 'hidden',
    },
    scrimBand: {
      flex: 1,
    },
    textContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: pixelWidth(16),
    },
    // White regardless of theme — sits on top of the photo + dark scrim.
    title: {
      color: '#FFFFFF',
      fontSize: pixelFont(20),
      fontWeight: '800',
      textShadowColor: 'rgba(0, 0, 0, 0.45)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 4,
    },
    description: {
      color: '#FFFFFF',
      fontSize: pixelFont(13),
      fontWeight: '600',
      marginTop: pixelHeight(4),
      textShadowColor: 'rgba(0, 0, 0, 0.45)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 4,
    },
  });

export type PromoBannerStyles = ReturnType<typeof createStyles>;
