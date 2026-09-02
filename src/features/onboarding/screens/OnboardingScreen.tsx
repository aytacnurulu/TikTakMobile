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
import { useTranslation } from 'react-i18next';
import { AuthStackParamList } from '@/app/stack/types';
import { AUTH_ROUTES } from '@/shared/constants/routes.constants';
import { useTheme } from '@/shared/hooks/useTheme';
import {
  deviceWidth,
  gapVertical,
  pixelFont,
  pixelHeight,
  pixelWidth,
} from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';
import Button from '@/shared/components/Button';
import OnboardingIllustration from '@/features/onboarding/components/OnboardingIllustration';
import OnboardingProgress from '@/features/onboarding/components/OnboardingProgress';
import { useOnboardingStore } from '@/features/onboarding/store/onboarding.store';
import { OnboardingSlide } from '@/features/onboarding/types/onboarding.types';

type OnboardingNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Onboarding'
>;

const SLIDE_VARIANTS: Pick<OnboardingSlide, 'key' | 'variant'>[] = [
  { key: 'discover', variant: 'discover' },
  { key: 'delivery', variant: 'delivery' },
  { key: 'checkout', variant: 'checkout' },
];

const OnboardingScreen = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation();
  const navigation = useNavigation<OnboardingNavigationProp>();
  const completeOnboarding = useOnboardingStore(state => state.completeOnboarding);

  const SLIDES: OnboardingSlide[] = SLIDE_VARIANTS.map(({ key, variant }) => ({
    key,
    variant,
    eyebrow: t(`onboarding.slides.${key}.eyebrow`),
    title: t(`onboarding.slides.${key}.title`),
    description: t(`onboarding.slides.${key}.description`),
  }));

  const listRef = useRef<FlatList<OnboardingSlide>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === SLIDES.length - 1;

  const goToAuth = () => {
    completeOnboarding();
    navigation.reset({ index: 0, routes: [{ name: AUTH_ROUTES.WELCOME }] });
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.wordmark}>TikTak</Text>
        <Button
          variant="text"
          title={t('onboarding.skip')}
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
                <Text style={styles.eyebrow}>{item.eyebrow}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          );
        }}
      />

      <View style={styles.footer}>
        <OnboardingProgress count={SLIDES.length} scrollX={scrollX} slideWidth={deviceWidth} />
        <Button
          title={isLastSlide ? t('onboarding.start') : t('onboarding.next')}
          onPress={handleNext}
          style={styles.nextButton}
        />
      </View>
    </SafeAreaView>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
      color: colors.primary,
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
      color: colors.primary,
    },
    title: {
      fontSize: pixelFont(24),
      fontWeight: '700',
      textAlign: 'center',
      lineHeight: pixelFont(30),
      color: colors.textPrimary,
    },
    description: {
      fontSize: pixelFont(14),
      textAlign: 'center',
      lineHeight: pixelFont(21),
      paddingHorizontal: pixelWidth(8),
      color: colors.textSecondary,
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
