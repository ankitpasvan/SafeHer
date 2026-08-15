import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";

// Wraps every authenticated "main app" screen with the shared mobile frame
// and bottom tab bar. Individual pages render their own top bar/content.
export default function AppShell() {
  return (
    <div className="app-shell">
      <div className="app-shell__content page-fade">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}
