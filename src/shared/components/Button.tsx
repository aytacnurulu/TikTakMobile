import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { pixelFont, pixelHeight, pixelWidth } from '../utils/metrics';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  variant?: 'primary';
  style?: ViewStyle;
}

const Button = ({
  title,
  onPress,
  disabled,
  loading,
  leftIcon,
  style,
}: ButtonProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.primary },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={colors.textOnPrimary} />
      ) : (
        <>
          {leftIcon}
          <Text style={[styles.title, { color: colors.textOnPrimary }]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: pixelWidth(8),
    paddingVertical: pixelHeight(14),
    borderRadius: pixelWidth(12),
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  title: {
    fontSize: pixelFont(15),
    fontWeight: '600',
  },
});

export default Button;
