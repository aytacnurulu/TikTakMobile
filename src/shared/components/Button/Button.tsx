import React from 'react';
import {
  ActivityIndicator,
  Insets,
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { styles } from './Button.styles';

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

export default Button;
