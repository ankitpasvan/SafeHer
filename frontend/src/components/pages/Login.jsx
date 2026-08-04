import { Link } from "react-router-dom";
import LoginForm from "../auth/Login";
import { ShieldIcon } from "../common/Icons";

export default function Login() {
  return (
    <div className="auth-page page-fade">
      <div className="auth-card">
        <div style={{ textAlign: "center", marginBottom: 30 }}>
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
          <h1 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800 }}>Welcome back</h1>
          <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: 13.5 }}>
            Sign in to SafeHer to continue
          </p>
        </div>

        <div className="card">
          <LoginForm />
        </div>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13.5, color: "var(--text-secondary)" }}>
          Don&apos;t have an account?{" "}
          <Link to="/register" style={{ color: "var(--teal)", fontWeight: 700 }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
