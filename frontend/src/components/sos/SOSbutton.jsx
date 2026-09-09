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

  const label = submitting ? "Alert going out" : holding ? "Keep holding" : "I need help";
  const kicker = submitting ? "SENDING" : holding ? "HOLDING" : "HOLD";

  return (
    <div
      className={`sos-orb ${holding ? "is-holding" : ""} ${disabled || submitting ? "is-disabled" : ""}`}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="Hold to send SOS alert"
      aria-disabled={disabled || submitting}
      onPointerDown={start}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          start();
        }
      }}
      onKeyUp={stop}
      style={{ "--p": progress }}
    >
      <span className="sos-orb__glow" aria-hidden="true" />
      <span className="sos-orb__pulse" aria-hidden="true" />
      <div className="sos-orb__ring" aria-hidden="true" />
      <div className="sos-orb__core">
        <span className="sos-orb__kicker">{kicker}</span>
        <span className="sos-orb__label">{label}</span>
      </div>
    </div>
  );
}
