import React, { useCallback, useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";

import PageMenu, { PageInfo } from "./components/PageMenu";
import GestureCursor from "./components/GestureCursor";
import NavDots from "./components/NavDots";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FeaturesPage from "./pages/FeaturesPage";
import GalleryPage from "./pages/GalleryPage";
import ServicesPage from "./pages/ServicesPage";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";

export const PAGES: PageInfo[] = [
  { id: "home",     title: "Home",     icon: "🏠", color: "#6366f1", bg: "#0d0d20" },
  { id: "about",    title: "About",    icon: "✨", color: "#a855f7", bg: "#0d0820" },
  { id: "features", title: "Features", icon: "⚡", color: "#06b6d4", bg: "#080d20" },
  { id: "gallery",  title: "Gallery",  icon: "🎨", color: "#f59e0b", bg: "#140d08" },
  { id: "services", title: "Services", icon: "🚀", color: "#a855f7", bg: "#0d0818" },
  { id: "team",     title: "Team",     icon: "👥", color: "#10b981", bg: "#080d0a" },
  { id: "contact",  title: "Contact",  icon: "💬", color: "#8b5cf6", bg: "#0a0812" },
];

const PAGE_COMPONENTS = [
  HomePage, AboutPage, FeaturesPage, GalleryPage, ServicesPage, TeamPage, ContactPage,
];

// ─── Finger geometry (px, MCP-knuckle → fingertip) ───────────────────────────
// Use "not extended" rather than "explicitly curled" for non-active fingers —
// avoids the dead-zone where a loose curl sits between EXT and CURL thresholds.
const EXT_MCP  = 50;   // finger clearly extended (MCP→TIP)

// ─── Gesture timers ───────────────────────────────────────────────────────────
const PALM_HOLD_MS      = 1000;  // hold open palm to open menu (or select in menu)
const PINCH_DIST        = 40;
const PINCH_HOLD_MS     = 600;
const SCROLL_PX         = 9;
const MENU_WARMUP       = 2000;

// ─── Debounce / anti-flicker ──────────────────────────────────────────────────
// Gesture must be held consistently before scroll fires
const GESTURE_CONFIRM_MS = 600;
// Cursor appears only after this many consecutive frames with a detected hand
const CURSOR_SHOW_FRAMES  = 6;
// Cursor disappears only after this many consecutive frames WITHOUT a hand
const CURSOR_HIDE_FRAMES  = 10;

// ─── Cursor smoothing ─────────────────────────────────────────────────────────
const SMOOTH_ALPHA = 0.20;
const DEAD_ZONE_PX = 5;

const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modelRef = useRef<handpose.HandPose | null>(null);
  const rafRef   = useRef<number>();

  const [modelStatus, setModelStatus]     = useState<"loading" | "loaded" | "error">("loading");
  const [cameraActive, setCameraActive]   = useState(false);
  const [currentPage, setCurrentPage]     = useState(0);
  const [showMenu, setShowMenu]           = useState(false);
  const [menuReady, setMenuReady]         = useState(false);
  const [cursor, setCursor]               = useState({ x: -400, y: -400 });
  const [gestureLabel, setGestureLabel]   = useState("");
  const [gestureActive, setGestureActive] = useState<"index-up" | "fist" | "palm-hold" | "pinch" | "two" | "palm-select" | "none">("none");
  const [palmHoldProg, setPalmHoldProg]   = useState(0);
  const [confirmProg, setConfirmProg]     = useState(0);   // 0–1 while debouncing scroll
  const [twoFingerHeld, setTwoFingerHeld] = useState(false);
  const [openPalmInMenu, setOpenPalmInMenu] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  // ── Refs read inside RAF ─────────────────────────────
  const showMenuRef     = useRef(false);
  const menuReadyRef    = useRef(false);
  const palmHoldStart   = useRef<number | null>(null);
  const pinchHoldStart  = useRef<number | null>(null);
  const smoothCursor    = useRef({ x: -400, y: -400 });
  const labelTimer      = useRef<ReturnType<typeof setTimeout>>();
  const warmupTimer     = useRef<ReturnType<typeof setTimeout>>();

  // ── Debounce refs ────────────────────────────────────
  // Frame counters for cursor visibility
  const handPresentFrames = useRef(0);
  const handAbsentFrames  = useRef(0);
  const cursorVisible     = useRef(false);  // tracks if cursor is currently shown
  // Gesture confirmation — scroll only fires after GESTURE_CONFIRM_MS of the same gesture
  const gestureConfirm = useRef<{ name: string; since: number } | null>(null);

  useEffect(() => { showMenuRef.current  = showMenu;  }, [showMenu]);
  useEffect(() => { menuReadyRef.current = menuReady; }, [menuReady]);

  // ── Menu warmup ──────────────────────────────────────
  useEffect(() => {
    if (warmupTimer.current) clearTimeout(warmupTimer.current);
    if (showMenu) {
      setMenuReady(false);
      warmupTimer.current = setTimeout(() => setMenuReady(true), MENU_WARMUP);
    } else {
      setMenuReady(false);
      palmHoldStart.current = null;
      setPalmHoldProg(0);
    }
    return () => { if (warmupTimer.current) clearTimeout(warmupTimer.current); };
  }, [showMenu]);

  // ── Load model ────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        await tf.ready();
        modelRef.current = await handpose.load();
        setModelStatus("loaded");
      } catch { setModelStatus("error"); }
    })();
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const navigateTo = useCallback((idx: number) => {
    if (idx === currentPage) { setShowMenu(false); return; }
    setTransitioning(true);
    setShowMenu(false);
    setTimeout(() => { setCurrentPage(idx); setTransitioning(false); }, 350);
  }, [currentPage]);

  const flashGesture = useCallback((label: string) => {
    if (labelTimer.current) clearTimeout(labelTimer.current);
    setGestureLabel(label);
    labelTimer.current = setTimeout(() => setGestureLabel(""), 1200);
  }, []);

  // ── Detection loop ────────────────────────────────────
  const runDetection = useCallback(() => {
    const scrollEl = () => document.querySelector<HTMLElement>(".page-scroll");

    const detect = async () => {
      const video = videoRef.current;
      if (!video || video.readyState < 4 || !modelRef.current) {
        rafRef.current = requestAnimationFrame(detect);
        return;
      }

      try {
        const preds = await modelRef.current.estimateHands(video);

        // ── No hand detected ───────────────────────────
        if (preds.length === 0) {
          handPresentFrames.current = 0;
          handAbsentFrames.current  += 1;

          // Hide cursor only after enough absent frames (stops blink)
          if (handAbsentFrames.current >= CURSOR_HIDE_FRAMES && cursorVisible.current) {
            cursorVisible.current = false;
            smoothCursor.current  = { x: -400, y: -400 };
            setCursor({ x: -400, y: -400 });
          }

          // Reset all gesture state
          palmHoldStart.current  = null;
          pinchHoldStart.current = null;
          gestureConfirm.current = null;
          setPalmHoldProg(0);
          setConfirmProg(0);
          setGestureActive("none");
          setTwoFingerHeld(false);
          setOpenPalmInMenu(false);
          rafRef.current = requestAnimationFrame(detect);
          return;
        }

        // ── Hand detected ──────────────────────────────
        handAbsentFrames.current  = 0;
        handPresentFrames.current += 1;

        const hand = preds[0];
        const vw   = video.videoWidth  || 640;
        const vh   = video.videoHeight || 480;

        const ann = hand.annotations;
        const idxTip   = ann.indexFinger[3];
        const midTip   = ann.middleFinger[3];
        const rngTip   = ann.ringFinger[3];
        const pnkTip   = ann.pinky[3];
        const thumbTip = ann.thumb[3];

        // MCP = knuckle joint (index 0 in each finger array)
        const idxMCP = ann.indexFinger[0];
        const midMCP = ann.middleFinger[0];
        const rngMCP = ann.ringFinger[0];
        const pnkMCP = ann.pinky[0];

        const dist = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1]);
        const idxD = dist(idxMCP, idxTip);
        const midD = dist(midMCP, midTip);
        const rngD = dist(rngMCP, rngTip);
        const pnkD = dist(pnkMCP, pnkTip);

        // "Extended" = MCP→TIP > EXT_MCP. Everything else = not extended.
        // We classify non-active fingers as "!extended" rather than requiring
        // a strict curl distance — avoids the dead-zone for loose fists.
        const idxExt = idxD > EXT_MCP;
        const midExt = midD > EXT_MCP;
        const rngExt = rngD > EXT_MCP;
        const pnkExt = pnkD > EXT_MCP;

        const isOpenPalm  = idxExt  && midExt  && rngExt  && pnkExt;
        const isIndexUp   = idxExt  && !midExt && !rngExt && !pnkExt;
        const isFist      = !idxExt && !midExt && !rngExt && !pnkExt;
        const isTwoFinger = idxExt  && midExt  && !rngExt && !pnkExt;
        const isPinch     = dist(thumbTip, idxTip) < PINCH_DIST;

        // ── Smoothed cursor (shown only after CURSOR_SHOW_FRAMES) ──
        const rawX = (1 - idxTip[0] / vw) * window.innerWidth;
        const rawY = (idxTip[1] / vh) * window.innerHeight;
        const prev = smoothCursor.current;
        const newX = prev.x < 0 ? rawX : prev.x + SMOOTH_ALPHA * (rawX - prev.x);
        const newY = prev.y < 0 ? rawY : prev.y + SMOOTH_ALPHA * (rawY - prev.y);
        smoothCursor.current = { x: newX, y: newY };

        if (handPresentFrames.current >= CURSOR_SHOW_FRAMES) {
          if (!cursorVisible.current) cursorVisible.current = true;
          if (Math.hypot(newX - prev.x, newY - prev.y) > DEAD_ZONE_PX || prev.x < 0) {
            setCursor({ x: newX, y: newY });
          }
        }

        // ── Two-finger & open-palm-in-menu state ───────
        setTwoFingerHeld(isTwoFinger);
        setOpenPalmInMenu(isOpenPalm && showMenuRef.current && menuReadyRef.current);

        // ── Gesture confirmation debounce (for scroll) ─
        // Raw gesture name — palm-hold and pinch have own timers so exclude them
        const rawGesture = isIndexUp ? "index-up" : isFist ? "fist" : "other";

        if (rawGesture !== "other") {
          if (!gestureConfirm.current || gestureConfirm.current.name !== rawGesture) {
            gestureConfirm.current = { name: rawGesture, since: Date.now() };
          }
        } else {
          gestureConfirm.current = null;
        }

        const confirmDuration = gestureConfirm.current
          ? Date.now() - gestureConfirm.current.since
          : 0;
        const scrollConfirmed  = confirmDuration >= GESTURE_CONFIRM_MS;
        const scrollProgress   = Math.min(confirmDuration / GESTURE_CONFIRM_MS, 1);
        setConfirmProg(rawGesture !== "other" && !scrollConfirmed ? scrollProgress : 0);

        // ── Countdown safety: close menu if gesture changed during warmup ──
        if (showMenuRef.current && !menuReadyRef.current && !isOpenPalm) {
          palmHoldStart.current = null;
          setPalmHoldProg(0);
          setShowMenu(false);
          flashGesture("❌ Gesture changed — menu cancelled");
          rafRef.current = requestAnimationFrame(detect);
          return;
        }

        // ── Open-palm hold → open menu (when menu closed) ─
        if (isOpenPalm && !showMenuRef.current) {
          if (palmHoldStart.current === null) palmHoldStart.current = Date.now();
          const held = Date.now() - palmHoldStart.current;
          const prog = Math.min(held / PALM_HOLD_MS, 1);
          setPalmHoldProg(prog);
          setGestureActive("palm-hold");

          if (held >= PALM_HOLD_MS) {
            palmHoldStart.current = null;
            setPalmHoldProg(0);
            flashGesture("🖐 Open Palm — menu open");
            setShowMenu(true);
          }
        } else if (!isOpenPalm && !showMenuRef.current) {
          if (palmHoldStart.current !== null) {
            palmHoldStart.current = null;
            setPalmHoldProg(0);
          }
        }

        // ── Pinch-hold to close menu (post-warmup only) ─
        if (showMenuRef.current && menuReadyRef.current && isPinch) {
          if (pinchHoldStart.current === null) pinchHoldStart.current = Date.now();
          const held = Date.now() - pinchHoldStart.current;
          if (held >= PINCH_HOLD_MS) {
            pinchHoldStart.current = null;
            setShowMenu(false);
            flashGesture("🤏 Pinch — menu closed");
          }
        } else if (!isPinch) {
          pinchHoldStart.current = null;
        }

        // ── Scroll (menu closed, gesture confirmed) ────
        if (!showMenuRef.current) {
          if (isIndexUp) {
            setGestureActive("index-up");
            if (scrollConfirmed) scrollEl()?.scrollBy(0, -SCROLL_PX);
          } else if (isFist) {
            setGestureActive("fist");
            if (scrollConfirmed) scrollEl()?.scrollBy(0, SCROLL_PX);
          } else if (isOpenPalm) {
            setGestureActive("palm-hold");
          } else if (isTwoFinger) {
            setGestureActive("two");
          } else if (isPinch) {
            setGestureActive("pinch");
          } else {
            setGestureActive("none");
          }
        } else {
          // In menu
          setGestureActive(isPinch ? "pinch" : isTwoFinger ? "two" : isOpenPalm ? "palm-select" : "none");
        }

      } catch { /* silent */ }

      rafRef.current = requestAnimationFrame(detect);
    };

    detect();
  }, [flashGesture]);

  // ── Start camera ──────────────────────────────────────
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setCameraActive(true);
          runDetection();
        };
      }
    } catch (err) { console.error("Camera error:", err); }
  };

  // ── Keyboard shortcuts ────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigateTo(Math.min(currentPage + 1, PAGES.length - 1));
      if (e.key === "ArrowLeft")  navigateTo(Math.max(currentPage - 1, 0));
      if (e.key === "m" || e.key === "M") setShowMenu(v => !v);
      if (e.key === "Escape") setShowMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentPage, navigateTo]);

  const CurrentPage = PAGE_COMPONENTS[currentPage];

  // ── HUD label ─────────────────────────────────────────
  const hudText = (() => {
    if (!cameraActive) return null;
    if (showMenu && !menuReady) return "⏳ Change your gesture…";
    if (showMenu) {
      if (gestureActive === "pinch")       return "🤏 Hold pinch to close…";
      if (gestureActive === "two")         return "✌️  Hold 3s to navigate";
      if (gestureActive === "palm-select") return "🖐  Hold open palm 3s to navigate";
      return "☝️  Point · ✌️ or 🖐 hold 3s · 🤏 pinch to close";
    }
    if (gestureActive === "palm-hold") {
      return `🖐  Hold open palm… ${Math.round(palmHoldProg * 100)}%`;
    }
    if (gestureActive === "index-up") {
      return confirmProg < 1
        ? `☝️  Confirming… ${Math.round(confirmProg * 100)}%`
        : "☝️  Scrolling up";
    }
    if (gestureActive === "fist") {
      return confirmProg < 1
        ? `✊  Confirming… ${Math.round(confirmProg * 100)}%`
        : "✊  Scrolling down";
    }
    return "🖐  Hold palm 3s · ☝️ scroll up · ✊ scroll down";
  })();

  const hudActive = gestureActive !== "none" || palmHoldProg > 0;
  const hudProgress = palmHoldProg > 0 ? palmHoldProg : confirmProg;

  return (
    <div style={{ width: "100%", height: "100dvh", overflow: "hidden", position: "relative" }}>

      <div style={{
        position: "absolute", inset: 0,
        opacity: transitioning ? 0 : 1,
        transform: transitioning ? "scale(0.97)" : "scale(1)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}>
        <CurrentPage
          onStartCamera={startCamera}
          modelStatus={modelStatus}
          cameraActive={cameraActive}
          onNavigate={navigateTo}
          currentPage={currentPage}
          totalPages={PAGES.length}
        />
      </div>

      {showMenu && (
        <PageMenu
          pages={PAGES}
          currentPage={currentPage}
          cursorPos={cursor}
          twoFingerHeld={twoFingerHeld}
          openPalmHeld={openPalmInMenu}
          menuReady={menuReady}
          onSelect={navigateTo}
          onClose={() => setShowMenu(false)}
        />
      )}

      <GestureCursor
        x={cursor.x}
        y={cursor.y}
        progress={hudProgress}
        active={hudActive}
        twoFinger={twoFingerHeld || openPalmInMenu}
      />

      {!showMenu && (
        <NavDots total={PAGES.length} current={currentPage} onNavigate={navigateTo} />
      )}

      {/* Gesture HUD */}
      {hudText && (
        <div className={`app-hud ${hudActive ? "app-hud--active" : ""}`} style={{
          borderColor: hudActive ? "rgba(99,102,241,0.45)" : "rgba(255,255,255,0.08)",
        }}>
          {hudText}
          {hudProgress > 0 && (
            <div style={{ width: 48, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${hudProgress * 100}%`,
                background: "linear-gradient(90deg,#6366f1,#a855f7)",
                borderRadius: 2, transition: "width 0.1s linear",
              }} />
            </div>
          )}
          <span style={{
            width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
            background: hudActive ? "#10b981" : "rgba(255,255,255,0.15)",
            boxShadow: hudActive ? "0 0 8px #10b981" : "none",
            transition: "all 0.3s",
          }} />
        </div>
      )}

      {gestureLabel && <div className="gesture-toast">{gestureLabel}</div>}

      {!showMenu && (
        <button
          type="button"
          onClick={() => setShowMenu(true)}
          className={`app-menu-btn ${cameraActive ? "app-menu-btn--with-cam" : ""}`}
        >
          ☰ Pages
        </button>
      )}

      <video
        ref={videoRef}
        className="cam-feed"
        style={{
          opacity: cameraActive ? 1 : 0,
          zIndex: showMenu ? 10002 : 9998,
          boxShadow: showMenu
            ? "0 0 0 2px rgba(99,102,241,0.8), 0 8px 32px rgba(0,0,0,0.6)"
            : "0 8px 32px rgba(0,0,0,0.5)",
        }}
        muted playsInline
      />

      {showMenu && cameraActive && (
        <div className="app-live-badge">
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981", display: "inline-block" }} />
          Live · You
        </div>
      )}
    </div>
  );
};

export default App;
