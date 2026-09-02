import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { createStyles } from './Card.styles';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Card = ({ children, style }: CardProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return <View style={[styles.container, style]}>{children}</View>;
};

export default Card;
