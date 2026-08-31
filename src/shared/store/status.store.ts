import { create } from 'zustand';

export type StatusType = 'success' | 'error';

interface StatusStore {
  visible: boolean;
  type: StatusType;
  message: string;
  show: (type: StatusType, message: string) => void;
  hide: () => void;
}

export const useStatusStore = create<StatusStore>(set => ({
  visible: false,
  type: 'success',
  message: '',
  show: (type, message) => set({ visible: true, type, message }),
  hide: () => set({ visible: false }),
}));
