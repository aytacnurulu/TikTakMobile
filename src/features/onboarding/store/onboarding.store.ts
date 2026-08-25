import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandMmkvStorage } from '@/shared/lib/localStorage';

interface OnboardingStore {
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    set => ({
      hasCompletedOnboarding: false,
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => zustandMmkvStorage),
    },
  ),
);
