import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/app/stack/types';
import ScreenHeader from '@/shared/components/ScreenHeader';
import { useTheme } from '@/shared/hooks/useTheme';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';

const OrderSuccessScreen = () => {
  const { colors } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('Main', {
        screen: 'AccountTab',
        params: { screen: 'OrderHistory' },
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScreenHeader
        title="Sifarişi tamamla"
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <View
          style={[styles.successBadge, { backgroundColor: colors.surface }]}
        >
          <View
            style={[styles.successCircle, { backgroundColor: colors.primary }]}
          >
            <View style={styles.checkMark}>
              <View style={styles.checkShort} />
              <View style={styles.checkLong} />
            </View>
          </View>
        </View>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Sifariş uğurla tamamlandı
        </Text>
        <Text style={[styles.message, { color: colors.textSecondary }]}>
          Əməkdaşlarımız sizinlə əlaqə saxlayıb sifarişinizi göndərəcəklər.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: pixelWidth(16),
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: pixelHeight(54),
  },
  successBadge: {
    width: pixelWidth(140),
    height: pixelWidth(140),
    borderRadius: pixelWidth(70),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: pixelHeight(42),
  },
  successCircle: {
    width: pixelWidth(116),
    height: pixelWidth(116),
    borderRadius: pixelWidth(58),
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    width: pixelWidth(58),
    height: pixelWidth(50),
    position: 'relative',
  },
  checkShort: {
    position: 'absolute',
    width: pixelWidth(24),
    height: pixelWidth(9),
    borderRadius: pixelWidth(2),
    backgroundColor: '#FFFFFF',
    left: pixelWidth(4),
    top: pixelWidth(27),
    transform: [{ rotate: '45deg' }],
  },
  checkLong: {
    position: 'absolute',
    width: pixelWidth(47),
    height: pixelWidth(9),
    borderRadius: pixelWidth(2),
    backgroundColor: '#FFFFFF',
    left: pixelWidth(20),
    top: pixelWidth(19),
    transform: [{ rotate: '-45deg' }],
  },
  title: {
    fontSize: pixelFont(18),
    fontWeight: '700',
    textAlign: 'center',
  },
  message: {
    maxWidth: pixelWidth(280),
    marginTop: pixelHeight(8),
    fontSize: pixelFont(14),
    lineHeight: pixelFont(20),
    textAlign: 'center',
  },
});

export default OrderSuccessScreen;
