export type OnboardingIllustrationVariant = 'discover' | 'delivery' | 'checkout';

export interface OnboardingSlide {
  key: string;
  variant: OnboardingIllustrationVariant;
  eyebrow: string;
  title: string;
  description: string;
}
