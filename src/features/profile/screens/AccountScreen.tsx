import React from 'react';
import AccountIcon from '@/shared/icons/account.svg';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { pixelFont, pixelWidth } from '@/shared/utils/metrics';
import HeartIcon from '@/shared/icons/heart.svg';
import BasketIcon from '@/shared/icons/basket.svg';
import LogoutIcon from '@/shared/icons/logout.svg';
import { useTheme } from '@/shared/hooks/useTheme';
import { useProfile } from '../hooks/profile.hooks';
import AccountMenuItem from '../components/AccountMenuItem';
import { useAuthStore } from '@/shared/store/auth.store';

const menuItems = [
  { id: 'info', label: 'Hesab məlumatlarım', Icon: AccountIcon, route: 'AccountInfoScreen' as const },
  { id: 'favorites', label: 'Siyahılarım', Icon: HeartIcon, route: 'FavoritesScreen' as const },
  { id: 'orders', label: 'Sifariş tarixçəsi', Icon: BasketIcon, route: 'OrderHistoryScreen' as const },
  { id: 'logout', label: 'Çıxış', Icon: LogoutIcon, route: null },
];

const AccountScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const { data, isPending } = useProfile();
  const user = data?.data;
   const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    logout(); 
  };

  const handleItemPress = (route: string | null) => {
    if (route) {
      navigation.navigate(route);
    } else {
      handleLogout();
    }
  };

  if (isPending) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loader}>
          <ActivityIndicator color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>Hesabım</Text>

      <View style={styles.profileHeader}>
        {user?.img_url ? (
          <Image source={{ uri: user.img_url }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatarPlaceholder, { backgroundColor: colors.surface }]}>
            <AccountIcon width={pixelWidth(32)} height={pixelWidth(32)} color={colors.textSecondary} />
          </View>
        )}
        <Text style={[styles.name, { color: colors.textPrimary }]}>{user?.full_name}</Text>
        <Text style={[styles.phone, { color: colors.textSecondary }]}>{user?.phone}</Text>
      </View>

      <View style={styles.menuList}>
        {menuItems.map(item => (
          <AccountMenuItem
            key={item.id}
            Icon={item.Icon}
            label={item.label}
            onPress={() => handleItemPress(item.route)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: pixelWidth(16),
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: pixelFont(20),
    fontWeight: '700',
    textAlign: 'center',
    marginTop: pixelWidth(8),
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: pixelWidth(24),
    marginBottom: pixelWidth(16),
  },
  avatar: {
    width: pixelWidth(88),
    height: pixelWidth(88),
    borderRadius: pixelWidth(44),
  },
  avatarPlaceholder: {
    width: pixelWidth(88),
    height: pixelWidth(88),
    borderRadius: pixelWidth(44),
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: pixelFont(16),
    fontWeight: '600',
    marginTop: pixelWidth(12),
  },
  phone: {
    fontSize: pixelFont(13),
    marginTop: pixelWidth(4),
  },
  menuList: {
    marginTop: pixelWidth(8),
  },
});

export default AccountScreen;
