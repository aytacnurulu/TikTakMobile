import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { styles } from './Card.styles';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Card = ({ children, style }: CardProps) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, borderColor: colors.border },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Card;
