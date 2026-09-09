import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardWidgets from "../admin/DashboardWidgets";
import BarChart from "../admin/charts";
import Loader from "../common/Loader";
import { useAuth } from "../../hook/useAuth";
import {
  getDashboardStats,
  getAllUsers,
  getAllSOSAlerts,
} from "../../services/adminApi";
import { getAllIncidents } from "../../services/incidentApi";
import { updateIncidentStatus } from "../../services/adminApi";
import { LogoutIcon, ShieldIcon } from "../common/Icons";

const TABS = ["Overview", "Users", "SOS Alerts", "Incidents"];

export default function AdminPanel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("Overview");
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [sosAlerts, setSOSAlerts] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    Promise.all([getDashboardStats(), getAllUsers(), getAllSOSAlerts(), getAllIncidents()])
      .then(([s, u, sa, inc]) => {
        setStats(s);
        setUsers(u);
        setSOSAlerts(sa);
        setIncidents(inc);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id);
    try {
      const updated = await updateIncidentStatus(id, status);
      setIncidents((list) => list.map((i) => (i._id === id ? updated : i)));
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <Loader full label="Loading admin dashboard..." />;

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="admin-header__logo">
            <ShieldIcon width={20} height={20} color="#fff" />
          </div>
          <div>
            <h1>SafeHer Admin</h1>
            <p>Signed in as {user?.name}</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn--ghost btn--sm" onClick={() => navigate("/")}>
            Back to app
          </button>
          <button className="btn btn--ghost btn--sm" onClick={logout}>
            <LogoutIcon width={14} height={14} /> Log out
          </button>
        </div>
      </header>

      <nav className="admin-tabs">
        {TABS.map((t) => (
          <button key={t} className={`admin-tab ${tab === t ? "is-active" : ""}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </nav>

      {tab === "Overview" && (
        <>
          <DashboardWidgets stats={stats} />
          <div className="card" style={{ marginTop: 20 }}>
            <h3 style={{ margin: "0 0 6px" }}>Platform snapshot</h3>
            <BarChart
              data={[
                { label: "Users", value: stats?.totalUsers || 0, color: "linear-gradient(180deg, var(--info), var(--info-dark))" },
                { label: "SOS total", value: stats?.totalSOSAlerts || 0 },
                { label: "SOS active", value: stats?.activeSOSAlerts || 0 },
                { label: "Incidents", value: stats?.totalIncidents || 0, color: "linear-gradient(180deg, var(--warning), #b9750f)" },
                { label: "Pending", value: stats?.pendingIncidents || 0, color: "linear-gradient(180deg, var(--warning), #b9750f)" },
              ]}
            />
          </div>
        </>
      )}

      {tab === "Users" && (
        <div className="card admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Active</th><th>Joined</th></tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td><span className={`badge ${u.role === "admin" ? "badge--info" : "badge--neutral"}`}>{u.role}</span></td>
                  <td>{u.isActive ? "Yes" : "No"}</td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "SOS Alerts" && (
        <div className="card admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>User</th><th>Location</th><th>Status</th><th>Triggered</th></tr>
            </thead>
            <tbody>
              {sosAlerts.map((a) => (
                <tr key={a._id}>
                  <td>{a.user?.name || "Unknown"}</td>
                  <td>{a.location?.address || `${a.location?.lat?.toFixed(3)}, ${a.location?.lng?.toFixed(3)}`}</td>
                  <td>
                    <span className={`badge ${a.status === "active" ? "badge--danger" : a.status === "resolved" ? "badge--success" : "badge--neutral"}`}>
                      {a.status}
                    </span>
                  </td>
                  <td>{new Date(a.triggeredAt || a.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "Incidents" && (
        <div className="card admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Description</th><th>Category</th><th>Severity</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {incidents.map((i) => (
                <tr key={i._id}>
                  <td style={{ maxWidth: 260 }}>{i.description}</td>
                  <td>{i.category}</td>
                  <td>{i.severity}</td>
                  <td><span className="badge badge--neutral">{i.status}</span></td>
                  <td>
                    <select
                      value={i.status}
                      disabled={updatingId === i._id}
                      onChange={(e) => handleStatusChange(i._id, e.target.value)}
                      style={{ background: "var(--surface)", color: "var(--text-primary)", border: "1px solid var(--surface-border)", borderRadius: 8, padding: "4px 8px" }}
                    >
                      <option value="pending">pending</option>
                      <option value="reviewed">reviewed</option>
                      <option value="resolved">resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
