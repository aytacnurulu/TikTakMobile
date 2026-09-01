import { StyleSheet } from 'react-native';
import { pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';
import { ThemeColors } from '@/shared/constants/theme.constants';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
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
      color: colors.textPrimary,
    },
    spacedLabel: {
      marginTop: pixelHeight(22),
    },
    value: {
      marginTop: pixelHeight(4),
      fontSize: pixelFont(13),
      color: colors.textSecondary,
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
      backgroundColor: colors.surface,
      color: colors.textPrimary,
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
    radioSelected: {
      borderColor: colors.primary,
    },
    radioUnselected: {
      borderColor: colors.border,
    },
    radioDot: {
      width: pixelWidth(12),
      height: pixelWidth(12),
      borderRadius: pixelWidth(6),
      backgroundColor: colors.primary,
    },
    paymentLabel: {
      fontSize: pixelFont(14),
    },
    paymentSelected: {
      color: colors.primary,
    },
    paymentUnselected: {
      color: colors.textSecondary,
    },
    orderSummary: {
      borderRadius: pixelWidth(10),
      marginHorizontal: -pixelWidth(16),
      marginTop: pixelHeight(44),
      paddingHorizontal: pixelWidth(20),
      paddingTop: pixelHeight(20),
      paddingBottom: pixelHeight(16),
      backgroundColor: colors.surface,
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
      color: colors.textPrimary,
    },
    orderPrice: {
      fontSize: pixelFont(13),
      color: colors.textPrimary,
    },
    submitButton: {
      marginTop: pixelHeight(12),
    },
    errorText: {
      marginTop: pixelHeight(8),
      fontSize: pixelFont(12),
      textAlign: 'center',
      color: colors.danger,
    },
  });

export type CheckoutStyles = ReturnType<typeof createStyles>;
