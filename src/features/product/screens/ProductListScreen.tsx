import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '@/app/stack/types';

type ProductListScreenRouteProp = RouteProp<HomeStackParamList, 'Products'>;

const ProductListScreen = () => {
  const { params } = useRoute<ProductListScreenRouteProp>();

  return (
    <View>
      <Text>{params.categoryName}</Text>
    </View>
  );
};

export default ProductListScreen;
