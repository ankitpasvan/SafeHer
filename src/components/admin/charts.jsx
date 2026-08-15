// Lightweight dependency-free bar chart (keeps bundle small -- no chart library needed).
export default function BarChart({ data = [], height = 180 }) {
  const max = Math.max(1, ...data.map((d) => d.value));

  if (data.length === 0) {
    return <p style={{ fontSize: 12.5, color: "var(--text-tertiary)" }}>No data yet.</p>;
  }

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 18, height, padding: "10px 4px" }}>
      {data.map((d) => (
        <div key={d.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%", justifyContent: "flex-end" }}>
          <span style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{d.value}</span>
          <div
            style={{
              width: "100%",
              maxWidth: 44,
              height: `${Math.max(4, (d.value / max) * (height - 40))}px`,
              borderRadius: "8px 8px 4px 4px",
              background: d.color || "linear-gradient(180deg, var(--teal), var(--teal-dark))",
              transition: "height 0.4s ease",
            }}
          />
          <span style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 8, textAlign: "center" }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}
