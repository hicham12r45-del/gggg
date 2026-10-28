import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { loadFont as loadOrbitron } from '@remotion/google-fonts/Orbitron';

const orbitron = loadOrbitron();

const SCENE_DURATION = 90;
const WORD = 'SHADOW';

const EyeGlyph: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const s = spring({ frame: frame - 5, fps, config: { damping: 200, stiffness: 80 } });
  const scale = interpolate(s, [0, 1], [0.2, 1]);
  const opacity = interpolate(s, [0, 1], [0, 1]);
  return (
    <svg
      width={220}
      height={220}
      viewBox="0 0 100 100"
      style={{ opacity, transform: `scale(${scale})`, filter: 'drop-shadow(0 0 25px #8b5cf6)' }}
    >
      <defs>
        <radialGradient id="eyeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="60%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#0f0a1f" />
        </radialGradient>
      </defs>
      <path
        d="M10 50 Q 50 15 90 50 Q 50 85 10 50 Z"
        fill="none"
        stroke="#a78bfa"
        strokeWidth={2}
      />
      <circle cx={50} cy={50} r={18} fill="url(#eyeGrad)" />
      <circle cx={50} cy={50} r={6} fill="#0a0016" />
      <circle cx={54} cy={46} r={2} fill="#fff" opacity={0.85} />
    </svg>
  );
};

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, 15, SCENE_DURATION - 15, SCENE_DURATION],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  const aiSpring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 200, stiffness: 100 },
  });
  const aiScale = interpolate(aiSpring, [0, 1], [0.3, 1]);
  const aiOpacity = interpolate(aiSpring, [0, 1], [0, 1]);

  const pulse = Math.sin(frame * 0.1) * 0.3 + 0.7;

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        flexDirection: 'column',
      }}
    >
      <EyeGlyph frame={frame} fps={fps} />

      <div
        style={{
          display: 'flex',
          fontFamily: orbitron.fontFamily,
          fontWeight: 900,
          fontSize: 140,
          letterSpacing: '0.08em',
          color: '#fff',
          marginTop: 40,
          textShadow: `0 0 ${20 * pulse}px rgba(167,139,250,0.9), 0 0 ${50 * pulse}px rgba(139,92,246,0.6)`,
        }}
      >
        {WORD.split('').map((letter, i) => {
          const letterSpring = spring({
            frame: frame - 15 - i * 4,
            fps,
            config: { damping: 200, stiffness: 90 },
          });
          const letterOpacity = interpolate(letterSpring, [0, 1], [0, 1]);
          const letterY = interpolate(letterSpring, [0, 1], [40, 0]);
          return (
            <span
              key={i}
              style={{
                opacity: letterOpacity,
                transform: `translateY(${letterY}px)`,
                display: 'inline-block',
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>

      <div
        style={{
          fontFamily: orbitron.fontFamily,
          fontWeight: 900,
          fontSize: 90,
          color: '#a78bfa',
          letterSpacing: '0.6em',
          marginTop: 10,
          paddingLeft: '0.6em',
          opacity: aiOpacity,
          transform: `scale(${aiScale})`,
          textShadow: `0 0 ${30 * pulse}px rgba(167,139,250,1), 0 0 ${80 * pulse}px rgba(139,92,246,0.7)`,
        }}
      >
        AI
      </div>
    </AbsoluteFill>
  );
};