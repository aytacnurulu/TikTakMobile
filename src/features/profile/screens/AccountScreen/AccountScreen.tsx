import React from 'react';
import { useAuthStore } from '@/shared/store/auth.store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AccountStackParamList } from '@/app/stack/types';
import { useTheme } from '@/shared/hooks/useTheme';
import { createStyles } from './AccountScreen.styles';
import { useProfile } from '../../hooks/profile.hooks';
import AccountIcon from '@/shared/icons/account.svg';
import UserImageIcon from '@/shared/icons/user-image.svg'
import HeartIcon from '@/shared/icons/heart.svg';
import BasketIcon from '@/shared/icons/basket.svg';
import LogoutIcon from '@/shared/icons/logout.svg';
import AccountMenuItem from '../../components/AccountMenuItem/AccountMenuItem';
import { pixelWidth } from '@/shared/utils/metrics';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


type Props = NativeStackScreenProps<AccountStackParamList, 'Account'>;

const menuItems: {
  id: string;
  label: string;
  Icon: React.FC<any>;
  route: keyof AccountStackParamList | null;
}[] = [
  { id: 'info', label: 'Hesab məlumatlarım', Icon: AccountIcon, route: 'AccountInfo' },
  { id: 'favorites', label: 'Siyahılarım', Icon: HeartIcon, route: 'Favorites' },
  { id: 'orders', label: 'Sifariş tarixçəsi', Icon: BasketIcon, route: 'OrderHistory' },
  { id: 'logout', label: 'Çıxış', Icon: LogoutIcon, route: null },
];

const AccountScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { data, isPending } = useProfile();
  const user = data?.data;
  const logout = useAuthStore(state => state.logout);

  const handleItemPress = (route: keyof AccountStackParamList | null) => {
    if (route) {
      navigation.navigate(route as any);
    } else {
      logout();
    }
  };

  if (isPending) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loader}>
          <ActivityIndicator color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hesabım</Text>

      <View style={styles.profileHeader}>
        {user?.img_url ? (
          <Image source={{ uri: user.img_url }} style={styles.avatar}  resizeMode="cover"/>
        ) : (
          <View style={styles.avatarPlaceholder}>
            <UserImageIcon width={pixelWidth(152)} height={pixelWidth(152)} color={colors.background ?? '#ffffff'} />
          </View>
        )}
        <Text style={styles.name}>{user?.full_name}</Text>
        <Text style={styles.phone}>{user?.phone}</Text>
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


export default AccountScreen;
