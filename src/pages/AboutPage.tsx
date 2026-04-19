import React from "react";

const stats = [
  { value: "< 30ms", label: "Detection Latency" },
  { value: "21pts", label: "Hand Keypoints" },
  { value: "99%", label: "Model Accuracy" },
  { value: "60fps", label: "Target Frame Rate" },
];

const tech = [
  { name: "TensorFlow.js", color: "#ff6f00", desc: "Runs the neural network entirely in the browser using WebGL acceleration." },
  { name: "MediaPipe", color: "#00897b", desc: "Google's hand-landmark model — 21 points in 3D space at high speed." },
  { name: "WebGL", color: "#6366f1", desc: "GPU compute for tensor operations — the key to real-time inference." },
  { name: "WebRTC", color: "#06b6d4", desc: "getUserMedia streams the camera feed into an HTML video element." },
  { name: "React 18", color: "#61dafb", desc: "Component model + concurrent mode for smooth, non-blocking UI updates." },
  { name: "TypeScript", color: "#3178c6", desc: "End-to-end type safety across gesture math, model types, and UI state." },
];

const values = [
  { icon: "🔒", title: "Privacy-first", desc: "No frame of your camera ever leaves your device. All inference is local." },
  { icon: "⚡", title: "Performance-obsessed", desc: "Every line of the detection loop is profiled. We avoid blocking the main thread." },
  { icon: "♿", title: "Accessibility-driven", desc: "Gesture UIs must complement — never replace — traditional input methods." },
  { icon: "🌍", title: "Open by default", desc: "We build on open-source and contribute back. The web should belong to everyone." },
];

const timeline = [
  { year: "2023 Q1", title: "Prototype", desc: "Initial proof-of-concept: scrolling a web page with an open palm using the handpose model." },
  { year: "2023 Q3", title: "Swipe Gestures", desc: "Added directional swipe detection using wrist velocity tracking across frame buffers." },
  { year: "2024 Q1", title: "Page Navigation", desc: "Full multi-page architecture with gesture-driven navigation overlay and dwell-to-select." },
  { year: "2024 Q3", title: "Performance Pass", desc: "Reduced per-frame CPU overhead by 60% through batched state updates and ref-based loops." },
  { year: "2025 Q1", title: "Design Refresh", desc: "Dark glassmorphism UI redesign, real-time gesture HUD, and progressive motion smoothing." },
];

const AboutPage: React.FC = () => (
  <div className="page-wrap page-enter" style={{ background: "linear-gradient(160deg,#08080f 60%,#0d0620)" }}>
    <div className="orb" style={{ width: 500, height: 500, background: "#a855f7", top: -150, right: -100 }} />
    <div className="orb" style={{ width: 300, height: 300, background: "#06b6d4", bottom: 0, left: 0 }} />

    <div className="page-scroll" style={{ position: "relative", zIndex: 1 }}>
      <div className="page-inner">

        {/* ── Hero ── */}
        <div className="r-split" style={{ marginBottom: 80 }}>
          <div>
            <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#a855f7", marginBottom: 16 }}>About the Project</p>
            <h2 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>
              The Future of <br /><span className="grad">Human–Computer</span><br />Interaction
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8, fontSize: 16, marginBottom: 20 }}>
              This project combines cutting-edge machine learning with intuitive gesture recognition
              to create a completely touchless web experience. Your camera becomes your controller.
            </p>
            <p style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.8, fontSize: 15 }}>
              All inference happens locally — no data leaves your device. WebGL acceleration
              keeps frame rates high while the main thread stays free for smooth animations.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="r-grid-2" style={{ gap: 12 }}>
              {stats.map(s => (
                <div key={s.label} className="glass" style={{ borderRadius: 16, padding: "24px 20px", textAlign: "center" }}>
                  <div className="grad" style={{ fontSize: 32, fontWeight: 900, marginBottom: 6 }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Values ── */}
        <div style={{ marginBottom: 80 }}>
          <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#06b6d4", marginBottom: 12, textAlign: "center" }}>Principles</p>
          <h3 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 900, textAlign: "center", marginBottom: 40 }}>What we stand for</h3>
          <div className="r-grid-4">
            {values.map(v => (
              <div key={v.title} className="glass" style={{ borderRadius: 16, padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{v.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>{v.title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tech stack deep dive ── */}
        <div style={{ marginBottom: 80 }}>
          <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#a855f7", marginBottom: 12, textAlign: "center" }}>Stack</p>
          <h3 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 900, textAlign: "center", marginBottom: 40 }}>Technology in detail</h3>
          <div className="r-grid-3" style={{ gap: 16 }}>
            {tech.map(t => (
              <div key={t.name} className="glass" style={{ borderRadius: 16, padding: 24, borderColor: `${t.color}33` }}>
                <span style={{ padding: "4px 12px", borderRadius: 99, fontSize: 12, fontWeight: 700, background: `${t.color}22`, color: t.color, display: "inline-block", marginBottom: 14 }}>
                  {t.name}
                </span>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: 0 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Timeline ── */}
        <div>
          <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#6366f1", marginBottom: 12, textAlign: "center" }}>History</p>
          <h3 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 900, textAlign: "center", marginBottom: 40 }}>Project timeline</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {timeline.map((t, i) => (
              <div key={t.year} style={{ display: "flex", gap: 24, paddingBottom: 32 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: "linear-gradient(135deg,#6366f1,#a855f7)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 900, flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  {i < timeline.length - 1 && (
                    <div style={{ width: 1, flex: 1, marginTop: 8, background: "rgba(99,102,241,0.2)", minHeight: 24 }} />
                  )}
                </div>
                <div className="glass" style={{ borderRadius: 14, padding: "16px 20px", flex: 1 }}>
                  <span style={{ fontSize: 11, letterSpacing: 2, color: "#6366f1", fontWeight: 700 }}>{t.year}</span>
                  <div style={{ fontWeight: 700, fontSize: 16, margin: "6px 0 8px" }}>{t.title}</div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;
