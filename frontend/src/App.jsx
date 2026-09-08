import { Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";

import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminRoute from "./components/common/AdminRoute";
import AppShell from "./components/common/AppShell";

import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import Alerts from "./components/pages/Alerts";
import EmergencyContacts from "./components/pages/EmergencyContacts";
import ReportIncident from "./components/pages/ReportIncident";
import SafeRoutes from "./components/pages/SafeRoutes";
import AdminPanel from "./components/pages/AdminPanel";

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Authenticated app shell (bottom nav + mobile frame) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppShell />}>
              <Route path="/" element={<Home />} />
              <Route path="/safety" element={<Dashboard />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/profile" element={<EmergencyContacts />} />
              <Route path="/explore" element={<SafeRoutes />} />
            </Route>

            {/* Drill-down screens (no bottom nav, own back button) */}
            <Route path="/report" element={<ReportIncident />} />

            {/* Admin only */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
