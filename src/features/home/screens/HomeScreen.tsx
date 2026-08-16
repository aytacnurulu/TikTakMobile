import React from 'react';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../app/stack/types';
import { useCategories } from '../hooks/category.hooks';
import { Category } from '../types/category.types';
import Card from '../../../shared/components/Card';
type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'Home'
>;

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Text>Sample Card</Text>
      </Card>
      <Card>
        <Text>Sample Card</Text>
      </Card>
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tile: {
    flex: 1,
    margin: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  tileLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
});

export default HomeScreen;
