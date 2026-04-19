import React from "react";

const team = [
  { name: "Aria Chen", role: "AI Research Lead", bio: "PhD in Computer Vision from MIT. Former research scientist at DeepMind. Led the handpose model integration.", initials: "AC", from: "#6366f1", to: "#a855f7", socials: ["𝕏", "in", "gh"] },
  { name: "Marcus Webb", role: "Frontend Architect", bio: "10 years building interactive web experiences. React core contributor. Obsessed with 60fps everything.", initials: "MW", from: "#06b6d4", to: "#6366f1", socials: ["𝕏", "in", "gh"] },
  { name: "Priya Nair", role: "ML Engineer", bio: "Specializes in on-device inference optimization and TensorFlow.js. Cut detection latency by 40% in v2.", initials: "PN", from: "#a855f7", to: "#ec4899", socials: ["𝕏", "in", "gh"] },
  { name: "Jonas Richter", role: "UX Director", bio: "Designed gesture UIs for automotive dashboards and smart home systems. Author of 'Touchless Design Principles'.", initials: "JR", from: "#f59e0b", to: "#ef4444", socials: ["𝕏", "in"] },
  { name: "Sofia Okafor", role: "DevRel Engineer", bio: "Open source advocate. Built community tooling used by 50K+ devs. Runs our monthly gesture-dev office hours.", initials: "SO", from: "#10b981", to: "#06b6d4", socials: ["𝕏", "in", "gh"] },
  { name: "Lee Park", role: "Performance Engineer", bio: "WebGL and WASM specialist. Reduced per-frame CPU overhead by 60% through batched state updates.", initials: "LP", from: "#ef4444", to: "#a855f7", socials: ["𝕏", "gh"] },
];

const openRoles = [
  { title: "Senior ML Engineer", type: "Full-time", location: "Remote (US/EU)", color: "#6366f1" },
  { title: "WebGL Graphics Engineer", type: "Full-time", location: "San Francisco / Remote", color: "#a855f7" },
  { title: "Gesture UX Researcher", type: "Contract", location: "Remote", color: "#06b6d4" },
  { title: "Developer Advocate", type: "Full-time", location: "Remote (global)", color: "#10b981" },
];

const perks = [
  { icon: "🌍", title: "Fully Remote", desc: "Work from anywhere. We have team members in 8 countries." },
  { icon: "🏖", title: "Unlimited PTO", desc: "Take the time you need. We trust you to manage your own energy." },
  { icon: "📚", title: "$3K Learning Budget", desc: "Books, courses, conferences — invest in your growth." },
  { icon: "🖥", title: "Top-tier Gear", desc: "M4 MacBook Pro + your choice of peripherals, shipped to your door." },
  { icon: "🏥", title: "Full Health Cover", desc: "Medical, dental, and vision. Covered in full for you and your family." },
  { icon: "📈", title: "Equity Package", desc: "Meaningful ownership stake for every full-time team member." },
];

const TeamPage: React.FC = () => (
  <div className="page-wrap page-enter" style={{ background: "linear-gradient(160deg,#08080f,#0a100a)" }}>
    <div className="orb" style={{ width: 500, height: 500, background: "#10b981", opacity: 0.12, top: -100, right: 0 }} />
    <div className="orb" style={{ width: 400, height: 400, background: "#6366f1", bottom: -100, left: 0 }} />

    <div className="page-scroll" style={{ position: "relative", zIndex: 1 }}>
      <div className="page-inner">

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#10b981", marginBottom: 12 }}>The Team</p>
          <h2 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 900, lineHeight: 1.1 }}>
            Built by people who <br /><span className="grad-green">love the future</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", marginTop: 16, fontSize: 15, maxWidth: 500, margin: "16px auto 0" }}>
            A small, focused team of engineers, designers, and researchers — all obsessed with making the web touchless.
          </p>
        </div>

        {/* ── Team grid ── */}
        <div className="r-grid-3" style={{ gap: 20, marginBottom: 80 }}>
          {team.map((member, i) => (
            <div key={member.name} className="glass" style={{ borderRadius: 20, padding: 28, position: "relative", overflow: "hidden", animationDelay: `${i * 0.07}s` }}>
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 80% -20%,${member.from}18,transparent 60%)`, pointerEvents: "none" }} />
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: `linear-gradient(135deg,${member.from},${member.to})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, fontWeight: 900, marginBottom: 16,
                boxShadow: `0 0 24px ${member.from}44`,
              }}>
                {member.initials}
              </div>
              <h3 style={{ fontWeight: 800, fontSize: 17, marginBottom: 4 }}>{member.name}</h3>
              <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 2, color: member.from, fontWeight: 600, marginBottom: 12 }}>{member.role}</p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: 20 }}>{member.bio}</p>
              <div style={{ display: "flex", gap: 8 }}>
                {member.socials.map(s => (
                  <span key={s} style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, cursor: "none" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Perks ── */}
        <div style={{ marginBottom: 80 }}>
          <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#6366f1", marginBottom: 12, textAlign: "center" }}>Benefits</p>
          <h3 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 900, textAlign: "center", marginBottom: 40 }}>What we offer</h3>
          <div className="r-grid-3">
            {perks.map(p => (
              <div key={p.title} className="glass" style={{ borderRadius: 16, padding: "24px 20px" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{p.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>{p.title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Open roles ── */}
        <div>
          <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#10b981", marginBottom: 12, textAlign: "center" }}>We're Hiring</p>
          <h3 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 900, textAlign: "center", marginBottom: 40 }}>Open positions</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {openRoles.map(r => (
              <div key={r.title} className="glass roles-row" style={{ borderRadius: 14, padding: "20px 24px" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{r.title}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>{r.location} &nbsp;·&nbsp; {r.type}</div>
                </div>
                <button type="button" style={{
                  padding: "10px 22px", borderRadius: 99, border: `1px solid ${r.color}66`,
                  background: `${r.color}18`, color: r.color, fontSize: 13, fontWeight: 600, cursor: "pointer",
                  flexShrink: 0,
                }}>
                  Apply →
                </button>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "rgba(255,255,255,0.3)" }}>
            Don't see your role? Send a speculative application to <span style={{ color: "#6366f1" }}>jobs@gesture.ai</span>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default TeamPage;
