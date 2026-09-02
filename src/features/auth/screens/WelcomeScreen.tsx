import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
import { ThemeColors } from '@/shared/constants/theme.constants';
import Button from '@/shared/components/Button';
import FruitIcon from '@/shared/icons/fruit.svg';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Welcome'
>;

const WelcomeScreen = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation();
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.illustrationWrapper}>
        <FruitIcon width={pixelWidth(240)} height={pixelWidth(222)} />
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>{t('auth.welcome.description')}</Text>

        <Button
          title={t('auth.welcome.signup')}
          onPress={() => navigation.navigate(AUTH_ROUTES.SIGNUP)}
          style={styles.submitButton}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {t('auth.welcome.haveAccount')}{' '}
          </Text>
          <Button
            variant="text"
            title={t('auth.welcome.login')}
            onPress={() => navigation.navigate(AUTH_ROUTES.LOGIN)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: pixelWidth(24),
      backgroundColor: colors.background,
    },
    illustrationWrapper: {
      alignItems: 'center',
    },
    content: {
      marginTop: pixelHeight(48),
      gap: gapVertical(20),
    },
    description: {
      fontSize: pixelFont(15),
      textAlign: 'center',
      lineHeight: pixelFont(22),
      color: colors.textPrimary,
    },
    submitButton: {
      marginTop: pixelHeight(8),
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    footerText: {
      fontSize: pixelFont(13),
      color: colors.textSecondary,
    },
  });

export default WelcomeScreen;
