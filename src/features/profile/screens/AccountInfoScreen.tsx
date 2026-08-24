import { useTheme } from '@/shared/hooks/useTheme';
import { View, Text } from 'react-native';
import { useProfile, useUpdateProfile } from '../hooks/profile.hooks';
import {useState,useEffect} from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ArrowLeftIcon from '@/shared/icons/arrow-left.svg';
import { pixelFont, pixelWidth, gapVertical } from '@/shared/utils/metrics';
import Input from '@/shared/components/Input';
import Button from '@/shared/components/Button';



const AccountInfoScreen = () => {
   const { colors } = useTheme();
  const { data, isPending } = useProfile();
  const user = data?.data;

  const { mutate: updateProfile, isPending: isSaving } = useUpdateProfile();

  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setFullName(user.full_name ?? '');
      setAddress(user.address ?? '');
      setPhone(user.phone ?? '');
    }
  }, [user]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Ad Soyad boş ola bilməz';
    if (!phone.trim()) newErrors.phone = 'Telefon nömrəsi boş ola bilməz';
    if (password && password.length < 6) newErrors.password = 'Şifrə ən azı 6 simvol olmalıdır';
    if (password !== passwordConfirm) newErrors.passwordConfirm = 'Şifrələr uyğun gəlmir';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    updateProfile({
      full_name: fullName,
      address: address || null,
      phone,
      ...(email ? { email } : {}),
      ...(password ? { password } : {}),
    });
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={10}>
          <ArrowLeftIcon width={pixelWidth(22)} height={pixelWidth(22)} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Hesab</Text>
        <View style={{ width: pixelWidth(22) }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.form}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Input
          label="Ad Soyad"
          value={fullName}
          onChangeText={setFullName}
          placeholder="Ad, Soyad"
          error={errors.fullName}
        />

        <Input
          label="Ünvan"
          value={address}
          onChangeText={setAddress}
          placeholder="ünvan"
          error={errors.address}
        />

        <Input
          label="Telefon nömrəsi"
          value={phone}
          onChangeText={setPhone}
          placeholder="(+994) __ / ___ / __ / __"
          keyboardType="phone-pad"
          error={errors.phone}
        />

        <Input
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="E-mail"
          keyboardType="email-address"
          error={errors.email}
        />

        <Input
          label="Şifrə"
          value={password}
          onChangeText={setPassword}
          placeholder="Şifrə"
          secureTextEntry
          error={errors.password}
        />

        <Input
          label="Şifrənin təkrarı"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          placeholder="Şifrənin təkrarı"
          secureTextEntry
          error={errors.passwordConfirm}
        />

        <Button
          label="Yadda saxla"
          onPress={handleSave}
          loading={isSaving}
          style={styles.saveButton}
        />
      </ScrollView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: pixelWidth(8),
  },
  title: {
    fontSize: pixelFont(18),
    fontWeight: '700',
  },
  form: {
    gap: gapVertical(16),
    paddingTop: pixelWidth(20),
    paddingBottom: pixelWidth(32),
  },
  saveButton: {
    marginTop: pixelWidth(12),
  },

export default AccountInfoScreen;
