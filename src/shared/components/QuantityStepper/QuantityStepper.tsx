import React from 'react';
import { View, ViewStyle } from 'react-native';
import { pixelWidth } from '@/shared/utils/metrics';
import Button from '@/shared/components/Button';
import MinusIcon from '@/shared/icons/minus.svg';
import PlusIcon from '@/shared/icons/plus.svg';
import TrashIcon from '@/shared/icons/trash.svg';
import { styles } from './QuantityStepper.styles';

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
  unit,
  onIncrement,
  onDecrement,
  min = 1,
  style,
}: QuantityStepperProps) => {
  const atMin = value === min;
  const valueLabel = unit ? `${value} ${unit}` : String(value);

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
        title={valueLabel}
        leftIcon={<PlusIcon width={pixelWidth(13)} height={pixelWidth(13)} />}
        style={styles.incrementButton}
      />
    </View>
  );
};

export default QuantityStepper;
