import { useState } from "react";
import MetricCard from "../components/ui/MetricCard";
import StatusBadge from "../components/ui/Statusbadge";
import { activeResponses } from "../MockData";

//mock  data
const allResponses = [
  { id: "AR-0021", time: "16:42", action: "IP Blocked",    target: "192.168.45.201", trigger: "Brute Force",          rule: "Auto",   status: "success" },
  { id: "AR-0020", time: "16:38", action: "Monitor Mode",  target: "10.0.12.55",     trigger: "Suspicious Login",     rule: "Auto",   status: "active"  },
  { id: "AR-0019", time: "16:31", action: "IP Blocked",    target: "172.16.8.100",   trigger: "Port Scan",            rule: "Auto",   status: "success" },
  { id: "AR-0018", time: "16:24", action: "IP Blocked",    target: "10.0.0.88",      trigger: "Privilege Escalation", rule: "Manual", status: "success" },
  { id: "AR-0017", time: "15:58", action: "Alert Only",    target: "192.168.1.99",   trigger: "Anomalous Traffic",    rule: "Auto",   status: "active"  },
  { id: "AR-0016", time: "15:44", action: "IP Unblocked",  target: "10.0.0.55",      trigger: "Manual Review",        rule: "Manual", status: "success" },
  { id: "AR-0015", time: "15:20", action: "IP Blocked",    target: "203.0.113.42",   trigger: "Failed Auth x50",      rule: "Auto",   status: "success" },
];

const ActiveResponsePage = () => {
  const [blockInput, setBlockInput] = useState("");
  const [blockReason, setBlockReason] = useState("");

  const blocked  = allResponses.filter((r) => r.action === "IP Blocked"   && r.status === "success").length;
  const active   = allResponses.filter((r) => r.status === "active").length;
  const manual   = allResponses.filter((r) => r.rule === "Manual").length;

  const handleBlock = () => {
    if (!blockInput) return;
    alert(`IP ${blockInput} akan diblokir via Wazuh Active Response.\n\nIntegrasikan dengan: POST /api/block-ip`);
    setBlockInput("");
    setBlockReason("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* ── Metric Cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <MetricCard label="Total Actions"   value={allResponses.length}  color="#378ADD" />
        <MetricCard label="IPs Blocked"     value={blocked}              color="#E24B4A" />
        <MetricCard label="Monitoring Mode" value={active}               color="#EF9F27" />
        <MetricCard label="Manual Actions"  value={manual}               color="#1D9E75" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>

        {/* ── Response Log Table ── */}
        <div style={{ background: "#fff", border: "0.5px solid #E8E6DF", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: "0.5px solid #E8E6DF" }}>
            <p style={{ fontWeight: 500, fontSize: 14, color: "#2C2C2A", margin: 0 }}>Active Response Log</p>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F9F8F5" }}>
                {["ID", "Time", "Action", "Target IP", "Trigger", "Rule", "Status"].map((h) => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 500, color: "#888780", borderBottom: "0.5px solid #E8E6DF" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allResponses.map((r, i) => (
                <tr key={r.id} style={{ borderBottom: "0.5px solid #F1EFE8", background: i % 2 === 0 ? "#fff" : "#FDFCFB" }}>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#185FA5" }}>{r.id}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#888780" }}>{r.time}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, fontWeight: 500, color: "#2C2C2A" }}>{r.action}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#2C2C2A" }}>{r.target}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#5F5E5A" }}>{r.trigger}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{
                      padding: "2px 8px", borderRadius: 4, fontSize: 11,
                      background: r.rule === "Auto" ? "#E6F1FB" : "#FAEEDA",
                      color: r.rule === "Auto" ? "#185FA5" : "#854F0B",
                    }}>
                      {r.rule}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px" }}><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Manual Block Panel ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Block IP Form */}
          <div style={{ background: "#fff", border: "0.5px solid #E8E6DF", borderRadius: 12, padding: "20px 24px" }}>
            <p style={{ fontWeight: 500, fontSize: 14, color: "#2C2C2A", margin: "0 0 4px" }}>Manual Block IP</p>
            <p style={{ fontSize: 12, color: "#888780", margin: "0 0 16px" }}>Trigger Wazuh active response secara manual</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input
                type="text"
                placeholder="IP Address (e.g. 192.1xx.x.xxx)"
                value={blockInput}
                onChange={(e) => setBlockInput(e.target.value)}
                style={{
                  padding: "8px 12px", fontSize: 12,
                  border: "0.5px solid #E8E6DF", borderRadius: 8,
                  fontFamily: "monospace", outline: "none", color: "#2C2C2A",
                }}
              />
              <input
                type="text"
                placeholder="Alasan (opsional)"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                style={{
                  padding: "8px 12px", fontSize: 12,
                  border: "0.5px solid #E8E6DF", borderRadius: 8,
                  outline: "none", color: "#2C2C2A",
                }}
              />
              <button
                onClick={handleBlock}
                style={{
                  padding: "8px", fontSize: 12, fontWeight: 500,
                  background: "#E24B4A", color: "#fff",
                  border: "none", borderRadius: 8, cursor: "pointer",
                }}
              >
                Block IP
              </button>
            </div>
          </div>

          {/* Response Modes Info */}
          <div style={{ background: "#fff", border: "0.5px solid #E8E6DF", borderRadius: 12, padding: "20px 24px" }}>
            <p style={{ fontWeight: 500, fontSize: 13, color: "#2C2C2A", margin: "0 0 12px" }}>Response Modes</p>
            {[
              { mode: "Block IP", desc: "Blokir IP attacker otomatis via firewall rule", color: "#E24B4A", bg: "#FCEBEB" },
              { mode: "Monitor", desc: "Pantau aktivitas tanpa tindakan langsung", color: "#185FA5", bg: "#E6F1FB" },
              { mode: "Alert Only", desc: "Kirim notifikasi, tidak ada tindakan", color: "#5F5E5A", bg: "#F1EFE8" },
            ].map((m) => (
              <div key={m.mode} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.color, marginTop: 4, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 12, fontWeight: 500, color: "#2C2C2A", margin: 0 }}>{m.mode}</p>
                  <p style={{ fontSize: 11, color: "#888780", margin: "2px 0 0" }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveResponsePage;