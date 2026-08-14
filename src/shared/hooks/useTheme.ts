import { useThemeStore } from '../../features/settings/store/theme.store';
import { lightColors, darkColors } from '../constants/theme.constants';

export const useTheme = () => {
  const theme = useThemeStore(state => state.theme);
  return { theme, colors: theme === 'dark' ? darkColors : lightColors };
};
