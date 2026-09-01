import React, { useCallback, useEffect, useRef } from 'react';
import { AccessibilityInfo, Animated, Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/shared/hooks/useTheme';
import { useFeedbackStore } from '@/shared/store/feedback.store';
import type { FeedbackType } from '@/shared/store/feedback.store';
import { styles } from './Toast.styles';

const GLYPH: Record<FeedbackType, string> = {
  success: '✓',
  error: '✕',
  info: 'i',
  warning: '!',
};

const HIDDEN_OFFSET = -120;

/**
 * Single global toast host. Renders the current feedback item, animates it in
 * from the top, auto-hides after `duration`. Rapid identical messages collapse
 * into one toast with a counter (handled in the store); a different message
 * replaces the current one immediately. Mounted once in AppProviders.
 */
const Toast = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const item = useFeedbackStore(state => state.current);
  const dismiss = useFeedbackStore(state => state.dismiss);

  const translateY = useRef(new Animated.Value(HIDDEN_OFFSET)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const accentByType: Record<FeedbackType, string> = {
    success: colors.success,
    error: colors.danger,
    warning: colors.warning,
    info: colors.info,
  };

  const hide = useCallback(
    (id: number) => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: HIDDEN_OFFSET,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start(() => dismiss(id));
    },
    [dismiss, opacity, translateY],
  );

  const itemId = item?.id;
  const itemRevision = item?.revision;
  const itemDuration = item?.duration ?? 0;

  // Slide in — only when a genuinely new toast appears (id change), not on a
  // collapsed repeat of the same message.
  useEffect(() => {
    if (itemId === undefined) {
      return;
    }
    translateY.setValue(HIDDEN_OFFSET);
    opacity.setValue(0);
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        bounciness: 6,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 160,
        useNativeDriver: true,
      }),
    ]).start();
  }, [itemId, opacity, translateY]);

  // (Re)start the auto-hide timer on every show that lands on this toast —
  // new message (id) or collapsed repeat (revision).
  useEffect(() => {
    if (itemId === undefined || !item) {
      return;
    }
    AccessibilityInfo.announceForAccessibility(
      t(item.messageKey, { ...item.params, count: item.count }),
    );
    if (itemDuration <= 0) {
      return;
    }
    const timer = setTimeout(() => hide(itemId), itemDuration);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId, itemRevision, itemDuration, hide, t]);

  if (!item) {
    return null;
  }

  const accent = accentByType[item.type];
  // count is passed to t() so pluralized keys can render "5 items added…";
  // messages without plural keys ignore it and fall back to the base key.
  const label = t(item.messageKey, { ...item.params, count: item.count });

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.wrapper,
        { top: insets.top + 8, opacity, transform: [{ translateY }] },
      ]}
    >
      <Pressable
        accessibilityRole="alert"
        accessibilityLiveRegion="polite"
        onPress={() => hide(item.id)}
        style={[
          styles.card,
          { backgroundColor: colors.background, borderColor: colors.border },
        ]}
      >
        <View style={[styles.glyph, { backgroundColor: accent }]}>
          <Text style={styles.glyphText}>{GLYPH[item.type]}</Text>
        </View>

        <Text
          numberOfLines={3}
          style={[styles.message, { color: colors.textPrimary }]}
        >
          {label}
        </Text>

        {item.action ? (
          <Pressable
            hitSlop={8}
            onPress={() => {
              item.action?.onPress();
              hide(item.id);
            }}
          >
            <Text style={[styles.action, { color: accent }]}>
              {t(item.action.labelKey)}
            </Text>
          </Pressable>
        ) : null}
      </Pressable>
    </Animated.View>
  );
};

export default Toast;
