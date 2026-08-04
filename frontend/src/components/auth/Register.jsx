import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import { EyeIcon, EyeOffIcon } from "../common/Icons";

export default function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
      });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert-banner alert-banner--error">{error}</div>}

      <div className="field">
        <label>Full name</label>
        <input required value={form.name} onChange={update("name")} placeholder="Sarah Johnson" autoComplete="name" />
      </div>

      <div className="field">
        <label>Email</label>
        <input type="email" required value={form.email} onChange={update("email")} placeholder="you@email.com" autoComplete="email" />
      </div>

      <div className="field">
        <label>Phone number</label>
        <input required value={form.phone} onChange={update("phone")} placeholder="+1 555 123 4567" autoComplete="tel" />
      </div>

      <div className="field">
        <label>Password</label>
        <div style={{ position: "relative" }}>
          <input
            type={showPw ? "text" : "password"}
            required
            value={form.password}
            onChange={update("password")}
            placeholder="At least 6 characters"
            autoComplete="new-password"
            style={{ paddingRight: 42 }}
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            aria-label={showPw ? "Hide password" : "Show password"}
            style={{
              position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer", padding: 6,
            }}
          >
            {showPw ? <EyeOffIcon width={16} height={16} /> : <EyeIcon width={16} height={16} />}
          </button>
        </div>
      </div>

      <div className="field">
        <label>Confirm password</label>
        <input
          type={showPw ? "text" : "password"}
          required
          value={form.confirm}
          onChange={update("confirm")}
          placeholder="Re-enter your password"
          autoComplete="new-password"
        />
      </div>

      <button type="submit" className="btn btn--primary btn--full" disabled={submitting}>
        {submitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
