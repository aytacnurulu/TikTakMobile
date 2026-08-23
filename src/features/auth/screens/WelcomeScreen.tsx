import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/app/stack/types';
import { useTheme } from '@/shared/hooks/useTheme';
import {
  gapVertical,
  pixelFont,
  pixelHeight,
  pixelWidth,
} from '@/shared/utils/metrics';
import Button from '@/shared/components/Button';
import FruitIcon from '@/shared/icons/fruit.svg';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Welcome'
>;

const WelcomeScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.illustrationWrapper}>
        <FruitIcon width={pixelWidth(240)} height={pixelWidth(222)} />
      </View>

      <View style={styles.content}>
        <Text style={[styles.description, { color: colors.textPrimary }]}>
          Sizə daha əlçatan olması üçün qeydiyyatdan keçərək davam edə
          bilərsiniz 
        </Text>

        <Button
          title="Qeydiyyat"
          onPress={() => navigation.navigate('Signup')}
          style={styles.submitButton}
        />

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
  },
});

export default WelcomeScreen;
