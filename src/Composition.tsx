import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export const MyComposition = () => {
  const frame = useCurrentFrame();
  const rotate = interpolate(frame, [0, 150], [0, 360]);
  const scale = interpolate(frame, [0, 75, 150], [1, 1.5, 1]);
  const rotate2 = interpolate(frame, [0, 150], [0, -720]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0B0E14',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <div
        style={{
          width: 300,
          height: 300,
          backgroundColor: '#06B6D4',
          borderRadius: 40,
          transform: 'rotate(' + rotate + 'deg) scale(' + scale + ')',
          boxShadow: '0 0 120px #06B6D4',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 150,
          height: 150,
          backgroundColor: '#8B5CF6',
          borderRadius: '50%',
          transform: 'rotate(' + rotate2 + 'deg)',
          boxShadow: '0 0 100px #8B5CF6',
        }}
      />
    </AbsoluteFill>
  );
};