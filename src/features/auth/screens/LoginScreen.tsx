import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { AuthStackParamList } from '@/app/stack/types';
import { AUTH_ROUTES } from '@/shared/constants/routes.constants';
import { useTheme } from '@/shared/hooks/useTheme';
import {
  gapVertical,
  pixelFont,
  pixelHeight,
  pixelWidth,
} from '@/shared/utils/metrics';
import Input from '@/shared/components/Input';
import Button from '@/shared/components/Button';
import { ThemeColors } from '@/shared/constants/theme.constants';
import { useLogin } from '@/features/auth/hooks/auth.hooks';
import { LoginPayload } from '@/shared/types/auth.types';
import { ApiErrorResponse } from '@/shared/types/api-response.type';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Login'
>;

const LoginScreen = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { mutate, isPending, error } = useLogin();

  const loginSchema = Yup.object({
    phone: Yup.string().required(t('auth.login.errors.phoneRequired')),
    password: Yup.string()
      .min(6, t('auth.login.errors.passwordMin'))
      .required(t('auth.login.errors.passwordRequired')),
  });

  const errorMessage = axios.isAxiosError<ApiErrorResponse>(error)
    ? error.response?.data?.message
    : undefined;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t('auth.login.title')}</Text>

      <Formik<LoginPayload>
        initialValues={{ phone: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={values => mutate(values)}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <View style={styles.form}>
            <Input
              label={t('auth.login.phoneLabel')}
              placeholder={t('auth.login.phonePlaceholder')}
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              keyboardType="phone-pad"
              error={touched.phone ? errors.phone : undefined}
            />
            <Input
              label={t('auth.login.passwordLabel')}
              placeholder={t('auth.login.passwordPlaceholder')}
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
              title={t('auth.login.submit')}
              onPress={() => handleSubmit()}
              loading={isPending}
              style={styles.submitButton}
            />
          </View>
        )}
      </Formik>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{t('auth.login.noAccount')} </Text>
        <Button
          variant="text"
          title={t('auth.login.signup')}
          onPress={() => navigation.navigate(AUTH_ROUTES.SIGNUP)}
        />
      </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    flex: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: pixelWidth(24),
      backgroundColor: colors.background,
    },
    title: {
      fontSize: pixelFont(24),
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: pixelHeight(40),
      color: colors.textPrimary,
    },
    form: {
      gap: gapVertical(20),
    },
    submitButton: {
      marginTop: pixelHeight(12),
    },
    apiError: {
      fontSize: pixelFont(13),
      color: colors.danger,
      textAlign: 'center',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: pixelHeight(16),
    },
    footerText: {
      fontSize: pixelFont(13),
      color: colors.textSecondary,
    },
  });

export default LoginScreen;
