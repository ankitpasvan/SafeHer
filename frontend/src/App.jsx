import { Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";

import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminRoute from "./components/common/AdminRoute";
import AppShell from "./components/common/AppShell";

import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import DashboardOverview from "./components/dashboard/DashboardOverview";
import LiveTracking from "./components/tracking/LiveTracking";
import PanicFlow from "./components/flow/PanicFlow";
import ContactsOverview from "./components/contacts/ContactsOverview";
import SafetyScoreDetail from "./components/score/SafetyScoreDetail";
import RecentAlerts from "./components/alerts/RecentAlerts";
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

          {/* Authenticated */}
          <Route element={<ProtectedRoute />}>
            {/* Main Desktop/Tablet Dashboard Overview matching design */}
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/dashboard" element={<DashboardOverview />} />

            {/* Live Tracking matching Slide 3 design */}
            <Route path="/tracking" element={<LiveTracking />} />
            <Route path="/explore" element={<LiveTracking />} />

            {/* Panic Button Flow matching Slide 4 design */}
            <Route path="/flow" element={<PanicFlow />} />
            <Route path="/panic-flow" element={<PanicFlow />} />

            {/* Emergency Contacts matching Slide 5 design */}
            <Route path="/contacts" element={<ContactsOverview />} />
            <Route path="/profile" element={<ContactsOverview />} />

            {/* Safety Score matching Slide 6 design */}
            <Route path="/safety-score" element={<SafetyScoreDetail />} />
            <Route path="/score" element={<SafetyScoreDetail />} />
            <Route path="/safety" element={<SafetyScoreDetail />} />

            {/* Recent Alerts matching Slide 7 design */}
            <Route path="/alerts" element={<RecentAlerts />} />

            {/* Authenticated app shell for other screens */}
            <Route element={<AppShell />}>
              <Route path="/safe-routes" element={<SafeRoutes />} />
              <Route path="/home-legacy" element={<Home />} />
              <Route path="/safety-legacy" element={<Dashboard />} />
              <Route path="/alerts-legacy" element={<Alerts />} />
              <Route path="/profile-legacy" element={<EmergencyContacts />} />
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
