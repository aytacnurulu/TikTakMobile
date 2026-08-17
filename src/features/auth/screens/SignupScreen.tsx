import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthStackParamList } from '../../../app/stack/types';
import { useTheme } from '../../../shared/hooks/useTheme';
import {
  gapVertical,
  pixelFont,
  pixelHeight,
  pixelWidth,
} from '../../../shared/utils/metrics';
import Input from '../../../shared/components/Input';
import Button from '../../../shared/components/Button';
import { useRegister } from '../hooks/auth.hooks';
import { SignupPayload } from '../types/auth.types';
import { ApiErrorResponse } from '../../../shared/types/api-response.type';

type SignupScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Signup'
>;

const signupSchema = Yup.object({
  full_name: Yup.string().required('Ad, soyad tələb olunur'),
  phone: Yup.string().required('Telefon nömrəsi tələb olunur'),
  password: Yup.string()
    .min(6, 'Parol ən azı 6 simvol olmalıdır')
    .required('Parol tələb olunur'),
});

const SignupScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const { mutate, isPending, error } = useRegister();

  const errorMessage = axios.isAxiosError<ApiErrorResponse>(error)
    ? error.response?.data?.message
    : undefined;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        Qeydiyyatdan keç
      </Text>

      <Formik<SignupPayload>
        initialValues={{ full_name: '', phone: '', password: '' }}
        validationSchema={signupSchema}
        onSubmit={values => mutate(values)}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <View style={styles.form}>
            <Input
              label="Ad, soyad"
              placeholder="ad soyad"
              value={values.full_name}
              onChangeText={handleChange('full_name')}
              onBlur={handleBlur('full_name')}
              error={touched.full_name ? errors.full_name : undefined}
            />
            <Input
              label="Telefon"
              placeholder="telefon"
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              keyboardType="phone-pad"
              error={touched.phone ? errors.phone : undefined}
            />
            <Input
              label="Parol"
              placeholder="parol"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
              error={touched.password ? errors.password : undefined}
            />

            {errorMessage ? (
              <Text style={styles.apiError}>{errorMessage}</Text>
            ) : null}

            <Button
              title="Qeydiyyat"
              onPress={() => handleSubmit()}
              loading={isPending}
              style={styles.submitButton}
            />
          </View>
        )}
      </Formik>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          Hesabınız varsa{' '}
        </Text>
        <Button
          variant="text"
          title="Daxil olun"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: pixelWidth(24),
  },
  title: {
    fontSize: pixelFont(24),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: pixelHeight(40),
  },
  form: {
    gap: gapVertical(20),
  },
  submitButton: {
    marginTop: pixelHeight(12),
  },
  apiError: {
    fontSize: pixelFont(13),
    color: '#E5484D',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: pixelHeight(16),
  },
  footerText: {
    fontSize: pixelFont(13),
  },
});

export default SignupScreen;
