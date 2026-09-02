import React, { useState } from 'react';
import axios from 'axios';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '@/app/stack/types';
import ScreenContainer from '@/shared/components/ScreenContainer';
import Button from '@/shared/components/Button';
import OrderSummary from '@/shared/components/OrderSummary';
import { useTheme } from '@/shared/hooks/useTheme';
import { useAuthStore } from '@/shared/store/auth.store';
import { useBasket } from '@/shared/hooks/basket.hooks';
import { useCreateOrder } from '@/features/basket/hooks/order.hooks';
import { PaymentMethod } from '@/shared/types/order.types';
import { useLocaleStore } from '@/shared/store/locale.store';
import { formatPrice } from '@/shared/utils/currency';
import { createStyles, CheckoutStyles } from './CheckoutScreen.styles';

const CheckoutScreen = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const profile = useAuthStore(state => state.profile);
  const locale = useLocaleStore(state => state.locale);
  const { data } = useBasket();
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CASH');
  const createOrder = useCreateOrder();
  const items = data?.data.items ?? [];
  const total = data?.data.total ?? '0';
  const orderErrorMessage = axios.isAxiosError(createOrder.error)
    ? createOrder.error.response?.data?.message ?? createOrder.error.message
    : createOrder.error instanceof Error
      ? createOrder.error.message
      : t('checkout.errorFallback');

  return (
    <ScreenContainer title={t('basket.checkout')}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.customerDetails}>
          <Text style={styles.label}>{t('checkout.nameLabel')}</Text>
          <Text style={styles.value}>
            {profile?.full_name ?? t('checkout.namePlaceholder')}
          </Text>

          <Text style={[styles.label, styles.spacedLabel]}>
            {t('checkout.addressLabel')}
          </Text>
          <Text style={styles.value}>
            {profile?.address ?? t('checkout.addressPlaceholder')}
          </Text>

          <Text style={[styles.label, styles.spacedLabel]}>
            {t('checkout.phoneLabel')}
          </Text>
          <Text style={styles.value}>
            {profile?.phone ?? t('checkout.phonePlaceholder')}
          </Text>
        </View>

        <Text style={[styles.label, styles.addressLabel]}>
          {t('checkout.noteLabel')}
        </Text>
        <TextInput
          value={note}
          onChangeText={setNote}
          multiline
          textAlignVertical="top"
          placeholderTextColor={colors.textPlaceholder}
          style={styles.addressInput}
        />

        <View style={styles.paymentOptions}>
          <PaymentOption
            label={t('checkout.cash')}
            selected={paymentMethod === 'CASH'}
            onPress={() => setPaymentMethod('CASH')}
            styles={styles}
          />
          <PaymentOption
            label={t('checkout.card')}
            selected={paymentMethod === 'CARD'}
            onPress={() => setPaymentMethod('CARD')}
            styles={styles}
          />
        </View>

        <View style={styles.orderSummary}>
          {items.map(item => (
            <View key={item.id} style={styles.orderRow}>
              <Text style={styles.orderItem} numberOfLines={1}>
                {item.quantity} x {item.product.title}
              </Text>
              <Text style={styles.orderPrice}>
                {formatPrice(item.total_price, locale)}
              </Text>
            </View>
          ))}
          <OrderSummary total={total} divider />
        </View>

        <Button
          title={t('basket.checkout')}
          onPress={() =>
            createOrder.mutate(
              {
                address: profile?.address ?? '',
                phone: profile?.phone ?? '',
                ...(note.trim() ? { note: note.trim() } : {}),
                paymentMethod,
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
    </ScreenContainer>
  );
};

interface PaymentOptionProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  styles: CheckoutStyles;
}

const PaymentOption = ({
  label,
  selected,
  onPress,
  styles,
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
      {selected ? <View style={styles.radioDot} /> : null}
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

export default CheckoutScreen;
