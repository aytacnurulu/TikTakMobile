import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { styles } from './Input.styles';

interface InputProps
  extends Pick<
    TextInputProps,
    'secureTextEntry' | 'multiline' | 'keyboardType' | 'onBlur'
  > {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
}

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  multiline,
  keyboardType,
  onBlur,
  error,
}: InputProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textPrimary }]}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor={colors.textPlaceholder}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        keyboardType={keyboardType}
        style={[
          styles.input,
          { backgroundColor: colors.surface, color: colors.textPrimary },
          multiline && styles.multiline,
          error && { borderColor: '#E5484D', borderWidth: 1 },
        ]}
      />
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
    </View>
  );
};

export default Input;
