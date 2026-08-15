import { Link } from "react-router-dom";
import RegisterForm from "../auth/Register";
import { ShieldIcon } from "../common/Icons";

export default function Register() {
  return (
    <div className="auth-page page-fade">
      <div className="auth-card">
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <div
            style={{
              width: 60, height: 60, borderRadius: "50%", margin: "0 auto 14px",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg, var(--teal), var(--info))",
              boxShadow: "var(--shadow-teal)",
            }}
          >
            <ShieldIcon width={28} height={28} color="#fff" />
          </div>
          <h1 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800 }}>Create your account</h1>
          <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: 13.5 }}>
            Join SafeHer &mdash; safety, always on
          </p>
        </div>

        <div className="card">
          <RegisterForm />
        </div>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13.5, color: "var(--text-secondary)" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--teal)", fontWeight: 700 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
