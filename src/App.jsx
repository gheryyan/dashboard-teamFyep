// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute        from "./components/auth/PrivateRoute";
import MainLayout          from "./components/layout/MainLayout";
import LoginPage           from "./components/auth/LoginPage";
import DashboardPage       from "./pages/DashboardPages";
import AlertsPage          from "./pages/AlertPages";
import IncidentsPage       from "./pages/IncidentsPage";
import ActiveResponsePage  from "./pages/Activeresponsepage";
import AIAnalysisPage      from "./pages/AIAnalysisPage";
import EndpointsPage       from "./pages/EndpointsPage";
import ReportsPage         from "./pages/ReportsPage";
import SettingsPage        from "./pages/SettingsPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/login" element={<LoginPage />} />

          {/* ── Protected routes (semua role) ── */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route index                  element={<DashboardPage />} />
              <Route path="alerts"          element={<AlertsPage />} />
              <Route path="incidents"       element={<IncidentsPage />} />
              <Route path="response"        element={<ActiveResponsePage />} />
              <Route path="ai"              element={<AIAnalysisPage />} />
              <Route path="endpoints"       element={<EndpointsPage />} />
              <Route path="reports"         element={<ReportsPage />} />

              {/* Settings — khusus admin saja */}
              <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                <Route path="settings" element={<SettingsPage />} />
              </Route>
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
} 