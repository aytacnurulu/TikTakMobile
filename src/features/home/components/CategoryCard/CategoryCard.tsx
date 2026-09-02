import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@/app/stack/types';
import { useTheme } from '@/shared/hooks/useTheme';
import { Category } from '@/shared/types/category.type';
import { createStyles } from './CategoryCard.styles';

type CategoryCardNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'Home'
>;

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation<CategoryCardNavigationProp>();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate('Products', {
          categoryId: category.id,
          categoryName: category.name,
        })
      }
    >
      <Image source={{ uri: category.img_url }} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
