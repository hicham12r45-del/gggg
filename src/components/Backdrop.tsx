import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Particles } from './Particles';

export const Backdrop: React.FC = () => {
  const frame = useCurrentFrame();

  const x1 = interpolate(frame, [0, 300], [30, 70]);
  const y1 = interpolate(frame, [0, 300], [25, 75]);
  const x2 = interpolate(frame, [0, 300], [70, 30]);
  const y2 = interpolate(frame, [0, 300], [75, 25]);

  return (
    <AbsoluteFill
      style={{
        background: `
          radial-gradient(circle at ${x1}% ${y1}%, rgba(139,92,246,0.38), transparent 45%),
          radial-gradient(circle at ${x2}% ${y2}%, rgba(6,182,212,0.28), transparent 50%),
          linear-gradient(135deg, #05010f 0%, #0a0520 50%, #03000a 100%)
        `,
      }}
    >
      <Particles />
    </AbsoluteFill>
  );
};