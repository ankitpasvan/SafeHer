export default function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "18px 0 6px",
        fontSize: 12,
        color: "var(--text-tertiary)",
      }}
    >
      SafeHer &copy; {new Date().getFullYear()} &middot; Your safety, always on.
    </footer>
  );
}
