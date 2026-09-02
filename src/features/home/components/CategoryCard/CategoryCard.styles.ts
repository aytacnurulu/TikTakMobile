import { Dimensions, StyleSheet } from 'react-native';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

const NUM_COLUMNS = 3;
const CARD_MARGIN = pixelWidth(6);
// Must mirror HomeScreen's container paddingHorizontal (pixelWidth(16) on each side).
const LIST_HORIZONTAL_PADDING = pixelWidth(16) * 2;

// Fixed width instead of flex: 1 — with numColumns, flex items in an
// incomplete last row stretch to fill the row, which is not what we want.
const CARD_WIDTH =
  (Dimensions.get('window').width -
    LIST_HORIZONTAL_PADDING -
    CARD_MARGIN * 2 * NUM_COLUMNS) /
  NUM_COLUMNS;

// Image scales with the card instead of a fixed size, so it fills most of
// the card width; the name gets its own inset so it doesn't touch the border.
const IMAGE_SIZE = CARD_WIDTH - pixelWidth(20);
const NAME_WIDTH = CARD_WIDTH - pixelWidth(16);

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: CARD_WIDTH,
      margin: CARD_MARGIN,
      borderRadius: pixelWidth(12),
      borderWidth: 1,
      paddingVertical: pixelHeight(12),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
      borderColor: colors.border,
    },
    image: {
      width: IMAGE_SIZE,
      height: IMAGE_SIZE,
      borderRadius: pixelWidth(8),
      resizeMode: 'contain',
    },
    name: {
      width: NAME_WIDTH,
      marginTop: pixelHeight(8),
      fontSize: pixelFont(12),
      fontWeight: '500',
      textAlign: 'center',
      color: colors.textPrimary,
    },
  });
