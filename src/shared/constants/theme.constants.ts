export const lightColors = {
  background: '#FFFFFF',
  surface: '#F6F5FB',
  primary: '#76CB4F',
  accent: '#5B6178',
  textPrimary: '#2D3041',
  textSecondary: '#585858',
  textPlaceholder: '#BABBC1',
  textOnPrimary: '#FFFFFF',
  border: '#E5E5EA',
};

// Estimated by inverting the light palette — not measured from a dark-mode design yet.
export const darkColors = {
  background: '#121212',
  surface: '#2A2D3A',
  primary: '#76CB4F',
  accent: '#7B8299',
  textPrimary: '#F5F5F7',
  textSecondary: '#A0A3AD',
  textPlaceholder: '#6B6E76',
  textOnPrimary: '#FFFFFF',
  border: '#3A3D4A',
};

export type ThemeColors = typeof lightColors;
