export default function WaveDivider({ fill = "#fef9f0", flip = false }) {
  return (
    <div style={{ lineHeight: 0, transform: flip ? "scaleY(-1)" : "none" }}>
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" style={{ width: "100%", height: 50, display: "block" }}>
        <path d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z" fill={fill} />
      </svg>
    </div>
  );
}
