import { PhoneIcon } from "./Icons";

// Top bar shown on the main app screens: avatar, greeting/title, optional action button.
export default function Navbar({ title, subtitle, eyebrow, avatarLetter = "?", onAction, actionIcon }) {
  return (
    <div className="topbar">
      <div className="topbar__profile">
        <div
          className="topbar__avatar"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, var(--navy-mid), var(--violet))",
            fontWeight: 700,
            color: "#fff",
          }}
        >
          {avatarLetter}
        </div>
        <div className="topbar__greeting">
          {eyebrow && <p className="topbar__eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
      {onAction && (
        <button className="icon-btn icon-btn--danger" onClick={onAction} aria-label="Quick call">
          {actionIcon || <PhoneIcon width={18} height={18} />}
        </button>
      )}
    </div>
  );
}
