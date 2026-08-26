import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { AccountStackParamList } from '@/app/stack/types';
import { useTheme } from '@/shared/hooks/useTheme';
import LanguageIcon from '@/shared/icons/language.svg';
import ThemeIcon from '@/shared/icons/theme.svg';
import SettingsOptionRow from '@/features/settings/components/SettingsOptionRow/SettingsOptionRow';
import { createStyles } from './SettingsScreen.styles';

type Props = NativeStackScreenProps<AccountStackParamList, 'Settings'>;

const SettingsScreen = (_props: Props) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  // TODO(bottom-sheet team): open LanguageSelectSheet
  const handleLanguagePress = () => {};
  // TODO(bottom-sheet team): open ThemeSelectSheet
  const handleThemePress = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ayarlar</Text>

      <View style={styles.optionList}>
        <SettingsOptionRow
          Icon={LanguageIcon}
          label="Dil"
          onPress={handleLanguagePress}
        />
        <SettingsOptionRow
          Icon={ThemeIcon}
          label="Tema"
          onPress={handleThemePress}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
