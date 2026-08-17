import React from 'react';
import {  FlatList, Pressable, StyleSheet, Text } from 'react-native';
import Button from '../../../shared/components/Button';
import { useLogout } from '../../auth/hooks/auth.hooks';
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
  const logout = useLogout();
  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Text>Sample Card</Text>
      </Card>
      <Card>
        <Text>Sample Card</Text>
      </Card>
      <Button title="Logout" onPress={logout} />
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
