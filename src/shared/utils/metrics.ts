import { Dimensions, PixelRatio, Platform } from 'react-native';

const { height, width } = Dimensions.get('window');
export const deviceHeight = height;
export const deviceWidth = width;

/**
 * Layout height and width from design
 */
const layoutWidth = 390;
const layoutHeight = 844;

const widthScaleFactor = deviceWidth / layoutWidth;
const heightScaleFactor = deviceHeight / layoutHeight;

// SE and Phone 11
// deviceWidth 375
//  LOG  deviceHeight 667

// deviceWidth 375
// LOG  deviceHeight 812

let maxFont = PixelRatio.getFontScale();

const fontScales = [
  { limit: 1.28, value: 0 },
  { limit: 1.6, value: 2 },
  { limit: 2, value: 4 },
  { limit: 2.5, value: 5 },
  { limit: 3, value: 7 },
  { limit: 3.5, value: 8 },
  { limit: Infinity, value: 8.8 },
];

let fontScaleValue = (
  fontScales.find(scale => maxFont <= scale.limit) || { value: 0 }
).value;

/**
 * Normalize the width value based on the device's screen size and the designed layout width.
 * @param size - The width value to be normalized.
 * @returns The normalized width value.
 */
function normalizeWidth(size: number) {
  const resizedWidth = size * widthScaleFactor;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(resizedWidth));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(resizedWidth)) - 1;
  }
}

/**
 * Normalize the height value based on the device's screen size and the designed layout height.
 * @param size - The height value to be normalized.
 * @returns The normalized height value.
 */
function normalizeHeight(size: number) {
  const resizedHeight = size * heightScaleFactor;

  if (Platform.OS === 'ios') {
    let size = Math.round(PixelRatio.roundToNearestPixel(resizedHeight));
    return size;
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(resizedHeight)) - 1;
  }
}

/**
 * Convert a size value to pixel width.
 * @param size - The size value to be converted.
 * @returns The converted pixel width value.
 */
const pixelWidth = (size: number): number => {
  return normalizeWidth(size);
};

/**
 * Convert a size value to pixel height.
 * @param size - The size value to be converted.
 * @returns The converted pixel height value.
 */
const pixelHeight = (size: number): number => {
  let extra = 0;

  if (deviceHeight < 800 && deviceHeight > 700) {
    extra = 2;
  } else if (deviceHeight < 700) {
    extra = 4;
  }

  return normalizeHeight(size) + extra;
};

/**
 * Convert a size value to pixel font size.
 * @param size - The size value to be converted.
 * @returns The converted pixel font size value.
 */
const pixelFont = (size: number): number => {
  // return size;
  return normalizeHeight(size - fontScaleValue);
};

/**
 * Convert a size value to pixel value for margin and padding in the vertical direction.
 * @param size - The size value to be converted.
 * @returns The converted pixel value for margin and padding in the vertical direction.
 */
const pixelVertical = (size: number): number => {
  return pixelHeight(size);
};

/**
 * Convert a size value to pixel value for margin and padding in the horizontal direction.
 * @param size - The size value to be converted.
 * @returns The converted pixel value for margin and padding in the horizontal direction.
 */
const pixelHorizontal = (size: number): number => {
  return pixelWidth(size);
};

const gapHorizontal = (size: number): number => {
  return pixelWidth(size);
};

const gapVertical = (size: number): number => {
  return pixelHeight(size);
};

function isTab() {
  if (deviceWidth > 550) {
    return true;
  } else {
    return false;
  }
}

function isScreenHeight770() {
  if (deviceHeight > 740 && height < 760) {
    return true;
  } else {
    return false;
  }
}

export {
  pixelWidth,
  gapHorizontal,
  gapVertical,
  isTab,
  isScreenHeight770,
  pixelHeight,
  pixelFont,
  pixelVertical,
  pixelHorizontal,
};
