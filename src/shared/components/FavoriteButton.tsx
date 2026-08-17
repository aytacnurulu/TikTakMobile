import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelWidth } from '@/shared/utils/metrics';
import HeartIcon from '@/shared/icons/heart.svg';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  size?: number;
}

const FavoriteButton = ({ isFavorite, onToggle, size = 20 }: FavoriteButtonProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={onToggle} activeOpacity={0.7} style={styles.container}>
      <HeartIcon
        width={pixelWidth(size)}
        height={pixelWidth(size)}
        fill={isFavorite ? colors.primary : colors.textSecondary}
      />
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
