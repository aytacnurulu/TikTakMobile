import React, { useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/app/stack/types';
import { useTheme } from '@/shared/hooks/useTheme';
import {
  deviceWidth,
  gapVertical,
  pixelFont,
  pixelHeight,
  pixelWidth,
} from '@/shared/utils/metrics';
import Button from '@/shared/components/Button';
import OnboardingIllustration from '@/features/onboarding/components/OnboardingIllustration';
import OnboardingProgress from '@/features/onboarding/components/OnboardingProgress';
import { useOnboardingStore } from '@/features/onboarding/store/onboarding.store';
import { OnboardingSlide } from '@/features/onboarding/types/onboarding.types';

type OnboardingNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Onboarding'
>;

const SLIDES: OnboardingSlide[] = [
  {
    key: 'discover',
    variant: 'discover',
    eyebrow: 'TAZƏ VƏ GENİŞ ÇEŞİD',
    title: 'Min bir dadı bir toxunuşla kəşf et',
    description:
      'Meyvədən elektronikaya qədər minlərlə məhsulu rahatlıqla gəz, sənə uyğun olanı bir neçə saniyəyə tap.',
  },
  {
    key: 'delivery',
    variant: 'delivery',
    eyebrow: 'IŞIQ SÜRƏTİNDƏ ÇATDIRILMA',
    title: 'Sifariş ver, qapına qədər izlə',
    description:
      'Sifarişin anbardan çıxan kimi yolda olur — çatdırılmanı canlı izləyərək dəqiqəsinə qədər xəbərdar olursan.',
  },
  {
    key: 'checkout',
    variant: 'checkout',
    eyebrow: 'TƏHLÜKƏSİZ VƏ SADƏ ÖDƏNİŞ',
    title: 'Bir toxunuşla sifarişi tamamla',
    description:
      'Səbətini yoxla, ödəniş üsulunu seç, hazırdır! Bütün sifariş tarixçən həmişə əlində.',
  },
];

const OnboardingScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<OnboardingNavigationProp>();
  const completeOnboarding = useOnboardingStore(state => state.completeOnboarding);

  const listRef = useRef<FlatList<OnboardingSlide>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === SLIDES.length - 1;

  const goToAuth = () => {
    completeOnboarding();
    navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  };

  const handleNext = () => {
    if (isLastSlide) {
      goToAuth();
      return;
    }
    listRef.current?.scrollToOffset({
      offset: (activeIndex + 1) * deviceWidth,
      animated: true,
    });
  };

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / deviceWidth);
    setActiveIndex(index);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.wordmark, { color: colors.primary }]}>TikTak</Text>
        <Button
          variant="text"
          title="Keç"
          onPress={goToAuth}
          disabled={isLastSlide}
          style={[styles.skipButton, isLastSlide && styles.hidden]}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        />
      </View>

      <Animated.FlatList
        ref={listRef}
        style={styles.list}
        data={SLIDES}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * deviceWidth,
            index * deviceWidth,
            (index + 1) * deviceWidth,
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [deviceWidth * 0.3, 0, -deviceWidth * 0.3],
            extrapolate: 'clamp',
          });

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.82, 1, 0.82],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <View style={[styles.slide, { width: deviceWidth }]}>
              <Animated.View
                style={[
                  styles.illustrationWrapper,
                  { transform: [{ translateX }, { scale }], opacity },
                ]}
              >
                <OnboardingIllustration variant={item.variant} size={pixelWidth(220)} />
              </Animated.View>

              <View style={styles.textBlock}>
                <Text style={[styles.eyebrow, { color: colors.primary }]}>
                  {item.eyebrow}
                </Text>
                <Text style={[styles.title, { color: colors.textPrimary }]}>
                  {item.title}
                </Text>
                <Text style={[styles.description, { color: colors.textSecondary }]}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />

      <View style={styles.footer}>
        <OnboardingProgress count={SLIDES.length} scrollX={scrollX} slideWidth={deviceWidth} />
        <Button
          title={isLastSlide ? 'Başlayaq' : 'Növbəti'}
          onPress={handleNext}
          style={styles.nextButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: pixelWidth(24),
    paddingTop: pixelHeight(8),
  },
  wordmark: {
    fontSize: pixelFont(18),
    fontWeight: '700',
  },
  skipButton: {
    paddingVertical: pixelHeight(4),
  },
  hidden: {
    opacity: 0,
  },
  list: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: pixelWidth(28),
    paddingBottom: pixelHeight(56),
  },
  illustrationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    marginTop: pixelHeight(32),
    alignItems: 'center',
    gap: gapVertical(12),
  },
  eyebrow: {
    fontSize: pixelFont(12),
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  title: {
    fontSize: pixelFont(24),
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: pixelFont(30),
  },
  description: {
    fontSize: pixelFont(14),
    textAlign: 'center',
    lineHeight: pixelFont(21),
    paddingHorizontal: pixelWidth(8),
  },
  footer: {
    paddingHorizontal: pixelWidth(24),
    paddingBottom: pixelHeight(16),
    paddingTop: pixelHeight(20),
    gap: gapVertical(20),
  },
  nextButton: {
    marginTop: 0,
  },
});

export default OnboardingScreen;
