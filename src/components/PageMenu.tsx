import React, { useEffect, useRef, useState } from "react";

export interface PageInfo {
  id: string;
  title: string;
  icon: string;
  color: string;
  bg: string;
}

interface Props {
  pages: PageInfo[];
  currentPage: number;
  cursorPos: { x: number; y: number };
  twoFingerHeld: boolean;
  openPalmHeld: boolean;   // open palm held inside menu (post-warmup) → same as two-finger select
  menuReady: boolean;      // false during 2s warmup — no gesture input accepted
  onSelect: (index: number) => void;
  onClose: () => void;
}

const HOLD_MS    = 3000;   // ms of ✌️ / 🖐 hold to navigate
const AUTO_CLOSE = 20000;  // auto-close if idle (20 seconds)
const AUTO_CLOSE_S = AUTO_CLOSE / 1000;

const WARMUP_S   = 2;      // seconds shown in countdown (must match App MENU_WARMUP/1000)

const PageMenu: React.FC<Props> = ({
  pages, currentPage, cursorPos, twoFingerHeld, openPalmHeld, menuReady, onSelect, onClose,
}) => {
  // ── Warmup countdown (2 → 1 → 0 → ready) ────────────
  const [countdown, setCountdown] = useState(WARMUP_S);
  useEffect(() => {
    setCountdown(WARMUP_S);
    if (menuReady) return;
    const start = Date.now();
    const id = setInterval(() => {
      const remaining = Math.max(0, WARMUP_S - Math.floor((Date.now() - start) / 1000));
      setCountdown(remaining);
      if (remaining === 0) clearInterval(id);
    }, 200);
    return () => clearInterval(id);
  }, [menuReady]);

  // ── Auto-close countdown (20 → 0) ─────────────────────
  const [autoCloseRemaining, setAutoCloseRemaining] = useState(AUTO_CLOSE_S);
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const remaining = Math.max(0, AUTO_CLOSE_S - Math.floor((Date.now() - start) / 1000));
      setAutoCloseRemaining(remaining);
    }, 500);
    return () => clearInterval(id);
  }, []);

  // ── Card hover tracking ────────────────────────────────
  const cardRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [progress, setProgress]     = useState(0);

  const hoveredIdxRef  = useRef<number | null>(null);
  const twoFingerRef   = useRef(false);
  const openPalmRef    = useRef(false);
  const holdStart      = useRef<number | null>(null);
  const intervalRef    = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { twoFingerRef.current  = twoFingerHeld;  }, [twoFingerHeld]);
  useEffect(() => { openPalmRef.current   = openPalmHeld;   }, [openPalmHeld]);

  // Find which card the cursor is over (only when menu is ready)
  useEffect(() => {
    if (!menuReady) {
      // During warmup, clear any hover state
      if (hoveredIdxRef.current !== null) {
        hoveredIdxRef.current = null;
        setHoveredIdx(null);
        setProgress(0);
      }
      return;
    }

    let found: number | null = null;
    for (let i = 0; i < cardRefs.current.length; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (cursorPos.x >= r.left && cursorPos.x <= r.right &&
          cursorPos.y >= r.top  && cursorPos.y <= r.bottom) {
        found = i;
        break;
      }
    }

    if (found !== hoveredIdxRef.current) {
      hoveredIdxRef.current = found;
      setHoveredIdx(found);
      setProgress(0);
      holdStart.current = null;
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    }
  }, [cursorPos, menuReady]);

  // Hold timer — counts while ✌️ or 🖐 active over a card
  useEffect(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    setProgress(0);
    holdStart.current = null;
    if (hoveredIdx === null || !menuReady) return;

    intervalRef.current = setInterval(() => {
      const gestureActive = twoFingerRef.current || openPalmRef.current;
      if (!gestureActive) {
        holdStart.current = null;
        setProgress(0);
        return;
      }
      if (holdStart.current === null) holdStart.current = Date.now();
      const held = Date.now() - holdStart.current;
      const p = Math.min(held / HOLD_MS, 1);
      setProgress(p);
      if (p >= 1) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        onSelect(hoveredIdx);
      }
    }, 30);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [hoveredIdx, menuReady, onSelect]);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  useEffect(() => {
    const t = setTimeout(onClose, AUTO_CLOSE);
    return () => clearTimeout(t);
  }, [onClose]);

  const gestureHeld = twoFingerHeld || openPalmHeld;

  const R = 20;
  const C = 2 * Math.PI * R;

  return (
    <div className="menu-overlay" onClick={onClose}>
      <button type="button" className="menu-close-btn" onClick={e => { e.stopPropagation(); onClose(); }} aria-label="Close menu">×</button>
      <div onClick={e => e.stopPropagation()} className="menu-inner">

        {/* ── Header ── */}
        <div className="menu-header">
          <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "rgba(99,102,241,0.8)", marginBottom: 8 }}>
            Navigate
          </p>
          <h2 style={{ fontWeight: 800, background: "linear-gradient(135deg,#6366f1,#a855f7,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Where to?
          </h2>

          {/* Status line + 20s countdown ring */}
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div className="menu-status-text">
              {!menuReady ? (
                <>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#f59e0b", boxShadow: "0 0 8px #f59e0b", display: "inline-block" }} />
                  Change your gesture — ready in {countdown}s
                </>
              ) : gestureHeld ? (
                <>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#6366f1", boxShadow: "0 0 8px #6366f1", display: "inline-block" }} />
                  {hoveredIdx !== null ? `Holding on ${pages[hoveredIdx].title}…` : (twoFingerHeld ? "✌️" : "🖐") + "  Point at a page"}
                </>
              ) : (
                <>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "inline-block" }} />
                  ☝️  Point · ✌️ or 🖐 hold 3s · 🤏 pinch to close
                </>
              )}
            </div>
            {/* 20s auto-close ring */}
            {menuReady && (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <svg width={28} height={28} viewBox="0 0 28 28" style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
                  <circle cx="14" cy="14" r="11" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" fill="none" />
                  <circle
                    cx="14" cy="14" r="11"
                    stroke={autoCloseRemaining <= 5 ? "#ef4444" : "#6366f1"}
                    strokeWidth="2.5" fill="none"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 11}
                    strokeDashoffset={2 * Math.PI * 11 * (1 - autoCloseRemaining / AUTO_CLOSE_S)}
                    style={{ transition: "stroke-dashoffset 0.5s linear, stroke 0.3s" }}
                  />
                </svg>
                <span style={{ fontSize: 11, color: autoCloseRemaining <= 5 ? "#ef4444" : "rgba(255,255,255,0.25)", fontWeight: 600, transition: "color 0.3s" }}>
                  closes in {autoCloseRemaining}s
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Page cards ── */}
        <div className="menu-page-grid">
          {pages.map((p, i) => {
            const isHovered = menuReady && hoveredIdx === i;
            const isActive  = currentPage === i;
            const prog      = isHovered ? progress : 0;

            return (
              <div
                key={p.id}
                ref={el => { cardRefs.current[i] = el; }}
                className={`menu-card glass ${isActive ? "active-page" : ""} ${isHovered ? "hovered" : ""}`}
                style={{
                  borderRadius: 16, padding: "20px 14px", textAlign: "center",
                  position: "relative", overflow: "hidden", cursor: "none",
                  // dim cards during warmup
                  opacity: menuReady ? 1 : 0.45,
                  transition: "opacity 0.4s ease, transform 0.18s ease, box-shadow 0.18s ease",
                }}
                onClick={() => menuReady && onSelect(i)}
              >
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 0%,${p.color}22,transparent 70%)`, pointerEvents: "none" }} />

                {/* Progress ring — when ✌️ or 🖐 held */}
                {isHovered && gestureHeld && prog > 0 && (
                  <svg className="menu-card-ring" style={{ position: "absolute", top: 6, right: 6, transform: "rotate(-90deg)" }} width={48} height={48} viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r={R} stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />
                    <circle
                      cx="24" cy="24" r={R} stroke={p.color} strokeWidth="3" fill="none"
                      strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C - prog * C}
                    />
                  </svg>
                )}

                <div className="menu-card-icon" style={{ fontSize: 34, marginBottom: 8, flexShrink: 0 }}>{p.icon}</div>
                <div className="menu-card-body">
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontWeight: 600, letterSpacing: 2 }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                {isActive && (
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${p.color},transparent)` }} />
                )}

                {isHovered && !gestureHeld && (
                  <div className="menu-card-hint" style={{ position: "absolute", bottom: 6, left: 0, right: 0, textAlign: "center", fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: 1 }}>
                    ✌️ or 🖐
                  </div>
                )}
              </div>
            );
          })}

          {/* Warmup overlay on the grid */}
          {!menuReady && (
            <div className="menu-warmup-overlay">
              <svg width={64} height={64} viewBox="0 0 80 80" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="40" cy="40" r="34" stroke="rgba(255,255,255,0.08)" strokeWidth="4" fill="none" />
                <circle
                  cx="40" cy="40" r="34"
                  stroke="#f59e0b" strokeWidth="4" fill="none"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 34}
                  strokeDashoffset={2 * Math.PI * 34 * (1 - countdown / WARMUP_S)}
                  style={{ transition: "stroke-dashoffset 0.2s linear" }}
                />
              </svg>
              <div style={{ position: "absolute", fontSize: 24, fontWeight: 900, color: "#f59e0b" }}>
                {countdown}
              </div>
              <div style={{ marginTop: 44, fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "center" }}>
                Change your gesture<br />
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>to avoid accidental selection</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Instructions ── */}
        <div className="menu-footer-hints">
          {[
            { icon: "☝️", text: "Point at page" },
            { icon: "✌️ 🖐", text: "Hold 3s to navigate" },
            { icon: "🤏", text: "Pinch to close" },
          ].map(h => (
            <div key={h.text} style={{ display: "flex", alignItems: "center", gap: 7, color: "rgba(255,255,255,0.28)", fontSize: 12 }}>
              <span>{h.icon}</span><span>{h.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageMenu;
