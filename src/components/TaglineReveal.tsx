import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { loadFont as loadCairo } from '@remotion/google-fonts/Cairo';
import { loadFont as loadOrbitron } from '@remotion/google-fonts/Orbitron';

const cairo = loadCairo();
const orbitron = loadOrbitron();

const SCENE_DURATION = 75;

export const TaglineReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, 15, SCENE_DURATION - 15, SCENE_DURATION],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  const s1 = spring({ frame: frame - 5, fps, config: { damping: 200, stiffness: 100 } });
  const s2 = spring({ frame: frame - 20, fps, config: { damping: 200, stiffness: 100 } });
  const s3 = spring({ frame: frame - 35, fps, config: { damping: 200, stiffness: 100 } });

  const line1Y = interpolate(s1, [0, 1], [30, 0]);
  const line2Y = interpolate(s2, [0, 1], [40, 0]);
  const line3Y = interpolate(s3, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        flexDirection: 'column',
        padding: 80,
      }}
    >
      <div
        style={{
          fontFamily: orbitron.fontFamily,
          fontSize: 40,
          letterSpacing: '0.35em',
          color: '#a78bfa',
          marginBottom: 30,
          opacity: interpolate(s1, [0, 1], [0, 1]),
          transform: `translateY(${line1Y}px)`,
          textAlign: 'center',
          paddingLeft: '0.35em',
        }}
      >
        POWERED BY INTELLIGENCE
      </div>

      <div
        style={{
          fontFamily: cairo.fontFamily,
          fontWeight: 900,
          fontSize: 130,
          lineHeight: 1.15,
          color: '#fff',
          textAlign: 'center',
          opacity: interpolate(s2, [0, 1], [0, 1]),
          transform: `translateY(${line2Y}px)`,
          textShadow: '0 0 45px rgba(139,92,246,0.7)',
        }}
      >
        ذكاء في الظل
      </div>

      <div
        style={{
          fontFamily: cairo.fontFamily,
          fontWeight: 700,
          fontSize: 60,
          color: '#c4b5fd',
          textAlign: 'center',
          marginTop: 20,
          opacity: interpolate(s3, [0, 1], [0, 1]),
          transform: `translateY(${line3Y}px)`,
        }}
      >
        قوة بلا حدود
      </div>
    </AbsoluteFill>
  );
};