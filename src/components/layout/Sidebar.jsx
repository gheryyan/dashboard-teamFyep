import { NavLink } from "react-router-dom";

import { 
  LayoutDashboard, Bell, ShieldAlert, Zap, 
  Cpu, Monitor, FileText, Settings 
} from "lucide-react";

const navItems = [
  { path: "/",         label: "Overview",        icon: <LayoutDashboard size={18} /> },
  { path: "/alerts",    label: "Alerts",          icon: <Bell size={18} /> },
  { path: "/incidents", label: "Incidents",       icon: <ShieldAlert size={18} /> },
  { path: "/response",  label: "Active Response", icon: <Zap size={18} /> },
  { path: "/ai",        label: "AI Analysis",     icon: <Cpu size={18} /> },
  { path: "/endpoints", label: "Endpoints",      icon: <Monitor size={18} /> },
  { path: "/reports",   label: "Reports",         icon: <FileText size={18} /> },
  { path: "/settings",  label: "Settings",        icon: <Settings size={18} /> },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  return (
    <div style={{
      width: collapsed ? 70 : 240, 
      minHeight: "100vh",
      background: "#0091FF",
      borderRight: "1px solid rgba(255,255,255,0.15)",
      transition: "width 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{
        padding: "24px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        justifyContent: collapsed ? "center" : "flex-start",
      }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "#fff", // Diubah ke putih solid agar kontras dengan background biru
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          fontWeight: 700,
          color: "#29b6f6", 
          flexShrink: 0,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}>
          A
        </div>
        {!collapsed && (
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 16, letterSpacing: "0.04em" }}>
            ARGANIX
          </span>
        )}
      </div>

      {/* Nav Links */}
      <nav style={{ flex: 1, padding: "8px 0" }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: collapsed ? 0 : 12,
              padding: "12px 20px",
              justifyContent: collapsed ? "center" : "flex-start",
              textDecoration: "none",
              background: isActive ? "rgba(255, 255, 255, 0.18)" : "transparent",
              borderLeft: isActive ? "4px solid #ffffff" : "4px solid transparent",
              transition: "all 0.2s ease",
            })}
          >
            {({ isActive }) => (
              <>
                <span style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.7)",
                  transition: "color 0.2s ease",
                }}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <span style={{
                    fontSize: 14,
                    color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.7)",
                    fontWeight: isActive ? 600 : 400,
                    transition: "color 0.2s ease",
                  }}>
                    {item.label}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          margin: "16px auto",
          padding: "8px 12px",
          background: "rgba(255, 255, 255, 0.15)",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          color: "#ffffff",
          fontSize: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) => e.target.style.background = "rgba(255, 255, 255, 0.25)"}
        onMouseLeave={(e) => e.target.style.background = "rgba(255, 255, 255, 0.15)"}
      >
        {collapsed ? "▶" : "◀"}
      </button>
    </div>
  );
};

export default Sidebar;