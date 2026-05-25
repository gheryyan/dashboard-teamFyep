// src/pages/EndpointsPage.jsx
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import useEndpoints from "../hooks/useEndpoints";
import MetricCard from "../components/ui/MetricCard";
import { LoadingState, ErrorState } from "../components/ui/PageState";

const StatusDot = ({ status }) => {
  const color = status === "online" ? "#1D9E75" : status === "warning" ? "#EF9F27" : "#E24B4A";
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, display: "inline-block" }} />
      <span style={{ fontSize: 12, color: "#5F5E5A", textTransform: "capitalize" }}>{status}</span>
    </span>
  );
};

const EndpointsPage = () => {
  const [selected, setSelected] = useState(null);
  const { endpoints, loading, error, refetch } = useEndpoints();

  const online  = endpoints.filter((e) => e.status === "online").length;
  const warning = endpoints.filter((e) => e.status === "warning").length;
  const offline = endpoints.filter((e) => e.status === "offline").length;

  const chartData = endpoints.map((e) => ({
    name: e.name,
    alerts: e.alerts_count ?? e.alerts ?? 0,
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <MetricCard label="Total Endpoints" value={loading ? "..." : endpoints.length}  color="#378ADD" />
        <MetricCard label="Online"          value={loading ? "..." : online}            color="#1D9E75" />
        <MetricCard label="Warning"         value={loading ? "..." : warning}           color="#EF9F27" />
        <MetricCard label="Offline"         value={loading ? "..." : offline}           color="#E24B4A" />
      </div>

      {loading && <LoadingState message="Memuat data endpoints..." />}
      {error   && <ErrorState message={error} onRetry={refetch} />}

      {!loading && !error && (
        <>
          {/* Bar Chart */}
          <div style={{ background: "#fff", border: "0.5px solid #E8E6DF", borderRadius: 12, padding: "20px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <p style={{ fontWeight: 500, fontSize: 14, color: "#2C2C2A", margin: 0 }}>Alert Activity per Endpoint</p>
              <p style={{ fontSize: 12, color: "#888780", margin: 0 }}>Wazuh Agent — last 24h</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData} margin={{ left: -20 }}>
                <CartesianGrid stroke="#F1EFE8" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#888780" }} />
                <YAxis tick={{ fontSize: 11, fill: "#888780" }} />
                <Tooltip contentStyle={{ fontSize: 12, border: "0.5px solid #E8E6DF", borderRadius: 8 }} cursor={{ fill: "#F1EFE8" }} />
                <Bar dataKey="alerts" fill="#378ADD" radius={[4, 4, 0, 0]} name="Alerts" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Table + Detail */}
          <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 320px" : "1fr", gap: 16 }}>
            <div style={{ background: "#fff", border: "0.5px solid #E8E6DF", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "16px 24px", borderBottom: "0.5px solid #E8E6DF" }}>
                <p style={{ fontWeight: 500, fontSize: 14, color: "#2C2C2A", margin: 0 }}>Daftar Endpoint</p>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#F9F8F5" }}>
                    {["Endpoint", "IP Address", "OS", "Status", "Alerts", "Agent Ver.", "Last Seen"].map((h) => (
                      <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 500, color: "#888780", borderBottom: "0.5px solid #E8E6DF" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {endpoints.map((e, i) => (
                    <tr
                      key={e.id ?? e.name}
                      onClick={() => setSelected(selected?.id === e.id ? null : e)}
                      style={{ borderBottom: "0.5px solid #F1EFE8", background: selected?.id === e.id ? "#EEF5FD" : i % 2 === 0 ? "#fff" : "#FDFCFB", cursor: "pointer" }}
                    >
                      <td style={{ padding: "12px 16px", fontWeight: 600, fontSize: 13, color: "#2C2C2A" }}>{e.name}</td>
                      <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#5F5E5A" }}>{e.ip_address}</td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: "#5F5E5A" }}>{e.os}</td>
                      <td style={{ padding: "12px 16px" }}><StatusDot status={e.status} /></td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ fontSize: 12, fontWeight: 500, color: (e.alerts_count ?? 0) > 30 ? "#A32D2D" : (e.alerts_count ?? 0) > 15 ? "#854F0B" : "#5F5E5A" }}>
                          {e.alerts_count ?? 0}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#5F5E5A" }}>{e.agent_version ?? "—"}</td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: "#888780" }}>
                        {e.last_seen ? new Date(e.last_seen).toLocaleTimeString("id-ID") : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Detail Panel */}
            {selected && (
              <div style={{ background: "#fff", border: "0.5px solid #E8E6DF", borderRadius: 12, padding: "20px 24px", alignSelf: "start" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <p style={{ fontWeight: 500, fontSize: 14, color: "#2C2C2A", margin: 0 }}>Detail Endpoint</p>
                  <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#888780" }}>✕</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { label: "Hostname",    value: selected.name,           mono: false },
                    { label: "IP Address",  value: selected.ip_address,     mono: true  },
                    { label: "OS",          value: selected.os,             mono: false },
                    { label: "Agent Ver.",  value: selected.agent_version,  mono: true  },
                    { label: "Last Seen",   value: selected.last_seen ? new Date(selected.last_seen).toLocaleString("id-ID") : "—", mono: false },
                  ].map((row) => (
                    <div key={row.label}>
                      <p style={{ fontSize: 11, color: "#888780", margin: "0 0 3px" }}>{row.label}</p>
                      <p style={{ fontSize: 13, color: "#2C2C2A", margin: 0, fontFamily: row.mono ? "monospace" : "inherit", fontWeight: 500 }}>{row.value ?? "—"}</p>
                    </div>
                  ))}
                  <div>
                    <p style={{ fontSize: 11, color: "#888780", margin: "0 0 3px" }}>Status</p>
                    <StatusDot status={selected.status} />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: "#888780", margin: "0 0 3px" }}>Alerts (24h)</p>
                    <p style={{ fontSize: 22, fontWeight: 600, margin: 0, color: (selected.alerts_count ?? 0) > 30 ? "#E24B4A" : (selected.alerts_count ?? 0) > 15 ? "#EF9F27" : "#1D9E75" }}>
                      {selected.alerts_count ?? 0}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                    <button style={{ flex: 1, padding: "8px", fontSize: 12, fontWeight: 500, background: "#378ADD", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>View Logs</button>
                    <button style={{ flex: 1, padding: "8px", fontSize: 12, fontWeight: 500, background: "#F9F8F5", color: "#5F5E5A", border: "0.5px solid #E8E6DF", borderRadius: 8, cursor: "pointer" }}>Isolate</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EndpointsPage;