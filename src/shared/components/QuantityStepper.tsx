import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { pixelWidth } from '@/shared/utils/metrics';
import Button from '@/shared/components/Button';
import MinusIcon from '@/shared/icons/minus.svg';
import PlusIcon from '@/shared/icons/plus.svg';
import TrashIcon from '@/shared/icons/trash.svg';

interface QuantityStepperProps {
  value: number;
  unit?: string;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  style?: ViewStyle;
}

const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 };
const DECREMENT_COLOR = 'rgba(242, 146, 152, 1)';
const INCREMENT_COLOR = 'rgba(118, 203, 79, 1)';

const QuantityStepper = ({
  value,
  onIncrement,
  onDecrement,
  min = 1,
  style,
}: QuantityStepperProps) => {
  const atMin = value === min;

  return (
    <View style={[styles.container, style]}>
      <Button
        onPress={onDecrement}
        hitSlop={HIT_SLOP}
        backgroundColor={DECREMENT_COLOR}
        leftIcon={
          atMin ? (
            <TrashIcon width={pixelWidth(13)} height={pixelWidth(13)} />
          ) : (
            <MinusIcon width={pixelWidth(13)} height={pixelWidth(4)} />
          )
        }
        style={styles.decrementButton}
      />
      <Button
        onPress={onIncrement}
        hitSlop={HIT_SLOP}
        backgroundColor={INCREMENT_COLOR}
        title={String(value)}
        leftIcon={<PlusIcon width={pixelWidth(13)} height={pixelWidth(13)} />}
        style={styles.incrementButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: pixelWidth(8),
  },
  decrementButton: {
    width: undefined,
    aspectRatio: 1,
    height: '100%',
    paddingVertical: 0,
    borderRadius: pixelWidth(10),
  },
  incrementButton: {
    width: undefined,
    flex: 1,
    height: '100%',
    paddingVertical: 0,
    borderRadius: pixelWidth(10),
  },
});

export default QuantityStepper;
