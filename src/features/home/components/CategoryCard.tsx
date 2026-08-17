import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@/app/stack/types';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';
import { Category } from '@/features/home/types/category.types';

type CategoryCardNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'Home'
>;

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { colors } = useTheme();
  const navigation = useNavigation<CategoryCardNavigationProp>();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.background, borderColor: colors.border },
      ]}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate('Products', {
          categoryId: category.id,
          categoryName: category.name,
        })
      }
    >
      <Image source={{ uri: category.img_url }} style={styles.image} />
      <Text
        style={[styles.name, { color: colors.textPrimary }]}
        numberOfLines={1}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: pixelWidth(6),
    borderRadius: pixelWidth(12),
    borderWidth: 1,
    paddingVertical: pixelHeight(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: pixelWidth(56),
    height: pixelWidth(56),
    borderRadius: pixelWidth(8),
    resizeMode: 'cover',
  },
  name: {
    marginTop: pixelHeight(8),
    fontSize: pixelFont(12),
    fontWeight: '500',
  },
});

export default CategoryCard;
