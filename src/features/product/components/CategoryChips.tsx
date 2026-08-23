import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { gapHorizontal, pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';
import { useCategories } from '@/shared/hooks/category.hooks';
import { Category } from '@/shared/types/category.type';

interface CategoryChipsProps {
  selectedCategoryId: number;
  onSelect: (category: Category) => void;
}

const CategoryChips = ({ selectedCategoryId, onSelect }: CategoryChipsProps) => {
  const { colors } = useTheme();
  const { data } = useCategories();
  const categories = data?.data ?? [];

  return (
    <FlatList
      data={categories}
      horizontal
      keyExtractor={item => String(item.id)}
      showsHorizontalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => {
        const isSelected = item.id === selectedCategoryId;

        return (
          <TouchableOpacity
            style={[
              styles.chip,
              {
                backgroundColor: isSelected ? colors.primary : colors.background,
                borderColor: isSelected ? colors.primary : colors.border,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => onSelect(item)}
          >
            <Text
              style={[
                styles.label,
                { color: isSelected ? colors.textOnPrimary : colors.textPrimary },
              ]}
              numberOfLines={1}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flexGrow: 0,
    flexShrink: 0,
  },
  listContent: {
    gap: gapHorizontal(8),
    paddingVertical: pixelHeight(12),
  },
  chip: {
    paddingHorizontal: pixelWidth(14),
    paddingVertical: pixelHeight(8),
    borderRadius: pixelWidth(10),
    borderWidth: 1,
  },
  label: {
    fontSize: pixelFont(13),
    fontWeight: '600',
  },
});

export default CategoryChips;
