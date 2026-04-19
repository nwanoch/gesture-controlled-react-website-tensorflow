import React from "react";

interface Props {
  total: number;
  current: number;
  onNavigate: (i: number) => void;
}

const NavDots: React.FC<Props> = ({ total, current, onNavigate }) => (
  <div className="nav-dots-wrap">
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
