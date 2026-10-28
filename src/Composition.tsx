import { AbsoluteFill, Sequence } from 'remotion';
import { Backdrop } from './components/Backdrop';
import { LogoReveal } from './components/LogoReveal';
import { TaglineReveal } from './components/TaglineReveal';
import { FeatureShowcase } from './components/FeatureShowcase';
import { CTAOutro } from './components/CTAOutro';

export const ShadowAIAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#03000a' }}>
      <Backdrop />

      <Sequence from={0} durationInFrames={90}>
        <LogoReveal />
      </Sequence>

      <Sequence from={85} durationInFrames={75}>
        <TaglineReveal />
      </Sequence>

      <Sequence from={155} durationInFrames={85}>
        <FeatureShowcase />
      </Sequence>

      <Sequence from={235} durationInFrames={65}>
        <CTAOutro />
      </Sequence>
    </AbsoluteFill>
  );
};