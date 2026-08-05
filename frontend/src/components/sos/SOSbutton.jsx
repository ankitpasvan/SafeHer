import { useCallback, useRef, useState } from "react";

const HOLD_MS = 1400;

// Big circular press-and-hold SOS trigger with an animated progress ring.
// Calling onTrigger fires only after the user holds for HOLD_MS (prevents
// accidental taps from sending a real emergency alert).
export default function SOSButton({ onTrigger, disabled, submitting }) {
  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(0);

  const stop = useCallback(() => {
    setHolding(false);
    setProgress(0);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const tick = useCallback(() => {
    const elapsed = Date.now() - startRef.current;
    const pct = Math.min(100, (elapsed / HOLD_MS) * 100);
    setProgress(pct);
    if (pct >= 100) {
      setHolding(false);
      onTrigger?.();
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [onTrigger]);

  const start = useCallback(() => {
    if (disabled || submitting) return;
    setHolding(true);
    startRef.current = Date.now();
    rafRef.current = requestAnimationFrame(tick);
  }, [disabled, submitting, tick]);

  const ringStyle = {
    background: `conic-gradient(#fff ${progress * 3.6}deg, rgba(255,255,255,0.15) ${progress * 3.6}deg)`,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        userSelect: "none",
      }}
    >
      <div
        role="button"
        aria-label="Hold to send SOS alert"
        onPointerDown={start}
        onPointerUp={stop}
        onPointerLeave={stop}
        onPointerCancel={stop}
        style={{
          width: 190,
          height: 190,
          borderRadius: "50%",
          padding: 6,
          ...ringStyle,
          transition: holding ? "none" : "background 0.25s ease",
          cursor: disabled ? "not-allowed" : "pointer",
          touchAction: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            background:
              "radial-gradient(circle at 35% 30%, #f3607f, var(--danger-strong) 70%)",
            boxShadow: holding
              ? "0 0 0 14px rgba(239,68,98,0.18), var(--shadow-danger)"
              : "var(--shadow-danger)",
            transform: holding ? "scale(0.97)" : "scale(1)",
            transition: "transform 0.15s ease, box-shadow 0.2s ease",
            opacity: disabled ? 0.6 : 1,
          }}
        >
          <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: 1 }}>
            {submitting ? "..." : "SOS"}
          </span>
          <span style={{ fontSize: 11.5, opacity: 0.85, fontWeight: 600 }}>
            {submitting ? "Sending alert" : holding ? "Keep holding..." : "Hold 1.5 sec"}
          </span>
        </div>
      </div>
    </div>
  );
}
