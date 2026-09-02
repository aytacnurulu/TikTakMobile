import { StyleSheet } from 'react-native';
import {
  deviceWidth,
  pixelFont,
  pixelHeight,
  pixelWidth,
} from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

// Fixed 2-column grid: screen padding (16) on each edge + card margin (6) on
// all 4 card edges across the row. A flex:1 card would stretch to fill the
// row when the last row has an odd item out, so width must be computed, not flexible.
const SCREEN_PADDING = pixelWidth(16);
const CARD_MARGIN = pixelWidth(7);
const CARD_WIDTH = (deviceWidth - SCREEN_PADDING * 2 - CARD_MARGIN * 4) / 2;
const CARD_HEIGHT = pixelHeight(210);
// Add-to-basket Button and QuantityStepper swap in the same slot, so they
// share one fixed size — otherwise the row's height/width shifts when one
// replaces the other.
const ACTION_HEIGHT = pixelHeight(32);

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      margin: CARD_MARGIN,
      padding: pixelWidth(8),
    },
    image: {
      width: '100%',
      height: pixelWidth(100),
      borderRadius: pixelWidth(10),
      resizeMode: 'contain',
    },
    title: {
      height: pixelHeight(30),
      marginTop: pixelHeight(6),
      fontSize: pixelFont(12),
      fontWeight: '600',
      color: colors.textPrimary,
    },
    price: {
      marginTop: pixelHeight(2),
      marginBottom: pixelHeight(6),
      fontSize: pixelFont(13),
      fontWeight: '700',
      color: colors.textPrimary,
    },
    action: {
      width: '100%',
      height: ACTION_HEIGHT,
      paddingVertical: 0,
    },
  });
