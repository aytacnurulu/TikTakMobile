import React, { useState } from 'react';
import axios from 'axios';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '@/app/stack/types';
import ScreenHeader from '@/shared/components/ScreenHeader';
import Button from '@/shared/components/Button';
import { useTheme } from '@/shared/hooks/useTheme';
import { useAuthStore } from '@/shared/store/auth.store';
import { useBasket } from '@/shared/hooks/basket.hooks';
import { useCreateOrder } from '@/features/basket/hooks/order.hooks';
import { PaymentMethod } from '@/features/basket/types/order.types';
import { useLocaleStore } from '@/shared/store/locale.store';
import { formatPrice } from '@/shared/utils/currency';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';

const CheckoutScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const profile = useAuthStore(state => state.profile);
  const locale = useLocaleStore(state => state.locale);
  const { data } = useBasket();
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const createOrder = useCreateOrder();
  const items = data?.data.items ?? [];
  const total = data?.data.total ?? '0';
  const orderErrorMessage = axios.isAxiosError(createOrder.error)
    ? createOrder.error.response?.data?.message ?? createOrder.error.message
    : createOrder.error instanceof Error
    ? createOrder.error.message
    : t('checkout.errorFallback');

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScreenHeader
        title={t('basket.checkout')}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.customerDetails}>
          <Text style={[styles.label, { color: colors.textPrimary }]}>
            {t('checkout.nameLabel')}
          </Text>
          <Text style={[styles.value, { color: colors.textSecondary }]}>
            {profile?.full_name ?? t('checkout.namePlaceholder')}
          </Text>

          <Text
            style={[
              styles.label,
              styles.spacedLabel,
              { color: colors.textPrimary },
            ]}
          >
            {t('checkout.addressLabel')}
          </Text>
          <Text style={[styles.value, { color: colors.textSecondary }]}>
            {profile?.address ?? t('checkout.addressPlaceholder')}
          </Text>

          <Text
            style={[
              styles.label,
              styles.spacedLabel,
              { color: colors.textPrimary },
            ]}
          >
            {t('checkout.phoneLabel')}
          </Text>
          <Text style={[styles.value, { color: colors.textSecondary }]}>
            {profile?.phone ?? t('checkout.phonePlaceholder')}
          </Text>
        </View>

        <Text
          style={[
            styles.label,
            styles.addressLabel,
            { color: colors.textPrimary },
          ]}
        >
          {t('checkout.noteLabel')}
        </Text>
        <TextInput
          value={note}
          onChangeText={setNote}
          multiline
          textAlignVertical="top"
          placeholder=""
          placeholderTextColor={colors.textPlaceholder}
          style={[
            styles.addressInput,
            { backgroundColor: colors.surface, color: colors.textPrimary },
          ]}
        />

        <View style={styles.paymentOptions}>
          <PaymentOption
            label={t('checkout.cash')}
            selected={paymentMethod === 'cash'}
            color={colors.primary}
            onPress={() => setPaymentMethod('cash')}
          />
          <PaymentOption
            label={t('checkout.card')}
            selected={paymentMethod === 'card'}
            color={colors.primary}
            onPress={() => setPaymentMethod('card')}
          />
        </View>

        <View
          style={[styles.orderSummary, { backgroundColor: colors.surface }]}
        >
          {items.map(item => (
            <View key={item.id} style={styles.orderRow}>
              <Text
                style={[styles.orderItem, { color: colors.textPrimary }]}
                numberOfLines={1}
              >
                {item.quantity} x {item.product.title}
              </Text>
              <Text style={[styles.orderPrice, { color: colors.textPrimary }]}>
                {formatPrice(item.total_price, locale)}
              </Text>
            </View>
          ))}
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.summaryRow}>
            <View>
              <Text style={[styles.summaryText, { color: colors.textPrimary }]}>
                {t('basket.total')}: {formatPrice(total, locale)}
              </Text>
              <Text style={[styles.summaryText, { color: colors.textPrimary }]}>
                {t('basket.delivery')}: {t('basket.free')}
              </Text>
            </View>
            <View style={styles.totalBlock}>
              <Text style={[styles.totalLabel, { color: colors.textPrimary }]}>
                {t('basket.grandTotal')}:
              </Text>
              <Text style={[styles.totalValue, { color: colors.textPrimary }]}>
                {formatPrice(total, locale)}
              </Text>
            </View>
          </View>
        </View>

        <Button
          title={t('basket.checkout')}
          onPress={() =>
            createOrder.mutate(
              {
                address: profile?.address ?? '',
                ...(note.trim() ? { note: note.trim() } : {}),
                payment_method: paymentMethod,
              },
              { onSuccess: () => navigation.navigate('OrderSuccess') },
            )
          }
          disabled={items.length === 0 || createOrder.isPending}
          loading={createOrder.isPending}
          style={styles.submitButton}
        />
        {createOrder.isError ? (
          <Text style={styles.errorText}>{orderErrorMessage}</Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

interface PaymentOptionProps {
  label: string;
  selected: boolean;
  color: string;
  onPress: () => void;
}

const PaymentOption = ({
  label,
  selected,
  color,
  onPress,
}: PaymentOptionProps) => (
  <TouchableOpacity
    style={styles.paymentOption}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View
      style={[
        styles.radio,
        selected ? styles.radioSelected : styles.radioUnselected,
      ]}
    >
      {selected ? (
        <View style={[styles.radioDot, { backgroundColor: color }]} />
      ) : null}
    </View>
    <Text
      style={[
        styles.paymentLabel,
        selected ? styles.paymentSelected : styles.paymentUnselected,
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: pixelWidth(16),
  },
  scrollContent: {
    paddingTop: pixelHeight(18),
    paddingBottom: pixelHeight(10),
  },
  customerDetails: {
    paddingHorizontal: pixelWidth(4),
  },
  label: {
    fontSize: pixelFont(13),
    fontWeight: '600',
  },
  spacedLabel: {
    marginTop: pixelHeight(22),
  },
  value: {
    marginTop: pixelHeight(4),
    fontSize: pixelFont(13),
  },
  radioSelected: {
    borderColor: '#76CB4F',
  },
  radioUnselected: {
    borderColor: '#E5E5EA',
  },
  addressLabel: {
    marginTop: pixelHeight(22),
    marginHorizontal: pixelWidth(4),
  },
  addressInput: {
    minHeight: pixelHeight(92),
    borderRadius: pixelWidth(10),
    marginTop: pixelHeight(10),
    paddingHorizontal: pixelWidth(14),
    paddingVertical: pixelHeight(12),
    fontSize: pixelFont(14),
  },
  paymentOptions: {
    marginTop: pixelHeight(16),
    gap: pixelHeight(14),
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: pixelHeight(20),
  },
  radio: {
    width: pixelWidth(22),
    height: pixelWidth(22),
    borderRadius: pixelWidth(11),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: pixelWidth(14),
  },
  radioDot: {
    width: pixelWidth(12),
    height: pixelWidth(12),
    borderRadius: pixelWidth(6),
  },
  paymentLabel: {
    fontSize: pixelFont(14),
  },
  paymentSelected: {
    color: '#76CB4F',
  },
  paymentUnselected: {
    color: '#858692',
  },
  orderSummary: {
    borderRadius: pixelWidth(10),
    marginHorizontal: -pixelWidth(16),
    marginTop: pixelHeight(44),
    paddingHorizontal: pixelWidth(20),
    paddingTop: pixelHeight(20),
    paddingBottom: pixelHeight(16),
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: pixelHeight(26),
  },
  orderItem: {
    flex: 1,
    fontSize: pixelFont(13),
    marginRight: pixelWidth(12),
  },
  orderPrice: {
    fontSize: pixelFont(13),
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: pixelHeight(14),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryText: {
    fontSize: pixelFont(12),
    lineHeight: pixelFont(18),
  },
  totalBlock: {
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: pixelFont(13),
    fontWeight: '700',
  },
  totalValue: {
    marginTop: pixelHeight(2),
    fontSize: pixelFont(14),
    fontWeight: '800',
  },
  submitButton: {
    marginTop: pixelHeight(12),
  },
  errorText: {
    marginTop: pixelHeight(8),
    color: '#E5484D',
    fontSize: pixelFont(12),
    textAlign: 'center',
  },
});

export default CheckoutScreen;
