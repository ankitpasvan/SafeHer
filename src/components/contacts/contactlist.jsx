import { EditIcon, PhoneIcon, TrashIcon, UsersIcon } from "../common/Icons";

export default function ContactList({ contacts, onEdit, onDelete, deletingId }) {
  if (!contacts || contacts.length === 0) {
    return (
      <div className="empty-state">
        <UsersIcon />
        <p>No trusted contacts yet. Add someone you trust to keep you safe.</p>
      </div>
    );
  }

  return (
    <div>
      {contacts.map((c) => (
        <div className="contact-row" key={c._id}>
          <div className="avatar-fallback" style={{ width: 44, height: 44, fontSize: 15 }}>
            {c.name?.[0]?.toUpperCase() || "?"}
          </div>
          <div className="contact-row__info">
            <h4>
              {c.name} {c.isPrimary && <span className="badge badge--info" style={{ marginLeft: 6 }}>Primary</span>}
            </h4>
            <p>{c.relation || "Contact"} &middot; {c.phone}</p>
          </div>
          <div className="contact-row__actions">
            <a className="icon-btn" href={`tel:${c.phone}`} aria-label={`Call ${c.name}`}>
              <PhoneIcon width={15} height={15} />
            </a>
            <button className="icon-btn" onClick={() => onEdit(c)} aria-label={`Edit ${c.name}`}>
              <EditIcon width={15} height={15} />
            </button>
            <button
              className="icon-btn"
              onClick={() => onDelete(c._id)}
              disabled={deletingId === c._id}
              aria-label={`Delete ${c.name}`}
              style={{ color: "var(--danger)" }}
            >
              <TrashIcon width={15} height={15} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
