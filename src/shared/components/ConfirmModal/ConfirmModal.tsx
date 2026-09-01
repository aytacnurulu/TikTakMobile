import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/shared/hooks/useTheme';
import { styles } from './ConfirmModal.styles';

interface ConfirmModalProps {
  visible: boolean;
  /** already-translated strings — the caller resolves i18n */
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** paints the confirm button in the danger color (delete, logout, ...) */
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Generic yes/no confirmation dialog. Controlled — the caller owns `visible`
 * and both callbacks. Tapping the backdrop or the hardware back button counts
 * as cancel.
 */
const ConfirmModal = ({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel,
  destructive = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const confirmColor = destructive ? colors.danger : colors.primary;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable style={styles.backdrop} onPress={onCancel}>
        {/* stops backdrop taps from closing when they land on the card */}
        <Pressable style={[styles.card, { backgroundColor: colors.background }]}>
          {title ? (
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              {title}
            </Text>
          ) : null}

          {message ? (
            <Text style={[styles.message, { color: colors.textSecondary }]}>
              {message}
            </Text>
          ) : null}

          <View style={styles.actions}>
            <Pressable
              style={[
                styles.button,
                styles.cancelButton,
                { borderColor: colors.border },
              ]}
              onPress={onCancel}
            >
              <Text style={[styles.cancelText, { color: colors.textPrimary }]}>
                {cancelLabel ?? t('common.cancel')}
              </Text>
            </Pressable>

            <Pressable
              style={[styles.button, { backgroundColor: confirmColor }]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmText}>
                {confirmLabel ?? t('common.confirm')}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ConfirmModal;
