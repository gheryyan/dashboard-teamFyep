// src/components/layout/Topbar.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Topbar = ({ alertCount = 0, isSidebarCollapsed = false }) => {
  const [now, setNow] = useState(new Date());
  const [showMenu, setShowMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "AN";

  const theme = {
    background: isSidebarCollapsed ? "#0091FF" : "#fff", // Sesuaikan warna biru ARGANIX kamu di sini (misal #0091FF atau #185FA5)
    borderBottom: isSidebarCollapsed ? "1px solid #0076D6" : "1px solid #E8E6DF",
    textColorPrimary: isSidebarCollapsed ? "#fff" : "#2C2C2A",
    textColorSecondary: isSidebarCollapsed ? "#E0F0FF" : "#888780",
    iconColor: isSidebarCollapsed ? "#fff" : "#888780",
  };

  return (
    <div style={{
      height: 56, 
      background: theme.background,
      borderBottom: theme.borderBottom,
      display: "flex", 
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px", 
      gap: 16, 
      flexShrink: 0,
      fontFamily: "'Inter', system-ui, sans-serif",
      transition: "background 0.3s ease, border 0.3s ease", // Efek transisi halus saat berubah warna
    }}>
      
      {/*Status Koneksi SIEM ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: isSidebarCollapsed ? "#00FFB2" : "#1D9E75" }} />
        <span style={{ fontSize: 11, fontWeight: 600, color: theme.textColorPrimary, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          SIEM Connected
        </span>
        <span style={{ fontSize: 11, color: theme.textColorSecondary, marginLeft: 4 }}>
          Wazuh v4.8 · Gemma 4 Active
        </span>
      </div>

      {/* ── KANAN: Jam, Notifikasi, & Profil ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        
        {/* Jam Real-time */}
        <span style={{ fontSize: 12, color: theme.textColorSecondary, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.2px" }}>
          {now.toLocaleTimeString("id-ID")} WIB
        </span>

        {/* Lonceng Notifikasi */}
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <button style={{
            background: "none", border: "none", padding: 6, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: alertCount > 0 ? theme.textColorPrimary : theme.iconColor,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
          
          {alertCount > 0 && (
            <span style={{
              position: "absolute", top: 4, right: 4,
              width: 6, height: 6, background: isSidebarCollapsed ? "#FFEB00" : "#E24B4A", // Berubah kuning saat biru biar kontras tinggi
              borderRadius: "50%"
            }} />
          )}
        </div>

        {/* Menu Profil Dropdown */}
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setShowMenu(!showMenu)}
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" }}
          >
            {/* Kotak Avatar */}
            <div style={{
              width: 30, height: 30, borderRadius: "50%", 
              background: isSidebarCollapsed ? "rgba(255,255,255,0.2)" : "#F1EFE8", // Transparan putih halus jika latar biru
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, color: isSidebarCollapsed ? "#fff" : "#5F5E5A", fontWeight: 600, letterSpacing: "0.5px"
            }}>{initials}</div>
            
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 12, fontWeight: 550, color: theme.textColorPrimary, lineHeight: "1.2" }}>
                {user?.name || "Gheryyan Analyst"}
              </span>
              <span style={{ fontSize: 10, color: theme.textColorSecondary, textTransform: "uppercase", letterSpacing: "0.3px", marginTop: 2 }}>
                {user?.role || "Security Operator"}
              </span>
            </div>

            {/* Chevron Arrow */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={theme.iconColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: showMenu ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>

          {/* Panel Dropdown Menu (Tetap Putih Bersih agar mudah dibaca) */}
          {showMenu && (
            <>
              <div onClick={() => setShowMenu(false)} style={{ position: "fixed", inset: 0, zIndex: 9 }} />
              <div style={{
                position: "absolute", top: 42, right: 0, zIndex: 10,
                background: "#fff", border: "1px solid #E8E6DF",
                borderRadius: 8, padding: "4px", minWidth: 180,
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              }}>
                <div style={{ padding: "10px 12px 12px", borderBottom: "1px solid #F4F3EF" }}>
                  <p style={{ fontSize: 10, color: "#888780", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Signed in as</p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#2C2C2A", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {user?.email || "analyst@arganix.id"}
                  </p>
                </div>

                <button
                  onClick={() => { setShowMenu(false); navigate("/settings"); }}
                  style={{
                    width: "100%", padding: "9px 12px", fontSize: 12, fontWeight: 500,
                    background: "transparent", border: "none", borderRadius: 6,
                    cursor: "pointer", color: "#2C2C2A", textAlign: "left",
                    display: "flex", alignItems: "center", gap: 10, marginTop: 4,
                    transition: "background 0.15s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#F9F8F5"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                  System Settings
                </button>

                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%", padding: "9px 12px", fontSize: 12, fontWeight: 500,
                    background: "transparent", border: "none", borderRadius: 6,
                    cursor: "pointer", color: "#A32D2D", textAlign: "left",
                    display: "flex", alignItems: "center", gap: 10,
                    transition: "background 0.15s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#FCEBEB"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;