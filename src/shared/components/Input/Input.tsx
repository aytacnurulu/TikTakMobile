import React, { forwardRef, useState } from 'react';
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelWidth } from '@/shared/utils/metrics';
import EyeIcon from '@/shared/icons/eye.svg';
import EyeOffIcon from '@/shared/icons/eye-off.svg';
import { createStyles } from './Input.styles';

interface InputProps
  extends Pick<
    TextInputProps,
    'secureTextEntry' | 'multiline' | 'keyboardType' | 'onBlur' | 'editable'
  > {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  error?: string;
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      value,
      onChangeText,
      placeholder,
      secureTextEntry,
      multiline,
      keyboardType,
      onBlur,
      error,
      editable = true,
    },
    ref,
  ) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const [secureVisible, setSecureVisible] = useState(false);

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            editable={editable}
            placeholder={placeholder}
            placeholderTextColor={colors.textPlaceholder}
            secureTextEntry={secureTextEntry && !secureVisible}
            multiline={multiline}
            keyboardType={keyboardType}
            style={[
              styles.input,
              multiline && styles.multiline,
              secureTextEntry && styles.inputWithIcon,
              !editable && styles.inputDisabled,
              error && styles.inputError,
            ]}
          />
          {secureTextEntry ? (
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setSecureVisible(prev => !prev)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              {secureVisible ? (
                <EyeOffIcon
                  width={pixelWidth(20)}
                  height={pixelWidth(20)}
                  color={colors.textSecondary}
                />
              ) : (
                <EyeIcon
                  width={pixelWidth(20)}
                  height={pixelWidth(20)}
                  color={colors.textSecondary}
                />
              )}
            </TouchableOpacity>
          ) : null}
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    );
  },
);

export default Input;
