// src/pages/IncidentsPage.jsx
import { useState } from "react";
import MetricCard from "../components/ui/MetricCard";
import SeverityBadge from "../components/ui/SeverityBadge";
import StatusBadge from "../components/ui/StatusBadge";
import { incidents } from "../MockData";

const IncidentsPage = () => {
  const [selected, setSelected] = useState(null);

  const open       = incidents.filter((i) => i.status === "open").length;
  const investing  = incidents.filter((i) => i.status === "investigating").length;
  const resolved   = incidents.filter((i) => i.status === "resolved" || i.status === "closed").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* ── Metric Cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <MetricCard label="Total Incidents"   value={incidents.length}  color="#378ADD" />
        <MetricCard label="Open"              value={open}              color="#E24B4A" trend="up" sub="needs attention" />
        <MetricCard label="Investigating"     value={investing}        color="#EF9F27" />
        <MetricCard label="Resolved / Closed" value={resolved}         color="#1D9E75" />
      </div>

      {/* ── Incident Table ── */}
      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 380px" : "1fr", gap: 16 }}>

        {/* Table */}
        <div style={{ background: "#fff", border: "0.5px solid #E8E6DF", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: "0.5px solid #E8E6DF" }}>
            <p style={{ fontWeight: 500, fontSize: 14, color: "#2C2C2A", margin: 0 }}>All Incidents</p>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F9F8F5" }}>
                {["ID", "Title", "Severity", "Status", "Created", "Analyst"].map((h) => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 500, color: "#888780", borderBottom: "0.5px solid #E8E6DF" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {incidents.map((inc, i) => (
                <tr
                  key={inc.id}
                  onClick={() => setSelected(selected?.id === inc.id ? null : inc)}
                  style={{
                    borderBottom: "0.5px solid #F1EFE8",
                    background: selected?.id === inc.id ? "#EEF5FD" : i % 2 === 0 ? "#fff" : "#FDFCFB",
                    cursor: "pointer",
                  }}
                >
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, fontWeight: 500, color: "#185FA5" }}>{inc.id}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "#2C2C2A" }}>{inc.title}</td>
                  <td style={{ padding: "12px 16px" }}><SeverityBadge level={inc.severity} /></td>
                  <td style={{ padding: "12px 16px" }}><StatusBadge status={inc.status} /></td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#888780" }}>{inc.created}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#888780" }}>{inc.analyst}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div style={{ background: "#fff", border: "0.5px solid #E8E6DF", borderRadius: 12, padding: "20px 24px", alignSelf: "start" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <p style={{ fontWeight: 500, fontSize: 14, color: "#2C2C2A", margin: 0 }}>Detail Incident</p>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#888780" }}>✕</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <p style={{ fontSize: 11, color: "#888780", margin: "0 0 4px" }}>Incident ID</p>
                <p style={{ fontSize: 13, fontFamily: "monospace", color: "#185FA5", margin: 0 }}>{selected.id}</p>
              </div>
              <div>
                <p style={{ fontSize: 11, color: "#888780", margin: "0 0 4px" }}>Title</p>
                <p style={{ fontSize: 13, color: "#2C2C2A", margin: 0, fontWeight: 500 }}>{selected.title}</p>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div>
                  <p style={{ fontSize: 11, color: "#888780", margin: "0 0 4px" }}>Severity</p>
                  <SeverityBadge level={selected.severity} />
                </div>
                <div>
                  <p style={{ fontSize: 11, color: "#888780", margin: "0 0 4px" }}>Status</p>
                  <StatusBadge status={selected.status} />
                </div>
              </div>
              <div>
                <p style={{ fontSize: 11, color: "#888780", margin: "0 0 4px" }}>Dibuat</p>
                <p style={{ fontSize: 13, color: "#2C2C2A", margin: 0 }}>{selected.created} WIB</p>
              </div>
              <div>
                <p style={{ fontSize: 11, color: "#888780", margin: "0 0 4px" }}>Analyst</p>
                <p style={{ fontSize: 13, color: "#2C2C2A", margin: 0 }}>{selected.analyst === "-" ? "Unassigned" : selected.analyst}</p>
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button style={{ flex: 1, padding: "8px", fontSize: 12, fontWeight: 500, background: "#378ADD", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>
                  Assign to Me
                </button>
                <button style={{ flex: 1, padding: "8px", fontSize: 12, fontWeight: 500, background: "#EAF3DE", color: "#3B6D11", border: "0.5px solid #C0DD97", borderRadius: 8, cursor: "pointer" }}>
                  Mark Resolved
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentsPage;