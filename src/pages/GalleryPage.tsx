import React, { useState } from "react";

const categories = ["All", "AI Art", "Motion", "Interface", "Concept", "Neural"];

const items = [
  { title: "Neural Pathways", tag: "Neural", w: 1, h: 2, from: "#6366f1", to: "#a855f7", year: "2025" },
  { title: "Gesture Flow", tag: "Motion", w: 1, h: 1, from: "#06b6d4", to: "#6366f1", year: "2025" },
  { title: "Digital Touch", tag: "Interface", w: 1, h: 1, from: "#f59e0b", to: "#ef4444", year: "2024" },
  { title: "Hand of God", tag: "Concept", w: 2, h: 1, from: "#10b981", to: "#06b6d4", year: "2024" },
  { title: "Warp Signal", tag: "Motion", w: 1, h: 1, from: "#ec4899", to: "#a855f7", year: "2025" },
  { title: "Palm Grid", tag: "AI Art", w: 1, h: 1, from: "#a855f7", to: "#6366f1", year: "2024" },
  { title: "Synapse", tag: "Neural", w: 1, h: 2, from: "#ef4444", to: "#f59e0b", year: "2025" },
  { title: "Photon Trace", tag: "Motion", w: 1, h: 1, from: "#06b6d4", to: "#10b981", year: "2024" },
  { title: "Lattice Mind", tag: "Neural", w: 1, h: 1, from: "#8b5cf6", to: "#06b6d4", year: "2025" },
  { title: "Vector Palm", tag: "AI Art", w: 1, h: 1, from: "#f59e0b", to: "#ec4899", year: "2025" },
  { title: "Reach Protocol", tag: "Interface", w: 2, h: 1, from: "#6366f1", to: "#10b981", year: "2024" },
  { title: "Ghost Hand", tag: "Concept", w: 1, h: 1, from: "#a855f7", to: "#ef4444", year: "2025" },
];

const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const visible = activeCategory === "All" ? items : items.filter(i => i.tag === activeCategory);

  return (
    <div className="page-wrap page-enter" style={{ background: "#08080f" }}>
      <div className="orb" style={{ width: 500, height: 500, background: "#f59e0b", opacity: 0.1, top: -100, left: "40%" }} />

      <div className="page-scroll" style={{ position: "relative", zIndex: 1 }}>
        <div className="page-inner page-inner--wide">

          {/* ── Header ── */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#f59e0b", marginBottom: 12 }}>Gallery</p>
            <h2 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 900, lineHeight: 1.1 }}>
              Gesture <span className="grad-warm">Visualized</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.35)", marginTop: 12, fontSize: 15 }}>
              AI-generated artwork exploring the intersection of hand gesture and digital space
            </p>
          </div>

          {/* ── Category filter ── */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 40, flexWrap: "wrap" }}>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                style={{
                  padding: "8px 20px", borderRadius: 99, border: "none", fontSize: 13, fontWeight: 600,
                  cursor: "pointer", transition: "all 0.2s ease",
                  background: c === activeCategory ? "linear-gradient(135deg,#f59e0b,#ef4444)" : "rgba(255,255,255,0.06)",
                  color: c === activeCategory ? "white" : "rgba(255,255,255,0.5)",
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* ── Masonry grid ── */}
          <div className="gallery-masonry">
            {visible.map((item, i) => (
              <div
                key={item.title}
                className="glass"
                style={{
                  gridColumn: `span ${item.w}`, gridRow: `span ${item.h}`,
                  borderRadius: 20,
                  background: `linear-gradient(135deg,${item.from}44,${item.to}22)`,
                  border: `1px solid ${item.from}33`,
                  display: "flex", flexDirection: "column", justifyContent: "flex-end",
                  padding: 20, position: "relative", overflow: "hidden",
                  cursor: "none", transition: "transform 0.2s ease",
                }}
              >
                <div style={{ position: "absolute", top: -40, right: -40, width: 140, height: 140, borderRadius: "50%", background: `radial-gradient(circle,${item.from}44,transparent 70%)` }} />
                <div style={{
                  position: "absolute", top: "30%", left: "20%",
                  width: 60, height: 60, borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                  background: `${item.to}33`,
                  animation: `float ${4 + (i % 3)}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                }} />
                <div style={{
                  position: "absolute", top: 16, right: 16, fontSize: 11, letterSpacing: 1,
                  color: "rgba(255,255,255,0.3)", fontWeight: 600,
                }}>
                  {item.year}
                </div>
                <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: item.from, fontWeight: 600, marginBottom: 4 }}>{item.tag}</span>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{item.title}</span>
              </div>
            ))}
          </div>

          {/* ── About the collection ── */}
          <div style={{ marginTop: 60 }}>
            <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 20, textAlign: "center" }}>About the collection</h3>
            <div className="r-grid-2" style={{ gap: 24 }}>
              <div className="glass" style={{ borderRadius: 16, padding: 28 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>🎨</div>
                <h4 style={{ fontWeight: 700, marginBottom: 8 }}>AI Generation Process</h4>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                  Each piece in this collection was generated using a combination of diffusion models and custom
                  prompt engineering. The visual language is derived directly from the hand keypoint data
                  captured during real gesture sessions — making each artwork a literal visualization of movement.
                </p>
              </div>
              <div className="glass" style={{ borderRadius: 16, padding: 28 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>📐</div>
                <h4 style={{ fontWeight: 700, marginBottom: 8 }}>Visual Language</h4>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                  The gradient palette, flowing forms, and geometric abstractions reflect the three-dimensional
                  coordinate data from 21 hand keypoints. Each color in the collection corresponds to a distinct
                  gesture class detected by the handpose model.
                </p>
              </div>
              <div className="glass" style={{ borderRadius: 16, padding: 28 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>🖼</div>
                <h4 style={{ fontWeight: 700, marginBottom: 8 }}>Editions</h4>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                  The gallery currently features 12 works across 5 thematic series. New series are added
                  quarterly, each coinciding with a milestone gesture capability release. All works are
                  available as high-resolution downloads for personal use.
                </p>
              </div>
              <div className="glass" style={{ borderRadius: 16, padding: 28 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>🤝</div>
                <h4 style={{ fontWeight: 700, marginBottom: 8 }}>Commissions</h4>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                  We accept commissions for gesture-data art installations, brand campaigns, and conference visuals.
                  Custom palettes, dimensions, and gesture datasets can be incorporated on request.
                  Reach out via the Contact page to discuss your project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
