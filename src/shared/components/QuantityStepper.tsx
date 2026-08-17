import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';
import MinusIcon from '@/shared/icons/minus.svg';
import PlusIcon from '@/shared/icons/plus.svg';
import TrashIcon from '@/shared/icons/trash.svg';

interface QuantityStepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
}

const QuantityStepper = ({
  value,
  onIncrement,
  onDecrement,
  min = 1,
}: QuantityStepperProps) => {
  const { colors } = useTheme();
  const atMin = value === min;

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <TouchableOpacity
        onPress={onDecrement}
        style={styles.button}
        activeOpacity={0.8}
      >
        {atMin ? (
          <TrashIcon width={pixelWidth(13)} height={pixelWidth(13)} />
        ) : (
          <MinusIcon width={pixelWidth(13)} height={pixelWidth(4)} />
        )}
      </TouchableOpacity>
      <Text style={[styles.value, { color: colors.textOnPrimary }]}>{value}</Text>
      <TouchableOpacity
        onPress={onIncrement}
        style={styles.button}
        activeOpacity={0.8}
      >
        <PlusIcon width={pixelWidth(13)} height={pixelWidth(13)} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: pixelWidth(20),
    paddingHorizontal: pixelWidth(6),
    paddingVertical: pixelHeight(4),
    minWidth: pixelWidth(90),
  },
  button: {
    paddingHorizontal: pixelWidth(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: pixelFont(14),
    fontWeight: '600',
  },
});

export default QuantityStepper;
