import { AccountStackParamList } from '@/app/stack/types';
import Button from '@/shared/components/Button';
import Input from '@/shared/components/Input';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelWidth } from '@/shared/utils/metrics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
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
        <Text style={styles.title}>Hesab</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            <Input
              label="Ad Soyad"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Ad, Soyad"
            />
            <Input
              ref={addressInputRef}
              label="Ünvan"
              value={address ?? ''}
              onChangeText={setAddress}
              placeholder="Ünvan"
            />
            <Input
              label="Telefon nömrəsi"
              value={phone}
              onChangeText={setPhone}
              placeholder="(+994) __ / __ / __ / __"
              keyboardType="phone-pad"
            />
            <Input
              label="Şifrə"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Input
              label="Şifrənin təkrarı"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <Button
            title="Yadda saxla"
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


