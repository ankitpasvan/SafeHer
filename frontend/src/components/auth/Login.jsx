import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import { EyeIcon, EyeOffIcon } from "../common/Icons";
import {
  MailIcon,
  LockIcon,
  ShieldCheckIcon,
  GoogleLogo,
  AppleLogo,
  PhoneCallIcon,
} from "./AuthIcons";

export default function LoginForm({ onSwitchToRegister }) {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim()) {
      setError("Please enter your email or phone number.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setSubmitting(true);
    try {
      await login(identifier.trim(), password);
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err?.message || "Invalid credentials. Please verify and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSocialAuth = async (provider) => {
    setError("");
    setSubmitting(true);
    try {
      await loginWithGoogle();
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err?.message || `Failed to sign in with ${provider}. Please try again.`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const emailPrompt = prompt("Enter your registered email address to receive password reset instructions:", identifier);
    if (emailPrompt) {
      alert(`Password reset instructions have been sent to ${emailPrompt}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="auth-error-banner" role="alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className="auth-fields-stack">
        {/* Email or Phone Number Input */}
        <div className="auth-input-container">
          <div className="auth-input-icon-left">
            <MailIcon width={19} height={19} />
          </div>
          <input
            type="text"
            className="auth-input"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Email or Phone Number"
            autoComplete="username"
            aria-label="Email or Phone Number"
          />
        </div>

        {/* Password Input */}
        <div className="auth-input-container">
          <div className="auth-input-icon-left">
            <LockIcon width={19} height={19} />
          </div>
          <input
            type={showPw ? "text" : "password"}
            className="auth-input"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
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
      </div>

      {/* Forgot Password Link */}
      <div className="auth-forgot-row">
        <a href="#forgot" onClick={handleForgotPassword} className="auth-forgot-link">
          Forgot Password?
        </a>
      </div>

      {/* Submit CTA */}
      <button type="submit" className="auth-btn-primary" disabled={submitting}>
        {submitting ? (
          <span className="auth-spinner" />
        ) : (
          <>
            <ShieldCheckIcon width={19} height={19} color="#FFFFFF" />
            <span>Login Securely</span>
          </>
        )}
      </button>

      {/* Alternative Login Divider */}
      <div className="auth-divider">
        <span>or continue with</span>
      </div>

      {/* Social Logins */}
      <div className="auth-social-grid">
        <button
          type="button"
          className="auth-social-btn"
          onClick={() => handleSocialAuth("Google")}
          aria-label="Sign in with Google"
        >
          <GoogleLogo width={18} height={18} />
          <span>Google</span>
        </button>

        <button
          type="button"
          className="auth-social-btn"
          onClick={() => handleSocialAuth("Apple")}
          aria-label="Sign in with Apple"
        >
          <AppleLogo width={17} height={17} />
          <span>Apple</span>
        </button>

        <button
          type="button"
          className="auth-social-btn"
          onClick={() => handleSocialAuth("Phone Number")}
          aria-label="Sign in with Phone Number"
        >
          <PhoneCallIcon width={17} height={17} />
          <span>Phone Number</span>
        </button>
      </div>
    </form>
  );
}
