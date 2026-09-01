import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelWidth } from '@/shared/utils/metrics';
import ChevronLeftIcon from '@/shared/icons/chevron-left.svg';
import { createStyles } from './ScreenHeader.styles';

interface ScreenHeaderProps {
  title: string;
  onBackPress: () => void;
  rightElement?: React.ReactNode;
}

const ScreenHeader = ({
  title,
  onBackPress,
  rightElement,
}: ScreenHeaderProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onBackPress}
        style={styles.side}
        activeOpacity={0.7}
      >
        <ChevronLeftIcon
          width={pixelWidth(18)}
          height={pixelWidth(11)}
          color={colors.textPrimary}
        />
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.side}>{rightElement}</View>
    </View>
  );
};

export default ScreenHeader;
