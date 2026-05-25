// src/components/layout/MainLayout.jsx
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./TopBar";

const pageMeta = {
  "/": { title: "Security Overview", sub: "Real-time monitoring dashboard" },
  "/alerts": { title: "Alert Center", sub: "All security alerts" },
  "/incidents": { title: "Incidents", sub: "Incident management" },
  "/response": { title: "Active Response", sub: "Automated response tracking" },
  "/ai": { title: "AI Analysis", sub: "Gemma 4 threat analysis engine" },
  "/endpoints": { title: "Endpoints", sub: "Wazuh agent status" },
  "/reports": { title: "Reports", sub: "Security reports & exports" },
  "/settings": { title: "Settings", sub: "System configuration" },
};

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const meta = pageMeta[location.pathname] || pageMeta["/"];

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        maxHeight: "100vh",
        background: "#F9F8F5",
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          height: "100vh",
          maxHeight: "100vh",
        }}
      >
        <Topbar alertCount={7} isSidebarCollapsed={collapsed} />

        <main
          style={{
            flex: 1,
            width: "100%",      
            overflowY: "auto",
            overflowX: "hidden",
            background: "#F9F8F5",
          }}
        >
          <div style={{ 
            padding: "24px", 
            width: "100%", 
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            minHeight: "100%",
          }}>
            {/* 🌟 KUNCI PERUBAHAN: Teks judul juga berubah warna jadi putih jika Topbar-nya nanti biru? 
                Biar teks konten tetap hitam, style di sini dibiarkan default */}
            <div style={{ marginBottom: 20 }}>
              <h1 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 4px" }}>{meta.title}</h1>
              <p style={{ fontSize: 13, color: "#888780", margin: 0 }}>{meta.sub}</p>
            </div>

            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;