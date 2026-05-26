import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import MetricCard from "../components/ui/MetricCard";

const weeklyAlerts = [
  { day: "Sen", critical: 8,  high: 14, medium: 22 },
  { day: "Sel", critical: 5,  high: 10, medium: 18 },
  { day: "Rab", critical: 12, high: 20, medium: 31 },
  { day: "Kam", critical: 6,  high: 9,  medium: 15 },
  { day: "Jum", critical: 15, high: 24, medium: 38 },
  { day: "Sab", critical: 3,  high: 6,  medium: 11 },
  { day: "Min", critical: 1,  high: 4,  medium: 8  },
];

const responseTime = [
  { day: "Sen", menit: 4.2 },
  { day: "Sel", menit: 3.8 },
  { day: "Rab", menit: 6.1 },
  { day: "Kam", menit: 2.9 },
  { day: "Jum", menit: 5.4 },
  { day: "Sab", menit: 3.1 },
  { day: "Min", menit: 2.4 },
];

// Laporan tersedia
const availableReports = [
  { id: "RPT-2025-001", title: "Weekly Security Summary",    period: "13–19 Jan 2025", type: "Weekly",  status: "ready",    size: "1.2 MB" },
  { id: "RPT-2025-002", title: "Incident Report INC-0039",   period: "17 Jan 2025",    type: "Incident",status: "ready",    size: "840 KB" },
  { id: "RPT-2025-003", title: "Monthly Threat Overview",    period: "Des 2024",       type: "Monthly", status: "ready",    size: "3.4 MB" },
  { id: "RPT-2025-004", title: "Endpoint Compliance Report", period: "Jan 2025",       type: "Compliance",status:"generating",size: "—"     },
  { id: "RPT-2024-012", title: "Monthly Threat Overview",    period: "Nov 2024",       type: "Monthly", status: "ready",    size: "3.1 MB" },
];

const typeColor = {
  Weekly:     { bg: "#E6F1FB", color: "#185FA5" },
  Incident:   { bg: "#FCEBEB", color: "#A32D2D" },
  Monthly:    { bg: "#EAF3DE", color: "#3B6D11" },
  Compliance: { bg: "#FAEEDA", color: "#854F0B" },
};

const ReportsPage = () => {
  const handleDownload = (report) => {
    if (report.status !== "ready") return;
    alert(`Download: ${report.title}\n\nIntegrasikan dengan: GET /api/reports/${report.id}/download`);
  };

  const handleGenerate = () => {
    alert("Generate report baru.\n\nIntegrasikan dengan: POST /api/reports/generate");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* ── Metric Cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <MetricCard label="Total Reports"    value="47"    color="#378ADD" />
        <MetricCard label="Generated Today"  value="3"     color="#1D9E75" />
        <MetricCard label="Avg Response Time" value="4.1m" color="#EF9F27" sub="this week" />
        <MetricCard label="SLA Compliance"   value="94%"  color="#1D9E75" sub="+2% from last month" trend="down" />
      </div>

      {/* ── Charts Row ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

        {/* Weekly Alert Trend */}
        <div style={{ background: "#fff", border: "0.5px solid #E8E6DF", borderRadius: 12, padding: "20px 24px" }}>
          <p style={{ fontWeight: 500, fontSize: 14, color: "#2C2C2A", margin: "0 0 4px" }}>Weekly Alert Trend</p>
          <p style={{ fontSize: 12, color: "#888780", margin: "0 0 16px" }}>Distribusi severity minggu ini</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyAlerts} margin={{ left: -20 }}>
              <CartesianGrid stroke="#F1EFE8" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#888780" }} />
              <YAxis tick={{ fontSize: 11, fill: "#888780" }} />
              <Tooltip contentStyle={{ fontSize: 12, border: "0.5px solid #E8E6DF", borderRadius: 8 }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="critical" stackId="a" fill="#E24B4A" name="Critical" radius={[0,0,0,0]} />
              <Bar dataKey="high"     stackId="a" fill="#EF9F27" name="High"     radius={[0,0,0,0]} />
              <Bar dataKey="medium"   stackId="a" fill="#378ADD" name="Medium"   radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Mean Time to Respond */}
        <div style={{ background: "#fff", border: "0.5px solid #E8E6DF", borderRadius: 12, padding: "20px 24px" }}>
          <p style={{ fontWeight: 500, fontSize: 14, color: "#2C2C2A", margin: "0 0 4px" }}>Mean Time to Respond (MTTR)</p>
          <p style={{ fontSize: 12, color: "#888780", margin: "0 0 16px" }}>Rata-rata waktu respon per hari (menit)</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={responseTime} margin={{ left: -20 }}>
              <CartesianGrid stroke="#F1EFE8" strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#888780" }} />
              <YAxis tick={{ fontSize: 11, fill: "#888780" }} />
              <Tooltip contentStyle={{ fontSize: 12, border: "0.5px solid #E8E6DF", borderRadius: 8 }} />
              <Line type="monotone" dataKey="menit" stroke="#378ADD" strokeWidth={2} dot={{ r: 3, fill: "#378ADD" }} name="Menit" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Report List ── */}
      <div style={{ background: "#fff", border: "0.5px solid #E8E6DF", borderRadius: 12, overflow: "hidden" }}>
        <div style={{
          padding: "16px 24px", borderBottom: "0.5px solid #E8E6DF",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <p style={{ fontWeight: 500, fontSize: 14, color: "#2C2C2A", margin: 0 }}>Laporan Tersedia</p>
          <button
            onClick={handleGenerate}
            style={{
              padding: "6px 16px", fontSize: 12, fontWeight: 500,
              background: "#378ADD", color: "#fff",
              border: "none", borderRadius: 8, cursor: "pointer",
            }}
          >
            + Generate Report
          </button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F9F8F5" }}>
              {["ID", "Judul", "Periode", "Tipe", "Ukuran", "Status", "Aksi"].map((h) => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 500, color: "#888780", borderBottom: "0.5px solid #E8E6DF" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {availableReports.map((r, i) => {
              const tc = typeColor[r.type] || typeColor.Weekly;
              return (
                <tr key={r.id} style={{ borderBottom: "0.5px solid #F1EFE8", background: i % 2 === 0 ? "#fff" : "#FDFCFB" }}>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#185FA5" }}>{r.id}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "#2C2C2A", fontWeight: 500 }}>{r.title}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#888780" }}>{r.period}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ padding: "2px 8px", borderRadius: 4, fontSize: 11, background: tc.bg, color: tc.color }}>
                      {r.type}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#5F5E5A", fontFamily: "monospace" }}>{r.size}</td>
                  <td style={{ padding: "12px 16px" }}>
                    {r.status === "ready" ? (
                      <span style={{ fontSize: 12, color: "#3B6D11" }}>✓ Ready</span>
                    ) : (
                      <span style={{ fontSize: 12, color: "#854F0B" }}>⏳ Generating...</span>
                    )}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <button
                      onClick={() => handleDownload(r)}
                      disabled={r.status !== "ready"}
                      style={{
                        padding: "4px 12px", fontSize: 11,
                        border: "0.5px solid",
                        borderColor: r.status === "ready" ? "#E8E6DF" : "#F1EFE8",
                        borderRadius: 6,
                        background: "transparent",
                        color: r.status === "ready" ? "#185FA5" : "#B4B2A9",
                        cursor: r.status === "ready" ? "pointer" : "not-allowed",
                      }}
                    >
                      ↓ Download
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;