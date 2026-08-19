import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelWidth } from '@/shared/utils/metrics';
import HeartIcon from '@/shared/icons/heart.svg';
import HeartIconFilled from '@/shared/icons/heart-filled.svg';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  size?: number;
  style?: ViewStyle;
}

const FavoriteButton = ({ isFavorite, onToggle, size = 20, style }: FavoriteButtonProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={onToggle} activeOpacity={0.7} style={[styles.container, style]}>
      {isFavorite ? (
        <HeartIconFilled
          width={pixelWidth(size)}
          height={pixelWidth(size)}
          color={colors.primary}
        />
      ) : (
        <HeartIcon
          width={pixelWidth(size)}
          height={pixelWidth(size)}
          color={colors.textSecondary}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FavoriteButton;
