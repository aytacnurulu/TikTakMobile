import React from 'react';
import {
  ActivityIndicator,
  Insets,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  variant?: 'primary' | 'text';
  backgroundColor?: string;
  hitSlop?: Insets;
  style?: StyleProp<ViewStyle>;
}

const Button = ({
  title,
  onPress,
  disabled,
  loading,
  leftIcon,
  variant = 'primary',
  backgroundColor,
  hitSlop,
  style,
}: ButtonProps) => {
  const { colors } = useTheme();
  const isText = variant === 'text';

  return (
    <TouchableOpacity
      style={[
        isText ? styles.textContainer : styles.container,
        !isText && { backgroundColor: backgroundColor ?? colors.primary },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      hitSlop={hitSlop}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={isText ? colors.primary : colors.textOnPrimary} />
      ) : (
        <>
          {leftIcon}
          {title ? (
            <Text
              style={[
                isText ? styles.textTitle : styles.title,
                { color: isText ? colors.primary : colors.textOnPrimary },
              ]}
            >
              {title}
            </Text>
          ) : null}
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
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  title: {
    fontSize: pixelFont(15),
    fontWeight: '600',
  },
  textTitle: {
    fontSize: pixelFont(13),
    fontWeight: '600',
  },
});

export default Button;
