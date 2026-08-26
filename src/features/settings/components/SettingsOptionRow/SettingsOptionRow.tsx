import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelWidth } from '@/shared/utils/metrics';
import ChevronRightIcon from '@/shared/icons/chevron-right.svg';
import { createStyles } from './SettingsOptionRow.styles';

interface SettingsOptionRowProps {
  Icon: React.FC<SvgProps>;
  label: string;
  onPress: () => void;
}

const SettingsOptionRow = ({ Icon, label, onPress }: SettingsOptionRowProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.left}>
        <View style={styles.iconWrapper}>
          <Icon width={pixelWidth(18)} height={pixelWidth(18)} color={colors.textPrimary} />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <ChevronRightIcon width={pixelWidth(16)} height={pixelWidth(16)} color={colors.textSecondary} />
    </TouchableOpacity>
  );
};

export default SettingsOptionRow;
