export default function Loader({ full = false, label }) {
  return (
    <div className={`loader-wrap ${full ? "loader-wrap--full" : ""}`}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div className="spinner" />
        {label && <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>{label}</p>}
      </div>
    </div>
  );
}
