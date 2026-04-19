import React, { useState } from "react";

const contacts = [
  { icon: "📍", label: "Location", value: "548 Market St, San Francisco, CA 94105" },
  { icon: "✉️", label: "Email", value: "hello@gesture.ai" },
  { icon: "📞", label: "Phone", value: "+1 (415) 555-0190" },
  { icon: "🕐", label: "Hours", value: "Mon–Fri, 9am–6pm PST" },
];

const offices = [
  { city: "San Francisco", country: "USA", flag: "🇺🇸", timezone: "UTC−8", lead: "Aria Chen" },
  { city: "Berlin", country: "Germany", flag: "🇩🇪", timezone: "UTC+1", lead: "Jonas Richter" },
  { city: "Singapore", country: "Singapore", flag: "🇸🇬", timezone: "UTC+8", lead: "Lee Park" },
];

const topics = [
  "General enquiry", "Partnership", "Press / Media", "Careers", "Technical support", "Custom project",
];

const ContactPage: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState("General enquiry");

  return (
    <div className="page-wrap page-enter" style={{ background: "linear-gradient(160deg,#08080f,#0a0812)" }}>
      <div className="orb" style={{ width: 600, height: 600, background: "#8b5cf6", top: -200, left: -200 }} />
      <div className="orb" style={{ width: 400, height: 400, background: "#06b6d4", bottom: -100, right: 0 }} />

      <div className="page-scroll" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "80px 40px" }}>

          {/* ── Header ── */}
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#8b5cf6", marginBottom: 12 }}>Contact</p>
            <h2 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 900, lineHeight: 1.1 }}>
              Let's build something <br /><span className="grad">remarkable together</span>
            </h2>
          </div>

          {/* ── Form + info ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 60 }}>
            {/* Form */}
            <div className="glass" style={{ borderRadius: 24, padding: 36 }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
                  <h3 style={{ fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Message sent!</h3>
                  <p style={{ color: "rgba(255,255,255,0.4)" }}>We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSent(false)} style={{ marginTop: 20, padding: "10px 24px", borderRadius: 99, border: "1px solid rgba(255,255,255,0.15)", background: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 14 }}>
                    Send another
                  </button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 24 }}>Send a message</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      {[{ label: "First name", placeholder: "Jane" }, { label: "Last name", placeholder: "Smith" }].map(f => (
                        <div key={f.label}>
                          <label style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 6 }}>{f.label}</label>
                          <input placeholder={f.placeholder} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: 14, outline: "none" }} />
                        </div>
                      ))}
                    </div>
                    {[
                      { label: "Email", placeholder: "jane@company.com", type: "email" },
                      { label: "Company", placeholder: "Acme Corp (optional)", type: "text" },
                    ].map(f => (
                      <div key={f.label}>
                        <label style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 6 }}>{f.label}</label>
                        <input type={f.type} placeholder={f.placeholder} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: 14, outline: "none" }} />
                      </div>
                    ))}
                    <div>
                      <label style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 6 }}>Topic</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {topics.map(t => (
                          <button key={t} onClick={() => setTopic(t)} style={{
                            padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600, cursor: "pointer",
                            background: topic === t ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.05)",
                            border: topic === t ? "1px solid rgba(99,102,241,0.5)" : "1px solid rgba(255,255,255,0.08)",
                            color: topic === t ? "#a5b4fc" : "rgba(255,255,255,0.45)",
                          }}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 6 }}>Message</label>
                      <textarea placeholder="Tell us about your project..." rows={4} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: 14, outline: "none", resize: "none", fontFamily: "inherit" }} />
                    </div>
                    <button onClick={() => setSent(true)} style={{ padding: "14px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#6366f1,#a855f7)", color: "white", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 24px rgba(99,102,241,0.4)" }}>
                      Send Message →
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Info column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {contacts.map(c => (
                <div key={c.label} className="glass" style={{ borderRadius: 16, padding: "18px 22px", display: "flex", gap: 14, alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                    {c.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 2, textTransform: "uppercase", letterSpacing: 1 }}>{c.label}</div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{c.value}</div>
                  </div>
                </div>
              ))}
              <div className="glass" style={{ borderRadius: 16, padding: 22 }}>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 14, textTransform: "uppercase", letterSpacing: 2 }}>Follow us</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["𝕏 Twitter", "in LinkedIn", "gh GitHub", "▶ YouTube"].map(s => (
                    <button key={s} style={{ padding: "8px 14px", borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Global offices ── */}
          <div style={{ marginBottom: 60 }}>
            <h3 style={{ fontSize: 22, fontWeight: 900, textAlign: "center", marginBottom: 28 }}>Global offices</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {offices.map(o => (
                <div key={o.city} className="glass" style={{ borderRadius: 16, padding: 24, textAlign: "center" }}>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>{o.flag}</div>
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{o.city}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>{o.country}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginBottom: 12 }}>{o.timezone}</div>
                  <div style={{ fontSize: 12, color: "#6366f1" }}>Lead: {o.lead}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Response time promise ── */}
          <div style={{ textAlign: "center", padding: "40px 24px", borderRadius: 20, background: "linear-gradient(135deg,rgba(139,92,246,0.1),rgba(6,182,212,0.1))", border: "1px solid rgba(139,92,246,0.2)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⚡</div>
            <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8 }}>We respond fast</h3>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, maxWidth: 480, margin: "0 auto" }}>
              All messages receive a human response within 24 business hours. For urgent technical issues, use our
              Discord community for near-instant support from the team and the community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
