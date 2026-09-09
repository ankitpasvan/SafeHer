import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import { EyeIcon, EyeOffIcon } from "../common/Icons";
import { forgotPasswordApi, resetPasswordApi } from "../../services/authApi";
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

  // Forgot password modal states
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotId, setForgotId] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [forgotNewPw, setForgotNewPw] = useState("");
  const [forgotConfirmPw, setForgotConfirmPw] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotInfo, setForgotInfo] = useState("");
  const [successBanner, setSuccessBanner] = useState("");

  const handleOpenForgot = (e) => {
    e.preventDefault();
    setForgotId(identifier.trim());
    setForgotStep(1);
    setForgotError("");
    setForgotInfo("");
    setForgotOtp("");
    setForgotNewPw("");
    setForgotConfirmPw("");
    setShowForgotModal(true);
  };

  const handleSendResetCode = async (e) => {
    e?.preventDefault();
    if (!forgotId.trim()) {
      setForgotError("Please enter your registered email or phone number.");
      return;
    }
    setForgotLoading(true);
    setForgotError("");
    setForgotInfo("");
    try {
      const res = await forgotPasswordApi({ identifier: forgotId.trim() });
      setForgotStep(2);
      setForgotInfo(res.message || "Verification code sent! Please check your inbox.");
      if (res.otp) {
        setForgotOtp(res.otp);
      }
    } catch (err) {
      setForgotError(err.message || "Could not find account. Please verify your details.");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e?.preventDefault();
    if (forgotNewPw.length < 6) {
      setForgotError("New password must be at least 6 characters.");
      return;
    }
    if (forgotNewPw !== forgotConfirmPw) {
      setForgotError("Passwords do not match.");
      return;
    }

    setForgotLoading(true);
    setForgotError("");
    try {
      const res = await resetPasswordApi({
        identifier: forgotId.trim(),
        otp: forgotOtp.trim(),
        newPassword: forgotNewPw,
      });
      setShowForgotModal(false);
      setIdentifier(forgotId.trim());
      setPassword(forgotNewPw);
      setSuccessBanner(res.message || "Password updated successfully! Click 'Login Securely' to continue.");
    } catch (err) {
      setForgotError(err.message || "Password reset failed. Please check your verification code.");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {successBanner && (
        <div style={{ background: "rgba(16, 185, 129, 0.15)", border: "1px solid #10B981", color: "#6EE7B7", padding: "12px 16px", borderRadius: "12px", marginBottom: "16px", fontSize: "13.5px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span>✅</span>
          <div>{successBanner}</div>
        </div>
      )}

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
        <a href="#forgot" onClick={handleOpenForgot} className="auth-forgot-link">
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

      {/* Forgot Password Modal Overlay */}
      {showForgotModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10, 6, 26, 0.85)",
            backdropFilter: "blur(8px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setShowForgotModal(false)}
        >
          <div
            style={{
              background: "#140E2F",
              border: "1px solid rgba(168, 85, 247, 0.35)",
              borderRadius: "20px",
              padding: "26px",
              maxWidth: "420px",
              width: "100%",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.65)",
              color: "#FFFFFF",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "19px", fontWeight: "800", margin: 0, color: "#FFFFFF" }}>
                🔑 Reset Password
              </h3>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "none",
                  color: "#FFFFFF",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                ✕
              </button>
            </div>

            {forgotError && (
              <div style={{ background: "rgba(239, 68, 68, 0.15)", border: "1px solid #EF4444", color: "#FCA5A5", padding: "10px 14px", borderRadius: "10px", fontSize: "13px", marginBottom: "14px" }}>
                {forgotError}
              </div>
            )}

            {forgotInfo && (
              <div style={{ background: "rgba(16, 185, 129, 0.15)", border: "1px solid #10B981", color: "#6EE7B7", padding: "10px 14px", borderRadius: "10px", fontSize: "13px", marginBottom: "14px" }}>
                {forgotInfo}
              </div>
            )}

            {forgotStep === 1 ? (
              <div>
                <p style={{ fontSize: "13.5px", color: "#B8B3CE", marginTop: 0, marginBottom: "16px", lineHeight: "1.4" }}>
                  Enter your registered Email or Phone number to receive a 6-digit verification code.
                </p>

                <div style={{ marginBottom: "16px" }}>
                  <input
                    type="text"
                    required
                    value={forgotId}
                    onChange={(e) => setForgotId(e.target.value)}
                    placeholder="Registered Email or Phone"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      background: "#1B1238",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "10px",
                      color: "#FFFFFF",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSendResetCode}
                  disabled={forgotLoading}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)",
                    border: "none",
                    borderRadius: "10px",
                    color: "#FFFFFF",
                    fontWeight: "700",
                    fontSize: "14px",
                    cursor: forgotLoading ? "not-allowed" : "pointer",
                  }}
                >
                  {forgotLoading ? "Sending Code..." : "Send Verification Code"}
                </button>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: "13px", color: "#B8B3CE", marginTop: 0, marginBottom: "14px" }}>
                  Enter the 6-digit code sent to your email and your new password.
                </p>

                <div style={{ marginBottom: "12px" }}>
                  <label style={{ fontSize: "12px", color: "#8C86A5", display: "block", marginBottom: "4px" }}>Verification Code (6 digits)</label>
                  <input
                    type="text"
                    required
                    value={forgotOtp}
                    onChange={(e) => setForgotOtp(e.target.value)}
                    placeholder="Enter 6-digit code"
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      background: "#1B1238",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "10px",
                      color: "#FFFFFF",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <label style={{ fontSize: "12px", color: "#8C86A5", display: "block", marginBottom: "4px" }}>New Password</label>
                  <input
                    type="password"
                    required
                    value={forgotNewPw}
                    onChange={(e) => setForgotNewPw(e.target.value)}
                    placeholder="Minimum 6 characters"
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      background: "#1B1238",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "10px",
                      color: "#FFFFFF",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "18px" }}>
                  <label style={{ fontSize: "12px", color: "#8C86A5", display: "block", marginBottom: "4px" }}>Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={forgotConfirmPw}
                    onChange={(e) => setForgotConfirmPw(e.target.value)}
                    placeholder="Re-enter new password"
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      background: "#1B1238",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "10px",
                      color: "#FFFFFF",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setForgotStep(1)}
                    style={{
                      flex: "1",
                      padding: "11px",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "10px",
                      color: "#FFFFFF",
                      fontWeight: "600",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    disabled={forgotLoading}
                    style={{
                      flex: "2",
                      padding: "11px",
                      background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                      border: "none",
                      borderRadius: "10px",
                      color: "#FFFFFF",
                      fontWeight: "700",
                      fontSize: "13px",
                      cursor: forgotLoading ? "not-allowed" : "pointer",
                    }}
                  >
                    {forgotLoading ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </form>
  );
}
