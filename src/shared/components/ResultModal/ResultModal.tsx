import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/shared/hooks/useTheme';
import { useResultModalStore } from '@/shared/store/resultModal.store';
import type { ResultModalAction } from '@/shared/store/resultModal.store';
import { createStyles } from './ResultModal.styles';

const GLYPH = { success: '✓', error: '✕' } as const;

/**
 * Blocking result dialog for milestone outcomes that need acknowledgement or a
 * follow-up action — "order placed successfully" + "View orders", etc.
 * Mounted once in AppProviders; driven by `useResultModalStore`.
 */
const ResultModal = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const {
    visible,
    type,
    titleKey,
    messageKey,
    params,
    primaryAction,
    secondaryAction,
    dismiss,
  } = useResultModalStore();

  const accent = type === 'error' ? colors.danger : colors.primary;

  const runAction = (action?: ResultModalAction) => {
    action?.onPress?.();
    dismiss();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={dismiss}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={[styles.glyph, { backgroundColor: accent }]}>
            <Text style={styles.glyphText}>{GLYPH[type]}</Text>
          </View>

          {titleKey ? (
            <Text style={styles.title}>{t(titleKey, params)}</Text>
          ) : null}

          {messageKey ? (
            <Text style={styles.message}>{t(messageKey, params)}</Text>
          ) : null}

          <View style={styles.actions}>
            {secondaryAction ? (
              <Pressable
                style={[styles.button, styles.buttonSecondary]}
                onPress={() => runAction(secondaryAction)}
              >
                <Text style={styles.buttonSecondaryText}>
                  {t(secondaryAction.labelKey)}
                </Text>
              </Pressable>
            ) : null}

            <Pressable
              style={[styles.button, { backgroundColor: accent }]}
              onPress={() => runAction(primaryAction)}
            >
              <Text style={styles.buttonPrimaryText}>
                {t(primaryAction?.labelKey ?? 'common.ok')}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ResultModal;
