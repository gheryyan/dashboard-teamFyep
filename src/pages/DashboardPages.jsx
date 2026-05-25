import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import MetricCard from "../components/ui/MetricCard";
import SeverityBadge from "../components/ui/SeverityBadge";
import StatusBadge from "../components/ui/StatusBadge";
import {
  alertsTimelineData,
  topAttackers,
  activeResponses,
  severityDist,
} from "../MockData";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#fff",
      border: "0.5px solid #E8E6DF",
      borderRadius: 8,
      padding: "10px 14px",
      fontSize: 12,
    }}>
      <p style={{ fontWeight: 500, marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, margin: "2px 0" }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

const DashboardPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* ── Metric Cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <MetricCard label="Total Alerts Today" value="287" sub="+32 last hour" trend="up"    color="#E24B4A" />
        <MetricCard label="Active Incidents"   value="12"  sub="3 critical open" trend="up" color="#EF9F27" />
        <MetricCard label="IPs Blocked"        value="47"  sub="-5 from yesterday" trend="down" color="#1D9E75" />
        <MetricCard label="AI Analyses"        value="1,204" sub="avg score 73.4"  color="#378ADD" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>

        {/* Alert Timeline */}
        <div style={{ background: "#fff", border: "0.5px solid #E8E6DF", borderRadius: 12, padding: "20px 24px" }}>
          <p style={{ fontWeight: 500, fontSize: 14, color: "#2C2C2A", margin: 0 }}>Alert Timeline (24h)</p>
          <p style={{ fontSize: 12, color: "#888780", margin: "4px 0 16px" }}>Real-time security events by severity</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={alertsTimelineData}>
              <defs>
                <linearGradient id="critGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E24B4A" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#E24B4A" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="highGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF9F27" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#EF9F27" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#F1EFE8" strokeDasharray="3 3" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#888780" }} />
              <YAxis tick={{ fontSize: 11, fill: "#888780" }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="critical" stroke="#E24B4A" fill="url(#critGrad)" strokeWidth={2} name="Critical" />
              <Area type="monotone" dataKey="high"     stroke="#EF9F27" fill="url(#highGrad)" strokeWidth={2} name="High" />
              <Area type="monotone" dataKey="medium"   stroke="#378ADD" fill="none"           strokeWidth={1.5} strokeDasharray="4 2" name="Medium" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Severity Distribution */}
        <div style={{ background: "#fff", border: "0.5px solid #E8E6DF", borderRadius: 12, padding: "20px 24px" }}>
          <p style={{ fontWeight: 500, fontSize: 14, color: "#2C2C2A", margin: "0 0 4px" }}>Severity Distribution</p>
          <p style={{ fontSize: 12, color: "#888780", margin: "0 0 16px" }}>Today's alert breakdown</p>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={severityDist}
                cx="50%" cy="50%"
                innerRadius={40} outerRadius={65}
                dataKey="value"
                paddingAngle={3}
              >
                {severityDist.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 8 }}>
            {severityDist.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: "#5F5E5A" }}>{d.name} ({d.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Row ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

        {/* Top Attackers */}
        <div style={{ background: "#fff", border: "0.5px solid #E8E6DF", borderRadius: 12, padding: "20px 24px" }}>
          <p style={{ fontWeight: 500, fontSize: 14, color: "#2C2C2A", margin: "0 0 16px" }}>Top Attacker IPs</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {topAttackers.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 4, background: "#F1EFE8",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 600, color: "#5F5E5A", flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "monospace", fontSize: 12, color: "#2C2C2A", fontWeight: 500 }}>{a.ip}</span>
                    <SeverityBadge level={a.risk} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                    <span style={{ fontSize: 11, color: "#888780" }}>{a.type}</span>
                    <span style={{ fontSize: 11, color: "#888780" }}>{a.attacks} attacks</span>
                  </div>
                  <div style={{ marginTop: 4, height: 3, background: "#F1EFE8", borderRadius: 2 }}>
                    <div style={{
                      width: `${(a.attacks / 847) * 100}%`,
                      height: "100%",
                      background: a.risk === "critical" ? "#E24B4A" : "#EF9F27",
                      borderRadius: 2,
                    }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Response Log */}
        <div style={{ background: "#fff", border: "0.5px solid #E8E6DF", borderRadius: 12, padding: "20px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <p style={{ fontWeight: 500, fontSize: 14, color: "#2C2C2A", margin: 0 }}>Active Response Log</p>
            <span style={{ fontSize: 11, color: "#378ADD", cursor: "pointer" }}>View All →</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {activeResponses.map((r, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 12px", background: "#F9F8F5", borderRadius: 8,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: r.status === "success" ? "#EAF3DE" : "#E6F1FB",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, flexShrink: 0,
                }}>
                  {r.status === "success" ? "✓" : "○"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: "#2C2C2A" }}>{r.action}</span>
                    <StatusBadge status={r.status} />
                  </div>
                  <div style={{ fontSize: 11, color: "#888780", marginTop: 2 }}>
                    <span style={{ fontFamily: "monospace" }}>{r.target}</span>
                    {" · "}{r.trigger}{" · "}{r.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;