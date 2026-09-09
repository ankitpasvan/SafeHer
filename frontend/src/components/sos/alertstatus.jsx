import { AlertTriangleIcon, CheckIcon, ClockIcon, MapPinIcon } from "../common/Icons";

// Full-screen overlay shown right after an SOS alert is triggered, mirroring
// the "Calling emergency..." reference screen -- reassures the user their
// contacts + location have gone out while the request completes.
export function SOSCallingOverlay({ contacts = [] }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background:
          "radial-gradient(circle at 50% 40%, rgba(239,68,98,0.35), var(--bg-deep) 70%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        textAlign: "center",
      }}
    >
      <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 800 }}>
        Sending your alert...
      </h2>
      <p style={{ color: "rgba(247,244,239,0.72)", fontSize: 13.5, maxWidth: 280, margin: "0 0 30px" }}>
        Your live location is being shared with your emergency contacts now.
      </p>

      <div style={{ position: "relative", width: 170, height: 170 }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "2px solid rgba(239,68,98,0.35)",
              animation: `sosPulse 1.8s ease-out ${i * 0.5}s infinite`,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            inset: 40,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 30%, #f3607f, var(--danger-strong) 70%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 24,
            boxShadow: "var(--shadow-danger)",
          }}
        >
          SOS
        </div>
      </div>

      {contacts.length > 0 && (
        <div style={{ marginTop: 34, display: "flex", gap: 16 }}>
          {contacts.slice(0, 4).map((c) => (
            <div key={c._id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div className="avatar-fallback" style={{ width: 44, height: 44, fontSize: 14 }}>
                {c.name?.[0]?.toUpperCase() || "?"}
              </div>
              <span style={{ fontSize: 11, color: "rgba(247,244,239,0.7)" }}>
                {c.name?.split(" ")[0]}
              </span>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes sosPulse {
          0% { transform: scale(0.7); opacity: 0.9; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Persistent card shown once an SOS alert is active, with a resolve action.
export function ActiveAlertCard({ alert, onResolve, resolving }) {
  if (!alert) return null;

  const isActive = alert.status === "active";

  return (
    <div
      className="card"
      style={{
        borderColor: isActive ? "rgba(239,68,98,0.4)" : "var(--surface-border)",
        marginBottom: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span
          className={`badge ${isActive ? "badge--danger" : "badge--success"} badge--dot`}
        >
          {isActive ? "SOS Active" : alert.status === "resolved" ? "Resolved" : "Cancelled"}
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, color: "var(--text-tertiary)", fontSize: 12 }}>
          <ClockIcon width={13} height={13} />
          {new Date(alert.triggeredAt || alert.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>

      {alert.location?.address && (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10, fontSize: 13, color: "var(--text-secondary)" }}>
          <MapPinIcon width={15} height={15} style={{ flexShrink: 0, marginTop: 2 }} />
          {alert.location.address}
        </div>
      )}

      <p style={{ margin: "0 0 12px", fontSize: 12.5, color: "var(--text-tertiary)" }}>
        {alert.contactsNotified?.length || 0} trusted contact(s) notified
      </p>

      {isActive && (
        <button
          className="btn btn--full btn--ghost"
          onClick={() => onResolve(alert._id)}
          disabled={resolving}
        >
          <CheckIcon width={16} height={16} />
          {resolving ? "Resolving..." : "Mark as resolved / I'm safe"}
        </button>
      )}
    </div>
  );
}

export function EmptyAlertState() {
  return (
    <div className="empty-state">
      <AlertTriangleIcon />
      <p>No SOS alerts yet. Stay safe out there.</p>
    </div>
  );
}
