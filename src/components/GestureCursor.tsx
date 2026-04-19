import React from "react";

interface Props {
  x: number;
  y: number;
  progress?: number;
  active?: boolean;
  twoFinger?: boolean;
}

const R = 18;
const C = 2 * Math.PI * R;

const GestureCursor: React.FC<Props> = ({ x, y, progress = 0, active = false, twoFinger = false }) => {
  if (x < 0 && y < 0) return null;

  const dotColor  = twoFinger ? "rgba(168,85,247,0.4)"   : "rgba(99,102,241,0.3)";
  const ringColor = twoFinger ? "rgba(168,85,247,0.9)"   : "rgba(99,102,241,0.9)";
  const glowColor = twoFinger ? "rgba(168,85,247,0.6)"   : "rgba(99,102,241,0.6)";
  const glowOuter = twoFinger ? "rgba(168,85,247,0.2)"   : "rgba(99,102,241,0.2)";

  return (
    <div className="cursor-root" style={{ left: x, top: y }}>
      <div style={{
        width: twoFinger ? 36 : 28,
        height: twoFinger ? 36 : 28,
        borderRadius: "50%",
        background: dotColor,
        border: `2px solid ${ringColor}`,
        boxShadow: `0 0 ${active ? 22 : 16}px ${glowColor}, 0 0 ${active ? 40 : 32}px ${glowOuter}`,
        position: "relative",
        transform: active ? "scale(1.06)" : "scale(1)",
        transition: "width 0.15s ease, height 0.15s ease, background 0.2s ease, border-color 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease",
      }}>
        {progress > 0 && (
          <svg className="cursor-ring" style={{ position: "absolute", inset: -8, transform: "rotate(-90deg)" }} width="52" height="52" viewBox="0 0 52 52">
            <circle cx="26" cy="26" r={R} stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" fill="none" />
            <circle
              cx="26" cy="26" r={R}
              stroke={twoFinger ? "#a855f7" : "#6366f1"}
              strokeWidth="2.5" fill="none"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C - progress * C}
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default GestureCursor;
