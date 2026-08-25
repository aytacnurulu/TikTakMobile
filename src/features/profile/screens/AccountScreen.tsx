import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/shared/store/auth.store';
import { Locale, useLocaleStore } from '@/shared/store/locale.store';
import { useTheme } from '@/shared/hooks/useTheme';
import { gapVertical, pixelFont, pixelHeight, pixelWidth } from '@/shared/utils/metrics';
import Button from '@/shared/components/Button';

const LOCALES: Locale[] = ['az', 'ru', 'en'];

const AccountScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const logout = useAuthStore(state => state.logout);
  const locale = useLocaleStore(state => state.locale);
  const setLocale = useLocaleStore(state => state.setLocale);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        {t('account.title')}
      </Text>

      <View style={styles.languageSection}>
        <Text style={[styles.languageLabel, { color: colors.textSecondary }]}>
          {t('account.language')}
        </Text>
        <View style={styles.languageRow}>
          {LOCALES.map(item => {
            const isSelected = item === locale;

            return (
              <TouchableOpacity
                key={item}
                onPress={() => setLocale(item)}
                activeOpacity={0.7}
                style={[
                  styles.languageChip,
                  {
                    backgroundColor: isSelected ? colors.primary : colors.surface,
                    borderColor: isSelected ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.languageChipText,
                    { color: isSelected ? colors.textOnPrimary : colors.textPrimary },
                  ]}
                >
                  {item.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <Button
        title={t('account.logout')}
        onPress={logout}
        style={styles.logoutButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: pixelWidth(16),
  },
  title: {
    fontSize: pixelFont(20),
    fontWeight: '700',
  },
  languageSection: {
    marginTop: pixelHeight(24),
    gap: gapVertical(8),
  },
  languageLabel: {
    fontSize: pixelFont(13),
    fontWeight: '600',
  },
  languageRow: {
    flexDirection: 'row',
    gap: pixelWidth(8),
  },
  languageChip: {
    paddingHorizontal: pixelWidth(16),
    paddingVertical: pixelHeight(8),
    borderRadius: pixelWidth(10),
    borderWidth: 1,
  },
  languageChipText: {
    fontSize: pixelFont(13),
    fontWeight: '700',
  },
  logoutButton: {
    marginTop: pixelHeight(24),
  },
});

export default AccountScreen;
