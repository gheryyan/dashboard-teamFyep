// src/pages/AlertsPage.jsx
import { useState } from "react";
import useAlerts from "../hooks/useAlerts";
import SeverityBadge from "../components/ui/SeverityBadge";
import StatusBadge from "../components/ui/Statusbadge";
import AIScoreBar from "../components/ui/AiScorebar";
import { LoadingState, ErrorState } from "../components/ui/PageState";

const FILTERS = ["all", "critical", "high", "medium", "low"];

const AlertsPage = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const params = filter !== "all" ? { severity: filter } : {};
  const { alerts, loading, error, refetch } = useAlerts(params);

  const filtered = alerts.filter((a) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      a.id?.toString().includes(q) ||
      a.alert_type?.toLowerCase().includes(q) ||
      a.source_ip?.includes(q)
    );
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "6px 16px", borderRadius: 20, fontSize: 12,
              fontWeight: 500, cursor: "pointer", border: "0.5px solid",
              borderColor: filter === f ? "#378ADD" : "#E8E6DF",
              background: filter === f ? "#E6F1FB" : "#fff",
              color: filter === f ? "#185FA5" : "#5F5E5A",
              textTransform: "capitalize",
            }}
          >
            {f}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 16px", background: "#fff", border: "0.5px solid #E8E6DF", borderRadius: 8 }}>
          <input
            placeholder="Cari ID, tipe, atau IP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: "none", outline: "none", fontSize: 12, color: "#2C2C2A", background: "transparent", width: 180 }}
          />
        </div>
        <button
          onClick={refetch}
          style={{ padding: "6px 14px", fontSize: 12, border: "0.5px solid #E8E6DF", borderRadius: 8, background: "#fff", cursor: "pointer", color: "#5F5E5A" }}
        >
          ↻ Refresh
        </button>
      </div>

      {/* ── States ── */}
      {loading && <LoadingState message="Memuat alerts..." />}
      {error   && <ErrorState message={error} onRetry={refetch} />}

      {/* ── Table ── */}
      {!loading && !error && (
        <div style={{ background: "#fff", border: "0.5px solid #E8E6DF", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: "0.5px solid #E8E6DF", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontWeight: 500, fontSize: 14, color: "#2C2C2A", margin: 0 }}>Security Alerts</p>
            <span style={{ fontSize: 12, color: "#888780" }}>{filtered.length} alerts</span>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F9F8F5" }}>
                {["Alert ID", "Waktu", "Tipe", "Source IP", "Severity", "AI Score", "Status", "Aksi"].map((h) => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 500, color: "#888780", borderBottom: "0.5px solid #E8E6DF" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <tr key={a.id} style={{ borderBottom: "0.5px solid #F1EFE8", background: i % 2 === 0 ? "#fff" : "#FDFCFB" }}>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, fontWeight: 500, color: "#185FA5" }}>
                    ALT-{String(a.id).padStart(4, "0")}
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#888780", fontVariantNumeric: "tabular-nums" }}>
                    {new Date(a.created_at).toLocaleTimeString("id-ID")}
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#2C2C2A" }}>{a.alert_type}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#2C2C2A" }}>{a.source_ip}</td>
                  <td style={{ padding: "12px 16px" }}><SeverityBadge level={a.severity} /></td>
                  <td style={{ padding: "12px 16px", minWidth: 110 }}>
                    {a.ai_score ? <AIScoreBar score={a.ai_score} /> : <span style={{ fontSize: 12, color: "#B4B2A9" }}>—</span>}
                  </td>
                  <td style={{ padding: "12px 16px" }}><StatusBadge status={a.status} /></td>
                  <td style={{ padding: "12px 16px" }}>
                    <button style={{ padding: "4px 10px", fontSize: 11, border: "0.5px solid #E8E6DF", borderRadius: 6, background: "transparent", cursor: "pointer", color: "#185FA5" }}>
                      Analyze ✦
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ padding: "32px", textAlign: "center", color: "#888780", fontSize: 13 }}>
                    Tidak ada alert ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AlertsPage;