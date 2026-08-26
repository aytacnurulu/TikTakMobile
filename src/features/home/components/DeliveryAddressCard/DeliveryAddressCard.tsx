import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '@/app/stack/types';
import { useTheme } from '@/shared/hooks/useTheme';
import Button from '@/shared/components/Button';
import { useProfile } from '@/shared/hooks/profile.hooks';
import { styles } from './DeliveryAddressCard.styles';

type DeliveryAddressNavigationProp = BottomTabNavigationProp<MainTabParamList>;

const DeliveryAddressCard = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<DeliveryAddressNavigationProp>();
  const { data } = useProfile();
  const address = data?.data?.address;

  const handleAddAddress = () => {
    navigation.navigate('Account', {
      screen: 'AccountInfo',
      params: { focusField: 'address' },
    });
  };

  if (!address) {
    return (
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <Text style={[styles.label, { color: colors.textPrimary }]}>
          {t('home.deliveryAddress')}
        </Text>
        <Button
          title="Çatdırılma ünvanı əlavə et"
          variant="text"
          onPress={handleAddAddress}
          style={styles.addButton}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.label, { color: colors.textPrimary }]}>
        {t('home.deliveryAddress')}
      </Text>
      <Text
        style={[styles.address, { color: colors.textSecondary }]}
        numberOfLines={1}
      >
        {address}
      </Text>
    </View>
  );
};

export default DeliveryAddressCard;
