import React, { useEffect, useRef } from 'react';
import {
  FlatList,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { deviceWidth, gapHorizontal, pixelFont, pixelHeight, pixelWidth } from '../../../shared/utils/metrics';
import { useTheme } from '../../../shared/hooks/useTheme';
import { useCampaigns } from '../hooks/campaign.hooks';
import { Campaign } from '../types/campaign.types';
import { ThemeColors } from '../../../shared/constants/theme.constants';

const HORIZONTAL_PADDING = pixelWidth(16);
const BANNER_WIDTH = deviceWidth - HORIZONTAL_PADDING * 2;
const ITEM_SPACING = gapHorizontal(12);
const ITEM_WIDTH = BANNER_WIDTH + ITEM_SPACING;
const AUTO_SCROLL_INTERVAL = 5000;

// Faked gradient (no gradient lib in the project): stacked bands, darkest at the bottom.
// Kept light — just enough to lift the text off the photo, not darken the whole banner.
const SCRIM_BAND_ALPHAS = [0, 0.06, 0.14, 0.24, 0.34];

const renderBanner = (colors: ThemeColors) => ({ item }: { item: Campaign }) => (
  <ImageBackground
    source={{ uri: item.img_url }}
    style={[styles.banner, { backgroundColor: colors.surface }]}
    imageStyle={styles.bannerImage}
  >
    <View style={styles.scrim} pointerEvents="none">
      {SCRIM_BAND_ALPHAS.map(alpha => (
        <View key={alpha} style={[styles.scrimBand, { backgroundColor: `rgba(0,0,0,${alpha})` }]} />
      ))}
    </View>

    <View style={styles.textContainer}>
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
      {!!item.description && (
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      )}
    </View>
  </ImageBackground>
);

const PromoBanner = () => {
  const { colors } = useTheme();
  const { data } = useCampaigns();
  const campaigns = data?.data ?? [];
  const listRef = useRef<FlatList<Campaign>>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;

    if (campaigns.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % campaigns.length;
      listRef.current?.scrollToOffset({
        offset: indexRef.current * ITEM_WIDTH,
        animated: true,
      });
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [campaigns.length]);

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    indexRef.current = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
  };

  if (campaigns.length === 0) {
    return null;
  }

  return (
    <FlatList
      ref={listRef}
      data={campaigns}
      horizontal
      keyExtractor={item => String(item.id)}
      renderItem={renderBanner(colors)}
      showsHorizontalScrollIndicator={false}
      snapToInterval={ITEM_WIDTH}
      decelerationRate="fast"
      onMomentumScrollEnd={onMomentumScrollEnd}
      contentContainerStyle={styles.listContent}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginVertical: pixelHeight(12),
  },
  listContent: {
    gap: ITEM_SPACING,
  },
  banner: {
    width: BANNER_WIDTH,
    height: pixelHeight(180),
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

export default PromoBanner;
