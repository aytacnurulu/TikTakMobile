import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';
import SearchIcon from '@/shared/icons/search.svg';
import CloseIcon from '@/shared/icons/close.svg';

interface SearchBarProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChangeText, placeholder }: SearchBarProps) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <SearchIcon
        width={pixelWidth(18)}
        height={pixelWidth(18)}
        fill={colors.textPlaceholder}
        color={colors.textPlaceholder}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textPlaceholder}
        style={[styles.input, { color: colors.textPrimary }]}
        returnKeyType="search"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')} hitSlop={8}>
          <CloseIcon
            width={pixelWidth(16)}
            height={pixelWidth(16)}
            fill={colors.textPlaceholder}
            color={colors.textPlaceholder}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: pixelWidth(8),
    borderRadius: pixelWidth(12),
    paddingHorizontal: pixelWidth(14),
    marginBottom: pixelHeight(12),
  },
  input: {
    flex: 1,
    fontSize: pixelFont(14),
    paddingVertical: pixelHeight(12),
  },
});

export default SearchBar;
