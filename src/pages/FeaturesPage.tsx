import React from "react";

const features = [
  { icon: "🧠", title: "Real-time AI Detection", desc: "21-point skeletal tracking of your hand runs at up to 60fps directly in the browser using WebGL acceleration.", color: "#6366f1" },
  { icon: "📡", title: "Zero Latency", desc: "All inference happens locally on your device. No cloud round-trips, no network latency — just instant response.", color: "#a855f7" },
  { icon: "🔒", title: "Privacy First", desc: "Your camera feed never leaves your device. All processing is local — we never store, stream, or analyze your video.", color: "#06b6d4" },
  { icon: "🌐", title: "Cross-Browser", desc: "Works in any modern browser with WebGL support. No plugins, no extensions, no downloads required.", color: "#10b981" },
  { icon: "✋", title: "Natural Gestures", desc: "Gesture vocabulary mirrors natural human movement — open palm, pinch, swipe, point. No learning curve.", color: "#f59e0b" },
  { icon: "⚡", title: "Adaptive Sensitivity", desc: "The engine auto-calibrates detection thresholds to lighting conditions and hand size for reliable recognition.", color: "#ef4444" },
];

const comparison = [
  { feature: "Mouse / trackpad", gesture: true, touch: true, voice: false, keyboard: true },
  { feature: "Touch screen", gesture: true, touch: true, voice: false, keyboard: false },
  { feature: "Voice control", gesture: false, touch: false, voice: true, keyboard: false },
  { feature: "Camera required", gesture: true, touch: false, voice: false, keyboard: false },
  { feature: "Works at distance", gesture: true, touch: false, voice: true, keyboard: false },
  { feature: "Privacy-safe", gesture: true, touch: true, voice: false, keyboard: true },
  { feature: "Silent operation", gesture: true, touch: true, voice: false, keyboard: true },
  { feature: "Accessible (motor)", gesture: true, touch: false, voice: true, keyboard: false },
];

const roadmap = [
  { q: "Q2 2025", items: ["Multi-hand support", "Gesture customizer UI", "Better low-light detection"] },
  { q: "Q3 2025", items: ["Two-finger pinch zoom", "Rotation gesture", "Fist-hold drag"] },
  { q: "Q4 2025", items: ["Wrist-worn trigger (BLE)", "AR overlay mode", "Gesture recording + replay"] },
  { q: "2026", items: ["Eye-tracking fusion", "Foot pedal API", "Haptic feedback SDK"] },
];

const Tick = ({ v }: { v: boolean }) => (
  <span style={{ color: v ? "#10b981" : "rgba(255,255,255,0.15)", fontWeight: 700 }}>{v ? "✓" : "✕"}</span>
);

const FeaturesPage: React.FC = () => (
  <div className="page-wrap page-enter" style={{ background: "linear-gradient(160deg,#08080f,#0a0a1a)" }}>
    <div className="orb" style={{ width: 600, height: 600, background: "#06b6d4", top: -200, right: -200 }} />
    <div className="orb" style={{ width: 400, height: 400, background: "#6366f1", bottom: -100, left: 0 }} />

    <div className="page-scroll" style={{ position: "relative", zIndex: 1 }}>
      <div className="page-inner">

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#06b6d4", marginBottom: 12 }}>Capabilities</p>
          <h2 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, lineHeight: 1.1 }}>
            Everything you need for <br /><span className="grad">gesture-first</span> experiences
          </h2>
        </div>

        {/* ── Features grid ── */}
        <div className="r-grid-3" style={{ gap: 20, marginBottom: 80 }}>
          {features.map((f, i) => (
            <div key={f.title} className="glass" style={{ borderRadius: 20, padding: 28, position: "relative", overflow: "hidden", animationDelay: `${i * 0.08}s` }}>
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 10% 10%,${f.color}18,transparent 60%)`, pointerEvents: "none" }} />
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${f.color}22`, border: `1px solid ${f.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 18 }}>
                {f.icon}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{f.desc}</p>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${f.color}66,transparent)` }} />
            </div>
          ))}
        </div>

        {/* ── Comparison table ── */}
        <div style={{ marginBottom: 80 }}>
          <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#a855f7", marginBottom: 12, textAlign: "center" }}>Comparison</p>
          <h3 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 900, textAlign: "center", marginBottom: 40 }}>
            How gestures compare to other inputs
          </h3>
          <div className="glass compare-table-wrap" style={{ borderRadius: 20, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  <th style={{ padding: "16px 20px", textAlign: "left", fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>Feature</th>
                  {["👋 Gesture", "👆 Touch", "🎙 Voice", "⌨ Keyboard"].map(h => (
                    <th key={h} style={{ padding: "16px 20px", textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} style={{ borderBottom: i < comparison.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                    <td style={{ padding: "14px 20px", fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{row.feature}</td>
                    <td style={{ padding: "14px 20px", textAlign: "center" }}><Tick v={row.gesture} /></td>
                    <td style={{ padding: "14px 20px", textAlign: "center" }}><Tick v={row.touch} /></td>
                    <td style={{ padding: "14px 20px", textAlign: "center" }}><Tick v={row.voice} /></td>
                    <td style={{ padding: "14px 20px", textAlign: "center" }}><Tick v={row.keyboard} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Roadmap ── */}
        <div>
          <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#10b981", marginBottom: 12, textAlign: "center" }}>Roadmap</p>
          <h3 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 900, textAlign: "center", marginBottom: 40 }}>What's coming next</h3>
          <div className="r-grid-4">
            {roadmap.map((r, i) => (
              <div key={r.q} className="glass" style={{ borderRadius: 16, padding: 24, opacity: 0.5 + i * 0.15 }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#10b981", marginBottom: 16 }}>{r.q}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {r.items.map(item => (
                    <li key={item} style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", display: "flex", gap: 8 }}>
                      <span style={{ color: "#6366f1" }}>→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FeaturesPage;
