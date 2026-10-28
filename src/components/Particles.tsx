import { AbsoluteFill, useCurrentFrame } from 'remotion';

const seeded = (seed: number): number => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
};

const PARTICLES: Particle[] = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: seeded(i + 1) * 100,
  y: seeded(i + 100) * 100,
  size: 1 + seeded(i + 200) * 3,
  speed: 0.2 + seeded(i + 300) * 0.8,
  opacity: 0.15 + seeded(i + 400) * 0.55,
}));

export const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {PARTICLES.map((p) => {
        const y = ((p.y - frame * p.speed * 0.05) % 100 + 100) % 100;
        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: '#a78bfa',
              opacity: p.opacity,
              boxShadow: '0 0 8px #8b5cf6',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};