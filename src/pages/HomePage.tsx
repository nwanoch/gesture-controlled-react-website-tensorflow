import React, { useEffect, useState } from "react";

interface Props {
  onStartCamera: () => void;
  modelStatus: "loading" | "loaded" | "error";
  cameraActive: boolean;
  onNavigate?: (idx: number) => void;
  currentPage?: number;
  totalPages?: number;
}

const gestures = [
  { icon: "🖐", label: "Open Palm — 3s",  desc: "Hold an open palm steady for 3 seconds to open the page menu" },
  { icon: "☝️", label: "Index Finger Up", desc: "Raise only your index finger to scroll the page up" },
  { icon: "✊", label: "Closed Fist",     desc: "Close your hand into a fist to scroll the page down" },
  { icon: "✌️", label: "Two Fingers — 3s", desc: "In the menu: point two fingers at a card and hold 3s to navigate" },
  { icon: "🤏", label: "Pinch to Close",   desc: "Inside the menu: pinch thumb & index for 0.6s to dismiss it" },
];

const logos = [
  { name: "TensorFlow", color: "#ff6f00" },
  { name: "MediaPipe", color: "#00897b" },
  { name: "WebRTC", color: "#6366f1" },
  { name: "React", color: "#06b6d4" },
  { name: "WebGL", color: "#a855f7" },
  { name: "TypeScript", color: "#3178c6" },
];

const faq = [
  {
    q: "Does it work on mobile?",
    a: "Yes — any device with a front camera and a WebGL-capable browser is supported. Performance may vary on lower-end hardware.",
  },
  {
    q: "Is my camera data private?",
    a: "Completely. All inference runs client-side. No video data, frames, or hand coordinates ever leave your browser.",
  },
  {
    q: "Why is detection sometimes slow?",
    a: "The handpose model runs 21-point skeletal inference per frame. First run includes WebGL shader compilation; it warms up after 2–3 seconds.",
  },
  {
    q: "Can I add my own gestures?",
    a: "Yes — the gesture classifier is pure geometry math on top of the keypoints. You can add custom gesture functions in App.tsx.",
  },
  {
    q: "What if the light is bad?",
    a: "The model degrades gracefully in low light. For best results use consistent front lighting. Side-lighting causes false positives.",
  },
  {
    q: "Is this open source?",
    a: "The project is built on open-source libraries. The application code itself can be forked and modified for your own gesture-driven UI.",
  },
];

const HomePage: React.FC<Props> = ({ onStartCamera, modelStatus, cameraActive }) => {
  const [tick, setTick] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(id);
  }, []);
  const activeGesture = tick % gestures.length;

  return (
    <div className="page-wrap page-enter" style={{ background: "#08080f" }}>
      <div className="page-scroll">
        {/* ── Hero ─────────────────────────────────────── */}
        <section style={{ position: "relative", minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "calc(var(--page-section-y) + env(safe-area-inset-top, 0px)) var(--page-pad) max(48px, env(safe-area-inset-bottom, 0px))", overflow: "hidden" }}>
          <div className="orb" style={{ width: "min(600px, 80vw)", height: "min(600px, 80vw)", background: "#6366f1", top: -200, left: -200 }} />
          <div className="orb" style={{ width: "min(400px, 60vw)", height: "min(400px, 60vw)", background: "#a855f7", bottom: -100, right: -100 }} />
          <div className="orb" style={{ width: "min(300px, 50vw)", height: "min(300px, 50vw)", background: "#06b6d4", top: "40%", right: "18%" }} />

          <div className="anim-slide-up glass" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", borderRadius: 99, marginBottom: 28 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981", display: "inline-block" }} />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", letterSpacing: 2, textTransform: "uppercase" }}>AI-Powered Gesture Control</span>
          </div>

          <h1 className="anim-slide-up" style={{ fontSize: "clamp(42px,7vw,90px)", fontWeight: 900, textAlign: "center", lineHeight: 1.05, marginBottom: 20, animationDelay: "0.1s" }}>
            Control the Web<br /><span className="grad">With Your Hands</span>
          </h1>

          <p className="anim-slide-up" style={{ fontSize: "clamp(15px,1.8vw,20px)", color: "rgba(255,255,255,0.5)", textAlign: "center", maxWidth: 520, lineHeight: 1.7, marginBottom: 40, animationDelay: "0.2s" }}>
            Real-time hand gesture recognition powered by TensorFlow &amp; MediaPipe.
            Navigate pages, scroll content — all hands-free.
          </p>

          <div className="anim-slide-up" style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", animationDelay: "0.3s" }}>
            <button
              onClick={onStartCamera}
              disabled={modelStatus !== "loaded" || cameraActive}
              style={{
                padding: "16px 36px", borderRadius: 99, border: "none",
                background: modelStatus === "loaded" && !cameraActive ? "linear-gradient(135deg,#6366f1,#a855f7)" : "rgba(255,255,255,0.1)",
                color: "white", fontSize: 16, fontWeight: 700,
                cursor: modelStatus === "loaded" && !cameraActive ? "pointer" : "default",
                boxShadow: modelStatus === "loaded" && !cameraActive ? "0 0 40px rgba(99,102,241,0.5)" : "none",
                transition: "all 0.3s ease",
              }}
            >
              {modelStatus === "loading" && "⏳ Loading AI Model..."}
              {modelStatus === "loaded" && !cameraActive && "🎥 Enable Gesture Control"}
              {modelStatus === "loaded" && cameraActive && "✅ Gestures Active"}
              {modelStatus === "error" && "❌ Model Failed"}
            </button>
            <button style={{ padding: "16px 36px", borderRadius: 99, background: "transparent", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.15)", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
              Learn More ↓
            </button>
          </div>

          {/* Gesture cards */}
          <div className="anim-slide-up" style={{ display: "flex", gap: 12, marginTop: 52, flexWrap: "wrap", justifyContent: "center", animationDelay: "0.4s" }}>
            {gestures.map((g, i) => (
              <div key={g.label} className="glass" style={{
                padding: "14px 20px", borderRadius: 14, minWidth: "min(160px, calc(100vw - 48px))",
                borderColor: i === activeGesture ? "rgba(99,102,241,0.6)" : undefined,
                background: i === activeGesture ? "rgba(99,102,241,0.12)" : undefined,
                transition: "all 0.5s ease",
              }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{g.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 3 }}>{g.label}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{g.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ─────────────────────────────── */}
        <section style={{ padding: "var(--page-section-y) var(--page-pad)", maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#6366f1", textAlign: "center", marginBottom: 12 }}>How It Works</p>
          <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 900, textAlign: "center", marginBottom: 12 }}>
            Four steps from hand to action
          </h2>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", marginBottom: 56, fontSize: 15 }}>
            The entire pipeline runs inside your browser — no server, no latency, no privacy risk.
          </p>
          <div className="r-how-4">
            {[
              { n: "01", icon: "📷", title: "Camera Capture", desc: "Your browser captures 30–60fps video via WebRTC getUserMedia." },
              { n: "02", icon: "🧠", title: "AI Inference", desc: "TensorFlow.js runs handpose estimation — 21 keypoints per frame on the GPU." },
              { n: "03", icon: "📐", title: "Gesture Classify", desc: "Palm span, finger curl ratios, and hold duration identify open palm, fist, index-up, two-finger, or pinch." },
              { n: "04", icon: "⚡", title: "UI Action", desc: "Scroll up/down, open the page menu, select a page, or close it — all in the same animation frame." },
            ].map((s, i) => (
              <div key={s.n} className="glass" style={{ borderRadius: 16, padding: 24, position: "relative" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#6366f1", marginBottom: 8 }}>{s.n}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{s.desc}</div>
                {i < 3 && <div className="card-flow-arrow">→</div>}
              </div>
            ))}
          </div>
        </section>

        {/* ── Powered by ───────────────────────────────── */}
        <section style={{ padding: "60px var(--page-pad)", borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
          <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 32 }}>
            Powered by open-source technology
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            {logos.map(l => (
              <span key={l.name} style={{
                padding: "10px 20px", borderRadius: 99, fontSize: 14, fontWeight: 700,
                background: `${l.color}18`, border: `1px solid ${l.color}44`, color: l.color,
              }}>
                {l.name}
              </span>
            ))}
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────── */}
        <section style={{ padding: "var(--page-section-y) var(--page-pad)", maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#a855f7", textAlign: "center", marginBottom: 12 }}>FAQ</p>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 900, textAlign: "center", marginBottom: 48 }}>
            Common questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faq.map((item, i) => (
              <div key={i} className="glass" style={{ borderRadius: 14, overflow: "hidden" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%", padding: "18px 24px", background: "none", border: "none", color: "white",
                    textAlign: "left", fontSize: 15, fontWeight: 600, cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
                  }}
                >
                  {item.q}
                  <span style={{ color: "#6366f1", fontSize: 20, flexShrink: 0 }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <p style={{ padding: "0 24px 18px", margin: 0, fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ───────────────────────────────── */}
        <section style={{ padding: "var(--page-section-y) var(--page-pad) calc(var(--page-section-y) + env(safe-area-inset-bottom, 0px))", textAlign: "center", background: "linear-gradient(180deg,transparent,rgba(99,102,241,0.06))" }}>
          <h2 style={{ fontSize: "clamp(26px,4vw,48px)", fontWeight: 900, marginBottom: 16 }}>
            Ready to go <span className="grad">hands-free?</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, marginBottom: 32 }}>
            Enable your camera above and start navigating with gestures.
          </p>
          <button
            onClick={onStartCamera}
            disabled={modelStatus !== "loaded" || cameraActive}
            style={{
              padding: "18px 44px", borderRadius: 99, border: "none",
              background: "linear-gradient(135deg,#6366f1,#a855f7)",
              color: "white", fontSize: 18, fontWeight: 800,
              cursor: modelStatus === "loaded" && !cameraActive ? "pointer" : "default",
              opacity: cameraActive ? 0.5 : 1,
              boxShadow: "0 0 60px rgba(99,102,241,0.4)",
            }}
          >
            {cameraActive ? "✅ Already Active" : "🎥 Enable Gesture Control"}
          </button>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
