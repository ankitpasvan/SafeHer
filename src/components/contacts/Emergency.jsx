import { Link } from "react-router-dom";
import { PlusIcon } from "../common/Icons";

// Horizontal quick-glance row of trusted contacts, used on Home/Safety screens.
export default function Emergency({ contacts = [], loading }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 className="section-title" style={{ margin: "0 0 12px" }}>Emergency Contacts</h3>
        <Link to="/profile" className="btn--link" style={{ fontSize: 12.5 }}>Manage</Link>
      </div>

      <div className="avatar-row">
        {loading && <span style={{ fontSize: 12.5, color: "var(--text-tertiary)" }}>Loading...</span>}

        {!loading && contacts.length === 0 && (
          <Link to="/profile" className="avatar-item">
            <div
              className="avatar-fallback"
              style={{ background: "var(--surface)", border: "1px dashed var(--surface-border-strong)" }}
            >
              <PlusIcon width={18} height={18} />
            </div>
            <span>Add</span>
          </Link>
        )}

        {contacts.slice(0, 6).map((c) => (
          <div className="avatar-item" key={c._id} title={c.phone}>
            <div className="avatar-fallback">{c.name?.[0]?.toUpperCase() || "?"}</div>
            <span>{c.name?.split(" ")[0]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
