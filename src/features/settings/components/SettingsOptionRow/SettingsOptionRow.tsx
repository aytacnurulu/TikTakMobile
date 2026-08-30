import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelWidth } from '@/shared/utils/metrics';
import { createStyles } from './SettingsOptionRow.styles';

interface SettingsOptionRowProps {
  Icon: React.FC<SvgProps>;
  label: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

const SettingsOptionRow = ({ Icon, label, onPress, rightElement }: SettingsOptionRowProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1}
      disabled={!onPress}
    >
      <View style={styles.left}>
        <View style={styles.iconWrapper}>
          <Icon width={pixelWidth(18)} height={pixelWidth(18)} color={colors.textPrimary} />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
      {rightElement}
    </TouchableOpacity>
  );
};

export default SettingsOptionRow;
