import React, { useEffect, useRef } from 'react';
import {
  FlatList,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { useCampaigns } from '@/features/home/hooks/campaign.hooks';
import { Campaign } from '@/features/home/types/campaign.types';
import {
  createStyles,
  ITEM_WIDTH,
  PromoBannerStyles,
} from './PromoBanner.styles';

const AUTO_SCROLL_INTERVAL = 5000;

// Faked gradient (no gradient lib in the project): stacked bands, darkest at the bottom.
// Kept light — just enough to lift the text off the photo, not darken the whole banner.
const SCRIM_BAND_ALPHAS = [0, 0.06, 0.14, 0.24, 0.34];

const renderBanner =
  (styles: PromoBannerStyles) =>
  ({ item }: { item: Campaign }) => (
  <ImageBackground
    source={{ uri: item.img_url }}
    style={styles.banner}
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
  const styles = createStyles(colors);
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
      renderItem={renderBanner(styles)}
      showsHorizontalScrollIndicator={false}
      snapToInterval={ITEM_WIDTH}
      decelerationRate="fast"
      onMomentumScrollEnd={onMomentumScrollEnd}
      contentContainerStyle={styles.listContent}
      style={styles.list}
    />
  );
};

export default PromoBanner;
