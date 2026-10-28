import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { loadFont as loadCairo } from '@remotion/google-fonts/Cairo';
import { loadFont as loadOrbitron } from '@remotion/google-fonts/Orbitron';
import { Brain, Shield, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const cairo = loadCairo();
const orbitron = loadOrbitron();

const SCENE_DURATION = 85;

type Feature = {
  Icon: LucideIcon;
  ar: string;
  en: string;
};

const FEATURES: Feature[] = [
  { Icon: Zap, ar: 'سريع', en: 'FAST' },
  { Icon: Brain, ar: 'ذكي', en: 'SMART' },
  { Icon: Shield, ar: 'آمن', en: 'SECURE' },
];

export const FeatureShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, 15, SCENE_DURATION - 15, SCENE_DURATION],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  const headerSpring = spring({ frame: frame - 3, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        flexDirection: 'column',
        padding: 80,
        gap: 45,
      }}
    >
      <div
        style={{
          fontFamily: orbitron.fontFamily,
          fontSize: 40,
          letterSpacing: '0.4em',
          color: '#a78bfa',
          marginBottom: 20,
          paddingLeft: '0.4em',
          opacity: interpolate(headerSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(headerSpring, [0, 1], [-20, 0])}px)`,
        }}
      >
        WHY SHADOW AI
      </div>

      {FEATURES.map((feature, i) => {
        const s = spring({
          frame: frame - 15 - i * 15,
          fps,
          config: { damping: 200, stiffness: 100 },
        });
        const cardOpacity = interpolate(s, [0, 1], [0, 1]);
        const cardX = interpolate(s, [0, 1], [i % 2 === 0 ? -80 : 80, 0]);
        const Icon = feature.Icon;
        return (
          <div
            key={i}
            style={{
              opacity: cardOpacity,
              transform: `translateX(${cardX}px)`,
              display: 'flex',
              alignItems: 'center',
              gap: 40,
              width: '100%',
              justifyContent: 'center',
              padding: '24px 40px',
              borderRadius: 28,
              background:
                'linear-gradient(90deg, rgba(139,92,246,0.18), rgba(6,182,212,0.12))',
              border: '1px solid rgba(167,139,250,0.35)',
              boxShadow: '0 0 50px rgba(139,92,246,0.25)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 110,
                height: 110,
                borderRadius: 24,
                background: 'rgba(167,139,250,0.15)',
                border: '1px solid rgba(167,139,250,0.5)',
                boxShadow: '0 0 35px rgba(167,139,250,0.6)',
                flexShrink: 0,
              }}
            >
              <Icon size={56} color="#c4b5fd" strokeWidth={2.2} />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 6,
              }}
            >
              <div
                style={{
                  fontFamily: cairo.fontFamily,
                  fontWeight: 900,
                  fontSize: 72,
                  color: '#fff',
                  lineHeight: 1,
                }}
              >
                {feature.ar}
              </div>
              <div
                style={{
                  fontFamily: orbitron.fontFamily,
                  fontSize: 24,
                  letterSpacing: '0.35em',
                  color: '#a78bfa',
                  paddingLeft: '0.35em',
                }}
              >
                {feature.en}
              </div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};