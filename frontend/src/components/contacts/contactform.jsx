import { useState } from "react";

const RELATIONS = ["Mother", "Father", "Sister", "Brother", "Friend", "Partner", "Colleague", "Other"];

export default function ContactForm({ initial, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    phone: initial?.phone || "",
    email: initial?.email || "",
    relation: initial?.relation || "Friend",
    isPrimary: initial?.isPrimary || false,
  });
  const [error, setError] = useState("");

  const update = (field) => (e) => {
    const value = field === "isPrimary" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Name and phone number are required.");
      return;
    }
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert-banner alert-banner--error">{error}</div>}

      <div className="field">
        <label>Full name</label>
        <input value={form.name} onChange={update("name")} placeholder="Sarah Wilson" />
      </div>

      <div className="field">
        <label>Phone number</label>
        <input value={form.phone} onChange={update("phone")} placeholder="+1 555 123 4567" />
      </div>

      <div className="field">
        <label>Email (optional)</label>
        <input type="email" value={form.email} onChange={update("email")} placeholder="sarah@email.com" />
      </div>

      <div className="field">
        <label>Relationship</label>
        <select value={form.relation} onChange={update("relation")}>
          {RELATIONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <label className="checkbox-row" style={{ marginBottom: 18 }}>
        <input type="checkbox" checked={form.isPrimary} onChange={update("isPrimary")} />
        Mark as primary emergency contact
      </label>

      <div style={{ display: "flex", gap: 10 }}>
        <button type="button" className="btn btn--ghost" style={{ flex: 1 }} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn--primary" style={{ flex: 1 }} disabled={submitting}>
          {submitting ? "Saving..." : initial ? "Save changes" : "Add contact"}
        </button>
      </div>
    </form>
  );
}
