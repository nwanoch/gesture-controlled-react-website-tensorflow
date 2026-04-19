import React from "react";

interface Props {
  total: number;
  current: number;
  onNavigate: (i: number) => void;
}

const NavDots: React.FC<Props> = ({ total, current, onNavigate }) => (
  <div style={{
    position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)",
    display: "flex", gap: 8, alignItems: "center", zIndex: 9000,
    background: "rgba(8,8,15,0.6)", backdropFilter: "blur(12px)",
    padding: "8px 16px", borderRadius: 99,
    border: "1px solid rgba(255,255,255,0.07)",
  }}>
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        className={`nav-dot ${i === current ? "active" : ""}`}
        onClick={() => onNavigate(i)}
        style={{ border: "none", background: undefined, padding: 0 }}
        title={`Page ${i + 1}`}
      />
    ))}
  </div>
);

export default NavDots;
