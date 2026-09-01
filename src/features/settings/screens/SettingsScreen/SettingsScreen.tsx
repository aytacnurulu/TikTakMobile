import React, { useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AccountStackParamList } from '@/app/stack/types';
import { useTheme } from '@/shared/hooks/useTheme';
import { useThemeStore } from '@/shared/store/theme.store';
import { pixelWidth } from '@/shared/utils/metrics';
import BackIcon from '@/shared/icons/chevron-left.svg';
import LanguageIcon from '@/shared/icons/language.svg';
import ThemeIcon from '@/shared/icons/theme.svg';
import SettingsOptionRow from '@/features/settings/components/SettingsOptionRow/SettingsOptionRow';
import LanguageSelectSheet, {
  LanguageSelectSheetRef,
} from '@/features/settings/components/LanguageSelectSheet';
import { createStyles } from './SettingsScreen.styles';

type Props = NativeStackScreenProps<AccountStackParamList, 'Settings'>;

const SettingsScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(colors);
  const languageSheetRef = useRef<LanguageSelectSheetRef>(null);
  const theme = useThemeStore(state => state.theme);
  const setTheme = useThemeStore(state => state.setTheme);
  const isDarkMode = theme === 'dark';

  const handleLanguagePress = () => languageSheetRef.current?.open();
  const handleThemeToggle = () => setTheme(isDarkMode ? 'light' : 'dark');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <BackIcon width={pixelWidth(18)} height={pixelWidth(11)} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('settings.title')}</Text>
      </View>

      <View style={styles.optionList}>
        <SettingsOptionRow
          Icon={LanguageIcon}
          label={t('settings.language')}
          onPress={handleLanguagePress}
        />

        <View style={styles.divider} />

        <SettingsOptionRow
          Icon={ThemeIcon}
          label={t('settings.theme')}
          onPress={handleThemeToggle}
          rightElement={
            <Switch
              value={isDarkMode}
              onValueChange={handleThemeToggle}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          }
        />
      </View>

      <LanguageSelectSheet ref={languageSheetRef} />
    </SafeAreaView>
  );
};

export default SettingsScreen;
