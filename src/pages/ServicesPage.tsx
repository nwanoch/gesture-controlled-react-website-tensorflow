import React from "react";

const services = [
  {
    icon: "🎯", title: "Gesture UI Integration", price: "$2,400", period: "per project",
    desc: "Add touchless gesture controls to any existing web application.",
    features: ["Custom gesture mapping", "Existing app integration", "Performance tuning", "6-month support", "Documentation"],
    color: "#6366f1", hot: false,
  },
  {
    icon: "🚀", title: "Full Experience Build", price: "$8,900", period: "per project",
    desc: "End-to-end gesture-controlled web experience designed and built from scratch.",
    features: ["Custom gesture library", "Full UI/UX design", "7+ pages", "Analytics", "12-month support", "Source code"],
    color: "#a855f7", hot: true,
  },
  {
    icon: "📦", title: "API Access", price: "$0.004", period: "per inference",
    desc: "Integrate gesture recognition into your backend or native app via our cloud API.",
    features: ["REST & WebSocket", "99.9% SLA", "Sub-30ms response", "Global edge", "SDKs (JS, Python, Swift)"],
    color: "#06b6d4", hot: false,
  },
];

const testimonials = [
  { name: "Sarah K.", role: "CTO, PresentAI", text: "We integrated gesture controls into our presentation tool in a week. The API is incredibly clean and the detection accuracy exceeded our expectations.", avatar: "SK", color: "#6366f1" },
  { name: "Marco R.", role: "Lead Dev, Touchless Labs", text: "The full build service was worth every penny. They delivered a gesture-driven dashboard that our clients absolutely love — and on time.", avatar: "MR", color: "#a855f7" },
  { name: "Aisha T.", role: "Product, NeuralUI", text: "API response times are consistently under 25ms even at our peak traffic. The WebSocket stream is rock-solid for real-time applications.", avatar: "AT", color: "#06b6d4" },
];

const process = [
  { step: "01", title: "Discovery Call", desc: "30-minute video call to understand your use case, existing stack, and gesture requirements." },
  { step: "02", title: "Scope & Proposal", desc: "We send a detailed technical proposal with milestones, deliverables, and a fixed price within 48 hours." },
  { step: "03", title: "Build Sprint", desc: "Agile 2-week sprints. You get a staging link after each sprint to test gesture interactions live." },
  { step: "04", title: "QA & Handover", desc: "Full QA across browsers and lighting conditions. Source code, docs, and training session included." },
];

const ServicesPage: React.FC = () => (
  <div className="page-wrap page-enter" style={{ background: "linear-gradient(160deg,#08080f,#0c0818)" }}>
    <div className="orb" style={{ width: 500, height: 500, background: "#a855f7", top: -100, left: -100 }} />
    <div className="orb" style={{ width: 400, height: 400, background: "#06b6d4", bottom: -100, right: 0 }} />

    <div className="page-scroll" style={{ position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "80px 40px" }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#a855f7", marginBottom: 12 }}>Services</p>
          <h2 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 900, lineHeight: 1.1 }}>
            Build gesture-first <br /><span className="grad">products with us</span>
          </h2>
        </div>

        {/* ── Pricing cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 80 }}>
          {services.map(s => (
            <div key={s.title} className="glass" style={{
              borderRadius: 24, padding: 32, position: "relative", overflow: "hidden",
              border: s.hot ? `1px solid ${s.color}66` : "1px solid rgba(255,255,255,0.08)",
              display: "flex", flexDirection: "column",
            }}>
              {s.hot && (
                <div style={{ position: "absolute", top: 16, right: 16, background: "linear-gradient(135deg,#6366f1,#a855f7)", padding: "4px 12px", borderRadius: 99, fontSize: 11, fontWeight: 700 }}>
                  Most Popular
                </div>
              )}
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 20% 20%,${s.color}18,transparent 60%)`, pointerEvents: "none" }} />
              <div style={{ fontSize: 40, marginBottom: 16 }}>{s.icon}</div>
              <h3 style={{ fontWeight: 800, fontSize: 20, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 24, flex: 1 }}>{s.desc}</p>
              <div style={{ marginBottom: 20 }}>
                <span style={{ fontSize: 36, fontWeight: 900, color: s.color }}>{s.price}</span>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginLeft: 6 }}>{s.period}</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: 24, display: "flex", flexDirection: "column", gap: 8 }}>
                {s.features.map(f => (
                  <li key={f} style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ color: s.color }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button style={{
                padding: "14px", borderRadius: 12, border: "none",
                background: s.hot ? `linear-gradient(135deg,${s.color},#a855f7)` : `${s.color}22`,
                color: s.hot ? "white" : s.color, fontSize: 14, fontWeight: 700, cursor: "pointer",
                ...(s.hot ? {} : { border: `1px solid ${s.color}44` }),
              } as React.CSSProperties}>
                Get Started →
              </button>
            </div>
          ))}
        </div>

        {/* ── Process ── */}
        <div style={{ marginBottom: 80 }}>
          <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#06b6d4", marginBottom: 12, textAlign: "center" }}>Process</p>
          <h3 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 900, textAlign: "center", marginBottom: 40 }}>How we work</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {process.map((p, i) => (
              <div key={p.step} className="glass" style={{ borderRadius: 16, padding: 24, position: "relative" }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#06b6d4", marginBottom: 12 }}>{p.step}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{p.title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{p.desc}</div>
                {i < process.length - 1 && (
                  <div style={{ position: "absolute", right: -14, top: "50%", transform: "translateY(-50%)", fontSize: 18, color: "rgba(99,102,241,0.4)" }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div>
          <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#a855f7", marginBottom: 12, textAlign: "center" }}>Testimonials</p>
          <h3 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 900, textAlign: "center", marginBottom: 40 }}>What clients say</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {testimonials.map(t => (
              <div key={t.name} className="glass" style={{ borderRadius: 20, padding: 28 }}>
                <div style={{ fontSize: 28, marginBottom: 16, color: "#f59e0b" }}>❝</div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 24 }}>{t.text}</p>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: `linear-gradient(135deg,${t.color},#a855f7)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 900, fontSize: 14,
                  }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div style={{ textAlign: "center", marginTop: 64, padding: "48px 40px", borderRadius: 24, background: "linear-gradient(135deg,rgba(99,102,241,0.1),rgba(168,85,247,0.1))", border: "1px solid rgba(99,102,241,0.2)" }}>
          <h3 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12 }}>Ready to build something remarkable?</h3>
          <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 28, fontSize: 15 }}>No commitment required — start with a free 30-minute discovery call.</p>
          <button style={{ padding: "16px 40px", borderRadius: 99, border: "none", background: "linear-gradient(135deg,#6366f1,#a855f7)", color: "white", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 0 40px rgba(99,102,241,0.4)" }}>
            Book a Call →
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ServicesPage;
