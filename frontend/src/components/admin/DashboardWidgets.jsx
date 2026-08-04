import { AlertTriangleIcon, MegaphoneIcon, UsersIcon } from "../common/Icons";

const WIDGETS = [
  { key: "totalUsers", label: "Total users", icon: UsersIcon, color: "var(--info)" },
  { key: "totalSOSAlerts", label: "Total SOS alerts", icon: AlertTriangleIcon, color: "var(--danger)" },
  { key: "activeSOSAlerts", label: "Active SOS alerts", icon: AlertTriangleIcon, color: "var(--danger)" },
  { key: "totalIncidents", label: "Total incidents", icon: MegaphoneIcon, color: "var(--warning)" },
  { key: "pendingIncidents", label: "Pending incidents", icon: MegaphoneIcon, color: "var(--warning)" },
];

export default function DashboardWidgets({ stats }) {
  return (
    <div className="admin-stat-grid">
      {WIDGETS.map(({ key, label, icon: Icon, color }) => (
        <div className="card admin-stat-card" key={key}>
          <div className="admin-stat-card__icon" style={{ background: `${color}22`, color }}>
            <Icon width={20} height={20} />
          </div>
          <div>
            <p className="admin-stat-card__value">{stats?.[key] ?? "-"}</p>
            <p className="admin-stat-card__label">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
