import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '@/app/stack/types';
import {
  ACCOUNT_ROUTES,
  ROOT_ROUTES,
  TAB_ROUTES,
} from '@/shared/constants/routes.constants';
import ScreenContainer from '@/shared/components/ScreenContainer';
import { useTheme } from '@/shared/hooks/useTheme';
import { createStyles } from './OrderSuccessScreen.styles';

const OrderSuccessScreen = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: ROOT_ROUTES.MAIN,
            state: {
              routes: [
                {
                  name: TAB_ROUTES.ACCOUNT,
                  state: {
                    index: 1,
                    routes: [
                      { name: ACCOUNT_ROUTES.ACCOUNT },
                      { name: ACCOUNT_ROUTES.ORDER_HISTORY },
                    ],
                  },
                },
              ],
            },
          },
        ],
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <ScreenContainer title={t('basket.checkout')}>
      <View style={styles.content}>
        <View style={styles.successBadge}>
          <View style={styles.successCircle}>
            <View style={styles.checkMark}>
              <View style={styles.checkShort} />
              <View style={styles.checkLong} />
            </View>
          </View>
        </View>
        <Text style={styles.title}>{t('orderSuccess.title')}</Text>
        <Text style={styles.message}>{t('orderSuccess.message')}</Text>
      </View>
    </ScreenContainer>
  );
};

export default OrderSuccessScreen;
