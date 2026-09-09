import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import { EyeIcon, EyeOffIcon } from "../common/Icons";
import {
  MailIcon,
  LockIcon,
  ShieldCheckIcon,
  TabUserIcon,
  PhoneCallIcon,
  GoogleLogo,
  AppleLogo,
} from "./AuthIcons";

export default function RegisterForm({ onSwitchToLogin }) {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!form.email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!form.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }
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
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSocialAuth = async (provider) => {
    setError("");
    setSubmitting(true);
    try {
      await loginWithGoogle();
      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.message || `Failed to sign up with ${provider}. Please try again.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="auth-error-banner" role="alert">
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: "2px" }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>
              <div>{error}</div>
              {error.toLowerCase().includes("network") && (
                <div style={{ marginTop: "6px" }}>
                  <button
                    type="button"
                    onClick={() => handleSocialAuth("Instant Demo")}
                    style={{
                      background: "#7C3AED",
                      color: "#FFFFFF",
                      border: "none",
                      padding: "5px 12px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    🚀 Use 1-Click Instant Access
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="auth-fields-stack">
        {/* Full Name */}
        <div className="auth-input-container">
          <div className="auth-input-icon-left">
            <TabUserIcon width={18} height={18} />
          </div>
          <input
            type="text"
            className="auth-input"
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Full Name"
            autoComplete="name"
            aria-label="Full Name"
          />
        </div>

        {/* Email Address */}
        <div className="auth-input-container">
          <div className="auth-input-icon-left">
            <MailIcon width={18} height={18} />
          </div>
          <input
            type="email"
            className="auth-input"
            required
            value={form.email}
            onChange={update("email")}
            placeholder="Email Address"
            autoComplete="email"
            aria-label="Email Address"
          />
        </div>

        {/* Phone Number */}
        <div className="auth-input-container">
          <div className="auth-input-icon-left">
            <PhoneCallIcon width={18} height={18} />
          </div>
          <input
            type="tel"
            className="auth-input"
            required
            value={form.phone}
            onChange={update("phone")}
            placeholder="Phone Number (e.g. +1 555 0192)"
            autoComplete="tel"
            aria-label="Phone Number"
          />
        </div>

        {/* Password */}
        <div className="auth-input-container">
          <div className="auth-input-icon-left">
            <LockIcon width={18} height={18} />
          </div>
          <input
            type={showPw ? "text" : "password"}
            className="auth-input"
            required
            value={form.password}
            onChange={update("password")}
            placeholder="Password (min. 6 characters)"
            autoComplete="new-password"
            aria-label="Password"
          />
          <button
            type="button"
            className="auth-pw-toggle"
            onClick={() => setShowPw((v) => !v)}
            aria-label={showPw ? "Hide password" : "Show password"}
          >
            {showPw ? <EyeOffIcon width={18} height={18} /> : <EyeIcon width={18} height={18} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="auth-input-container">
          <div className="auth-input-icon-left">
            <LockIcon width={18} height={18} />
          </div>
          <input
            type={showPw ? "text" : "password"}
            className="auth-input"
            required
            value={form.confirm}
            onChange={update("confirm")}
            placeholder="Confirm Password"
            autoComplete="new-password"
            aria-label="Confirm Password"
          />
        </div>
      </div>

      {/* Submit CTA */}
      <button type="submit" className="auth-btn-primary" style={{ marginTop: 18 }} disabled={submitting}>
        {submitting ? (
          <span className="auth-spinner" />
        ) : (
          <>
            <ShieldCheckIcon width={19} height={19} color="#FFFFFF" />
            <span>Create Account Securely</span>
          </>
        )}
      </button>

      {/* Alternative Divider */}
      <div className="auth-divider">
        <span>or register with</span>
      </div>

      {/* Social Logins */}
      <div className="auth-social-grid">
        <button
          type="button"
          className="auth-social-btn"
          onClick={() => handleSocialAuth("Google")}
          aria-label="Sign up with Google"
        >
          <GoogleLogo width={18} height={18} />
          <span>Google</span>
        </button>

        <button
          type="button"
          className="auth-social-btn"
          onClick={() => handleSocialAuth("Apple")}
          aria-label="Sign up with Apple"
        >
          <AppleLogo width={17} height={17} />
          <span>Apple</span>
        </button>

        <button
          type="button"
          className="auth-social-btn"
          onClick={() => handleSocialAuth("Phone Number")}
          aria-label="Sign up with Phone"
        >
          <PhoneCallIcon width={17} height={17} />
          <span>Phone</span>
        </button>
      </div>
    </form>
  );
}
