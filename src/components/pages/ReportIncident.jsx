import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";
import { useGeolocation } from "../../hook/useGeolocation";
import { reportIncident } from "../../services/incidentApi";
import { ChevronLeftIcon } from "../common/Icons";

const CATEGORIES = [
  { value: "harassment", label: "Harassment" },
  { value: "poor_lighting", label: "Poor lighting" },
  { value: "isolated_area", label: "Isolated area" },
  { value: "stalking", label: "Stalking" },
  { value: "other", label: "Other" },
];

const SEVERITIES = ["low", "medium", "high"];

export default function ReportIncident() {
  const navigate = useNavigate();
  const { position, getCurrentPosition } = useGeolocation();
  const [form, setForm] = useState({ description: "", category: "other", severity: "medium", address: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getCurrentPosition().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.description.trim()) {
      setError("Please describe what happened.");
      return;
    }
    if (!position) {
      setError("We need your location to file this report. Please allow location access.");
      return;
    }

    setSubmitting(true);
    try {
      await reportIncident({
        lat: position.lat,
        lng: position.lng,
        address: form.address || undefined,
        description: form.description.trim(),
        category: form.category,
        severity: form.severity,
      });
      setSuccess(true);
      setTimeout(() => navigate("/alerts"), 1400);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="topbar" style={{ paddingLeft: 0 }}>
        <button className="icon-btn" onClick={() => navigate(-1)} aria-label="Back">
          <ChevronLeftIcon width={18} height={18} />
        </button>
        <div className="topbar__greeting">
          <h1>Report an incident</h1>
          <p>Help keep others safe</p>
        </div>
      </div>

      {success && <div className="alert-banner alert-banner--success">Thank you -- your report has been filed.</div>}
      {error && <div className="alert-banner alert-banner--error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>What happened?</label>
          <textarea
            rows={4}
            value={form.description}
            onChange={update("description")}
            placeholder="Describe the incident in a few sentences..."
          />
        </div>

        <div className="field">
          <label>Category</label>
          <select value={form.category} onChange={update("category")}>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Severity</label>
          <select value={form.severity} onChange={update("severity")}>
            {SEVERITIES.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Address / landmark (optional)</label>
          <input value={form.address} onChange={update("address")} placeholder="e.g. 5th Ave & Main St" />
        </div>

        <p className="field-hint" style={{ marginBottom: 16 }}>
          {position
            ? `Using your current location: ${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}`
            : "Getting your current location..."}
        </p>

        <button type="submit" className="btn btn--primary btn--full" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit report"}
        </button>
      </form>
    </div>
  );
}
