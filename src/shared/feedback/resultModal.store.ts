import { create } from 'zustand';

export interface ResultModalAction {
  /** i18n key for the button label */
  labelKey: string;
  onPress?: () => void;
}

interface ResultModalConfig {
  type: 'success' | 'error';
  titleKey?: string;
  messageKey?: string;
  params?: Record<string, string | number>;
  primaryAction?: ResultModalAction;
  secondaryAction?: ResultModalAction;
}

interface ResultModalStore extends ResultModalConfig {
  visible: boolean;
  /** open the blocking result modal (order placed, order failed, ...) */
  present: (config: ResultModalConfig) => void;
  dismiss: () => void;
}

export const useResultModalStore = create<ResultModalStore>(set => ({
  visible: false,
  type: 'success',
  present: config => set({ ...config, visible: true }),
  dismiss: () => set({ visible: false }),
}));
