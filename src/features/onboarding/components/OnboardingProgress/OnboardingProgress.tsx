import React from 'react';
import { Animated, View } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { styles } from './OnboardingProgress.styles';

interface OnboardingProgressProps {
  count: number;
  scrollX: Animated.Value;
  slideWidth: number;
}

const OnboardingProgress = ({ count, scrollX, slideWidth }: OnboardingProgressProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => {
        const inputRange = [
          (index - 1) * slideWidth,
          index * slideWidth,
          (index + 1) * slideWidth,
        ];

        const width = scrollX.interpolate({
          inputRange,
          outputRange: [8, 26, 8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              { width, opacity, backgroundColor: colors.primary },
            ]}
          />
        );
      })}
    </View>
  );
};

export default OnboardingProgress;
