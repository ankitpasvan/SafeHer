import { useState, useEffect } from "react";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import BottomNav from "../common/BottomNav";
import { getContacts, addContact } from "../../services/contactApi";
import {
  ContactPhoneIcon,
  ContactMessageIcon,
  QuickCallPhoneIcon,
} from "./ContactsIcons";
import "../../styles/contacts.css";

// Default contacts matching the design
const DEFAULT_CONTACTS = [
  {
    _id: "default-1",
    name: "Mom",
    phone: "+91 98765 43210",
    avatar: "/avatar-mom.jpg",
    relationship: "Family",
  },
  {
    _id: "default-2",
    name: "Bestie",
    phone: "+91 87654 32109",
    avatar: "/user-avatar.jpg",
    relationship: "Best Friend",
  },
  {
    _id: "default-3",
    name: "Brother",
    phone: "+91 76543 21098",
    avatar: "/avatar-brother.jpg",
    relationship: "Family",
  },
];

export default function ContactsOverview() {
  const [contacts, setContacts] = useState(DEFAULT_CONTACTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [quickCallAlert, setQuickCallAlert] = useState("");
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relationship: "Family",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getContacts()
      .then((serverContacts) => {
        if (serverContacts && serverContacts.length > 0) {
          // Merge server contacts with design defaults
          const merged = [...DEFAULT_CONTACTS];
          serverContacts.forEach((sc) => {
            if (!merged.some((c) => c.phone === sc.phone)) {
              merged.push({
                _id: sc._id,
                name: sc.name,
                phone: sc.phone,
                relationship: sc.relationship || "Guardian",
                avatar: "/avatar-brother.jpg",
              });
            }
          });
          setContacts(merged);
        }
      })
      .catch(() => {});
  }, []);

  const handleAddContact = async (e) => {
    e.preventDefault();
    if (!newContact.name.trim() || !newContact.phone.trim()) return;

    setSubmitting(true);
    try {
      const added = await addContact({
        name: newContact.name.trim(),
        phone: newContact.phone.trim(),
        relationship: newContact.relationship,
      });

      setContacts((prev) => [
        ...prev,
        {
          _id: added?._id || `local-${Date.now()}`,
          name: newContact.name.trim(),
          phone: newContact.phone.trim(),
          relationship: newContact.relationship,
          avatar: "/user-avatar.jpg",
        },
      ]);
      setShowAddModal(false);
      setNewContact({ name: "", phone: "", relationship: "Family" });
    } catch {
      // Offline/Local fallback
      setContacts((prev) => [
        ...prev,
        {
          _id: `local-${Date.now()}`,
          name: newContact.name.trim(),
          phone: newContact.phone.trim(),
          relationship: newContact.relationship,
          avatar: "/user-avatar.jpg",
        },
      ]);
      setShowAddModal(false);
      setNewContact({ name: "", phone: "", relationship: "Family" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickCall = () => {
    const primary = contacts[0] || DEFAULT_CONTACTS[0];
    setQuickCallAlert(`Calling ${primary.name} (${primary.phone})...`);
    window.location.href = `tel:${primary.phone.replace(/\s+/g, "")}`;
    setTimeout(() => setQuickCallAlert(""), 4000);
  };

  return (
    <div className="contacts-shell">
      {/* Left Navigation Rail */}
      <DashboardSidebar
        onOpenGuide={() => {}}
        onOpenHelpline={() => {
          window.location.href = "tel:112";
        }}
        onOpenSettings={() => {}}
      />

      {/* Main Content Area */}
      <main className="contacts-main">
        {/* Header */}
        <div className="contacts-header-row">
          <div className="contacts-header-left">
            <div className="contacts-slide-tag">Slide 5</div>
            <h1 className="contacts-title">Emergency Contacts</h1>
            <p className="contacts-subtitle">Your trusted circle.</p>
          </div>

          <button
            type="button"
            className="contacts-view-all"
            onClick={() => alert(`Total Contacts: ${contacts.length} trusted guardians enrolled.`)}
          >
            View all
          </button>
        </div>

        {/* Quick Call Feedback Toast */}
        {quickCallAlert && (
          <div
            style={{
              background: "rgba(124, 58, 237, 0.25)",
              border: "1px solid #7C3AED",
              color: "#DDD6FE",
              borderRadius: "14px",
              padding: "12px 18px",
              marginBottom: "20px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            {quickCallAlert}
          </div>
        )}

        {/* Main 2-Column Grid */}
        <div className="contacts-grid">
          {/* Left Column: Contacts List */}
          <section className="contacts-list-column" aria-label="Trusted Contacts List">
            {contacts.map((contact) => (
              <div key={contact._id} className="contact-card-item">
                <div className="contact-profile-info">
                  <div className="contact-avatar-wrapper">
                    <img
                      src={contact.avatar || "/avatar-mom.jpg"}
                      alt={contact.name}
                      className="contact-avatar-img"
                    />
                  </div>
                  <div className="contact-details">
                    <h3 className="contact-name">{contact.name}</h3>
                    <p className="contact-phone">{contact.phone}</p>
                  </div>
                </div>

                <div className="contact-actions">
                  {/* Call Button */}
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                    className="contact-action-btn"
                    title={`Call ${contact.name}`}
                    aria-label={`Call ${contact.name}`}
                  >
                    <ContactPhoneIcon width={18} height={18} />
                  </a>

                  {/* Message Button */}
                  <a
                    href={`sms:${contact.phone.replace(/\s+/g, "")}`}
                    className="contact-action-btn"
                    title={`Message ${contact.name}`}
                    aria-label={`Message ${contact.name}`}
                  >
                    <ContactMessageIcon width={18} height={18} />
                  </a>
                </div>
              </div>
            ))}

            {/* "+ Add Contact" Button */}
            <button
              type="button"
              className="btn-add-contact"
              onClick={() => setShowAddModal(true)}
            >
              <span style={{ fontSize: "18px", lineHeight: "1" }}>+</span>
              <span>Add Contact</span>
            </button>
          </section>

          {/* Right Column: Quick Call Card */}
          <section className="quick-call-card" aria-label="Quick Call Speed Dial">
            <div>
              <h2 className="quick-call-title">Quick Call</h2>
              <p className="quick-call-desc">Call your emergency contacts instantly.</p>
            </div>

            {/* Big Glowing Purple Call Button */}
            <button
              type="button"
              className="quick-call-btn-circle"
              onClick={handleQuickCall}
              title="One-Touch Emergency Speed Dial"
              aria-label="Quick Emergency Call"
            >
              <QuickCallPhoneIcon width={36} height={36} />
            </button>

            {/* Community Silhouette Background */}
            <svg
              className="quick-call-silhouettes"
              viewBox="0 0 300 80"
              preserveAspectRatio="none"
            >
              <path
                d="M30 80 C40 50, 70 50, 80 80 M110 80 C120 40, 160 40, 170 80 M200 80 C210 45, 240 45, 250 80"
                stroke="#C084FC"
                strokeWidth="28"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="55" cy="35" r="14" fill="#C084FC" />
              <circle cx="140" cy="24" r="16" fill="#C084FC" />
              <circle cx="225" cy="30" r="14" fill="#C084FC" />
            </svg>
          </section>
        </div>
      </main>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="contact-modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="contact-modal-header">
              <h3 className="contact-modal-title">Add Emergency Contact</h3>
              <button
                type="button"
                className="contact-modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddContact}>
              <div className="contact-form-group">
                <label className="contact-form-label">Full Name</label>
                <input
                  type="text"
                  required
                  className="contact-form-input"
                  placeholder="e.g. Dad, Sister, Neighbor"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                />
              </div>

              <div className="contact-form-group">
                <label className="contact-form-label">Phone Number</label>
                <input
                  type="tel"
                  required
                  className="contact-form-input"
                  placeholder="e.g. +91 98765 43210"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                />
              </div>

              <div className="contact-form-group">
                <label className="contact-form-label">Relationship</label>
                <select
                  className="contact-form-input"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                >
                  <option value="Family">Family</option>
                  <option value="Best Friend">Best Friend</option>
                  <option value="Brother">Brother</option>
                  <option value="Partner">Partner</option>
                  <option value="Guardian">Guardian</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn-contact-submit"
                disabled={submitting}
              >
                {submitting ? "Adding..." : "Save Contact"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <div className="dashboard-mobile-nav">
        <BottomNav />
      </div>
    </div>
  );
}
