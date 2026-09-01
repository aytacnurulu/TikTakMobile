import { AccountStackParamList } from '@/app/stack/types';
import Button from '@/shared/components/Button';
import Input from '@/shared/components/Input';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelWidth } from '@/shared/utils/metrics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BackIcon from '@/shared/icons/chevron-left.svg';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyles } from '../AccountInfoScreen/AccountInfoScreen.styles';
import { useProfile, useUpdateProfile } from '@/shared/hooks/profile.hooks';


type Props = NativeStackScreenProps<AccountStackParamList, 'AccountInfo'>;


const AccountInfoScreen = ({ navigation, route }: Props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(colors);
  const { data, isPending } = useProfile();
  const user = data?.data;

  const [fullName, setFullName] = useState(user?.full_name ?? '');
  const [address, setAddress] = useState(user?.address ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const addressInputRef = useRef<TextInput>(null);
  const focusField = route.params?.focusField;

  useEffect(() => {
    if (focusField === 'address' && !isPending) {
      const timeout = setTimeout(() => addressInputRef.current?.focus(), 300);
      return () => clearTimeout(timeout);
    }
  }, [focusField, isPending]);

  const { mutate: updateProfile, isPending: isSaving } = useUpdateProfile();

const handleSave = () => {
  if (password && password !== confirmPassword) {
    // error state göstər, göndərmə
    return;
  }

  updateProfile({
    full_name: fullName,
    address,
    img_url: user?.img_url ?? null,  
    ...(password
      ? { password, password_repeat: confirmPassword }
      : {}),
  });
};

  if (isPending) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator color={colors.primary} />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <BackIcon width={pixelWidth(18)} height={pixelWidth(11)} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('accountInfo.title')}</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            <Input
              label={t('accountInfo.fullNameLabel')}
              value={fullName}
              onChangeText={setFullName}
              placeholder={t('accountInfo.fullNamePlaceholder')}
            />
            <Input
              ref={addressInputRef}
              label={t('accountInfo.addressLabel')}
              value={address ?? ''}
              onChangeText={setAddress}
              placeholder={t('accountInfo.addressPlaceholder')}
            />
            <Input
              label={t('accountInfo.phoneLabel')}
              value={phone}
              onChangeText={setPhone}
              placeholder={t('accountInfo.phonePlaceholder')}
              keyboardType="phone-pad"
            />
            <Input
              label={t('accountInfo.passwordLabel')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Input
              label={t('accountInfo.passwordRepeatLabel')}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <Button
            title={t('accountInfo.save')}
            onPress={handleSave}
            loading={isSaving}
            disabled={isSaving}
            style={styles.button}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AccountInfoScreen;


