import { Composition } from 'remotion';
import { ShadowAIAd } from './Composition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ShadowAIAd"
        component={ShadowAIAd}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};