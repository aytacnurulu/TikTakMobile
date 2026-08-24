import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelFont, pixelWidth } from '@/shared/utils/metrics';
import ChevronRightIcon from '@/shared/icons/chevron-right.svg';

interface AccountMenuItemProps {
  Icon: React.FC<SvgProps>;
  label: string;
  onPress: () => void;
}

const AccountMenuItem = ({ Icon, label, onPress }: AccountMenuItemProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.left}>
        <Icon width={pixelWidth(20)} height={pixelWidth(20)} color={colors.textPrimary} />
        <Text style={[styles.label, { color: colors.textPrimary }]}>{label}</Text>
      </View>
      <ChevronRightIcon
        width={pixelWidth(16)}
        height={pixelWidth(16)}
        color={colors.textSecondary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: pixelWidth(14),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: pixelWidth(12),
  },
  label: {
    fontSize: pixelFont(14),
    fontWeight: '500',
  },
});

export default AccountMenuItem;