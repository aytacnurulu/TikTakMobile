import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/shared/store/auth.store';
import ConfirmModal from '@/shared/components/ConfirmModal';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AccountStackParamList } from '@/app/stack/types';
import { useTheme } from '@/shared/hooks/useTheme';
import { createStyles } from './AccountScreen.styles';
import { useProfile } from '@/shared/hooks/profile.hooks';
import AccountIcon from '@/shared/icons/account.svg';
import UserImageIcon from '@/shared/icons/user-image.svg'
import HeartIcon from '@/shared/icons/heart.svg';
import BasketIcon from '@/shared/icons/basket.svg';
import LogoutIcon from '@/shared/icons/logout.svg';
import SettingsIcon from '@/shared/icons/settings.svg';
import AccountMenuItem from '../../components/AccountMenuItem/AccountMenuItem';
import { pixelWidth } from '@/shared/utils/metrics';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


type Props = NativeStackScreenProps<AccountStackParamList, 'Account'>;

const menuItems: {
  id: string;
  labelKey: string;
  Icon: React.FC<any>;
  route: keyof AccountStackParamList | null;
}[] = [
  { id: 'info', labelKey: 'account.menu.info', Icon: AccountIcon, route: 'AccountInfo' },
  { id: 'favorites', labelKey: 'account.menu.favorites', Icon: HeartIcon, route: 'Favorites' },
  { id: 'orders', labelKey: 'account.menu.orders', Icon: BasketIcon, route: 'OrderHistory' },
  { id: 'settings', labelKey: 'account.menu.settings', Icon: SettingsIcon, route: 'Settings' },
  { id: 'logout', labelKey: 'account.menu.logout', Icon: LogoutIcon, route: null },
];

const AccountScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(colors);
  const { data, isPending } = useProfile();
  const user = data?.data;
  const logout = useAuthStore(state => state.logout);
  const [logoutVisible, setLogoutVisible] = useState(false);

  const handleItemPress = (route: keyof AccountStackParamList | null) => {
    if (route) {
      navigation.navigate(route as any);
    } else {
      setLogoutVisible(true);
    }
  };

  const confirmLogout = () => {
    setLogoutVisible(false);
    logout();
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
      <Text style={styles.title}>{t('account.title')}</Text>

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
            label={t(item.labelKey)}
            onPress={() => handleItemPress(item.route)}
          />
        ))}
      </View>

      <ConfirmModal
        visible={logoutVisible}
        title={t('account.logoutConfirmTitle')}
        message={t('account.logoutConfirmMessage')}
        confirmLabel={t('account.logout')}
        cancelLabel={t('common.cancel')}
        destructive
        onConfirm={confirmLogout}
        onCancel={() => setLogoutVisible(false)}
      />
    </SafeAreaView>
  );
};


export default AccountScreen;
