import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { loadFont as loadCairo } from '@remotion/google-fonts/Cairo';
import { loadFont as loadOrbitron } from '@remotion/google-fonts/Orbitron';
import { Download } from 'lucide-react';

const cairo = loadCairo();
const orbitron = loadOrbitron();

const SCENE_DURATION = 65;

export const CTAOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, 10, SCENE_DURATION - 10, SCENE_DURATION],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  const pulse = 0.6 + Math.sin(frame * 0.15) * 0.4;

  const titleSpring = spring({ frame: frame - 2, fps, config: { damping: 200, stiffness: 100 } });
  const subSpring = spring({ frame: frame - 12, fps, config: { damping: 200, stiffness: 100 } });
  const btnSpring = spring({ frame: frame - 22, fps, config: { damping: 200, stiffness: 100 } });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        flexDirection: 'column',
        gap: 50,
        padding: 80,
      }}
    >
      <div
        style={{
          fontFamily: orbitron.fontFamily,
          fontWeight: 900,
          fontSize: 100,
          color: '#fff',
          letterSpacing: '0.08em',
          opacity: interpolate(titleSpring, [0, 1], [0, 1]),
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.6, 1])})`,
          textShadow: `0 0 ${30 * pulse}px rgba(167,139,250,0.9), 0 0 ${70 * pulse}px rgba(139,92,246,0.6)`,
          paddingLeft: '0.08em',
        }}
      >
        SHADOW AI
      </div>

      <div
        style={{
          fontFamily: cairo.fontFamily,
          fontWeight: 700,
          fontSize: 54,
          color: '#c4b5fd',
          textAlign: 'center',
          opacity: interpolate(subSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(subSpring, [0, 1], [20, 0])}px)`,
        }}
      >
        جاهز للتحميل الآن
      </div>

      <div
        style={{
          opacity: interpolate(btnSpring, [0, 1], [0, 1]),
          transform: `scale(${interpolate(btnSpring, [0, 1], [0.7, 1])})`,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          padding: '28px 60px',
          borderRadius: 999,
          background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
          boxShadow: `0 0 ${40 * pulse}px rgba(139,92,246,0.8), 0 0 ${100 * pulse}px rgba(6,182,212,0.4)`,
        }}
      >
        <Download size={48} color="#fff" strokeWidth={2.5} />
        <span
          style={{
            fontFamily: cairo.fontFamily,
            fontWeight: 900,
            fontSize: 50,
            color: '#fff',
          }}
        >
          حمّل التطبيق
        </span>
      </div>
    </AbsoluteFill>
  );
};