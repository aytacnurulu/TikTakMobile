import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { pixelHeight, pixelWidth } from '@/shared/utils/metrics';
import Button from '@/shared/components/Button';

const AccountScreen = () => {
  const logout = useAuthStore(state => state.logout);

  return (
    <View style={styles.container}>
      <Text>AccountScreen</Text>
      <Button title="Log out" onPress={logout} style={styles.logoutButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: pixelWidth(16),
  },
  logoutButton: {
    marginTop: pixelHeight(24),
  },
});

export default AccountScreen;
