import React from 'react';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';
import { useTheme } from '@/shared/hooks/useTheme';
import { OnboardingIllustrationVariant } from '@/features/onboarding/types/onboarding.types';

const AMBER = '#FFB648';
const CORAL = '#FF6F61';
const LEAF = '#5FB13B';

interface OnboardingIllustrationProps {
  variant: OnboardingIllustrationVariant;
  size: number;
}

const Sparkle = ({
  x,
  y,
  scale = 1,
  color,
}: {
  x: number;
  y: number;
  scale?: number;
  color: string;
}) => (
  <>
    <Line
      x1={x - 6 * scale}
      y1={y}
      x2={x + 6 * scale}
      y2={y}
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Line
      x1={x}
      y1={y - 6 * scale}
      x2={x}
      y2={y + 6 * scale}
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </>
);

const DiscoverArt = ({ backgroundColor }: { backgroundColor: string }) => (
  <>
    <Circle cx={120} cy={120} r={108} fill="#76CB4F" opacity={0.1} />
    <Circle cx={160} cy={86} r={50} fill={AMBER} opacity={0.16} />

    <Path
      d="M128 56 C114 66 112 90 128 100 C144 90 142 66 128 56 Z"
      fill={AMBER}
    />
    <Line x1={128} y1={62} x2={128} y2={94} stroke={backgroundColor} strokeWidth={2} opacity={0.5} />

    <Circle cx={92} cy={138} r={34} fill={LEAF} />
    <Circle cx={140} cy={122} r={38} fill="#76CB4F" />
    <Circle cx={116} cy={162} r={30} fill={CORAL} />

    <Circle cx={82} cy={126} r={7} fill={backgroundColor} opacity={0.35} />
    <Circle cx={130} cy={108} r={8} fill={backgroundColor} opacity={0.3} />
    <Circle cx={107} cy={151} r={6} fill={backgroundColor} opacity={0.3} />

    <Sparkle x={186} y={140} color={CORAL} />
    <Sparkle x={58} y={92} scale={0.75} color="#76CB4F" />
    <Sparkle x={176} y={62} scale={0.6} color={AMBER} />
  </>
);

const DeliveryArt = ({ backgroundColor }: { backgroundColor: string }) => (
  <>
    <Circle cx={120} cy={120} r={108} fill="#76CB4F" opacity={0.1} />
    <Circle cx={84} cy={156} r={48} fill={CORAL} opacity={0.14} />

    <Line x1={30} y1={104} x2={58} y2={104} stroke="#76CB4F" strokeWidth={5} strokeLinecap="round" opacity={0.55} />
    <Line x1={22} y1={124} x2={54} y2={124} stroke="#76CB4F" strokeWidth={5} strokeLinecap="round" opacity={0.35} />
    <Line x1={30} y1={144} x2={50} y2={144} stroke="#76CB4F" strokeWidth={5} strokeLinecap="round" opacity={0.2} />

    <Rect
      x={78}
      y={92}
      width={94}
      height={76}
      rx={16}
      fill="#76CB4F"
      transform="rotate(-6 125 130)"
    />
    <Rect
      x={78}
      y={122}
      width={94}
      height={16}
      fill={AMBER}
      transform="rotate(-6 125 130)"
    />
    <Circle
      cx={168}
      cy={98}
      r={9}
      fill="none"
      stroke={backgroundColor}
      strokeWidth={3}
      transform="rotate(-6 125 130)"
    />

    <Circle cx={70} cy={182} r={4} fill={AMBER} opacity={0.7} />
    <Circle cx={56} cy={170} r={3} fill={CORAL} opacity={0.6} />
    <Circle cx={82} cy={192} r={3} fill="#76CB4F" opacity={0.5} />
  </>
);

const CheckoutArt = ({ backgroundColor }: { backgroundColor: string }) => (
  <>
    <Circle cx={120} cy={120} r={108} fill="#76CB4F" opacity={0.1} />
    <Circle cx={92} cy={84} r={48} fill={AMBER} opacity={0.16} />

    <Rect
      x={72}
      y={58}
      width={104}
      height={132}
      rx={18}
      fill={backgroundColor}
      stroke="#76CB4F"
      strokeWidth={3}
    />
    <Rect x={90} y={86} width={68} height={9} rx={4.5} fill="#76CB4F" opacity={0.7} />
    <Rect x={90} y={108} width={50} height={9} rx={4.5} fill="#76CB4F" opacity={0.35} />
    <Rect x={90} y={130} width={60} height={9} rx={4.5} fill="#76CB4F" opacity={0.35} />
    <Rect x={90} y={152} width={38} height={9} rx={4.5} fill="#76CB4F" opacity={0.35} />

    <Circle cx={156} cy={178} r={32} fill="#76CB4F" />
    <Path
      d="M143 178 L153 188 L171 164"
      stroke={backgroundColor}
      strokeWidth={6}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    <Sparkle x={182} y={72} color={CORAL} />
    <Sparkle x={58} y={132} scale={0.7} color={AMBER} />
  </>
);

const OnboardingIllustration = ({ variant, size }: OnboardingIllustrationProps) => {
  const { colors } = useTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 240 240">
      {variant === 'discover' && <DiscoverArt backgroundColor={colors.background} />}
      {variant === 'delivery' && <DeliveryArt backgroundColor={colors.background} />}
      {variant === 'checkout' && <CheckoutArt backgroundColor={colors.background} />}
    </Svg>
  );
};

export default OnboardingIllustration;
