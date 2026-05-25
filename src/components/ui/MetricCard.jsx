// src/components/ui/MetricCard.jsx

const MetricCard = ({ label, value, sub, color = "#378ADD", icon, trend }) => (
  <div style={{
    background: "#fff",
    border: "0.5px solid #E8E6DF",
    borderRadius: 12,
    padding: "16px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontSize: 12, color: "#888780", fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 18 }}>{icon}</span>
    </div>

    <div style={{ fontSize: 28, fontWeight: 600, color: "#2C2C2A", lineHeight: 1 }}>
      {value}
    </div>

    {sub && (
      <div style={{
        fontSize: 12,
        color:
          trend === "up"   ? "#A32D2D" :
          trend === "down" ? "#3B6D11" :
          "#888780",
      }}>
        {trend === "up" ? "↑" : trend === "down" ? "↓" : ""} {sub}
      </div>
    )}

    <div style={{ height: 3, background: "#F1EFE8", borderRadius: 2 }}>
      <div style={{ width: "60%", height: "100%", background: color, borderRadius: 2 }} />
    </div>
  </div>
);

export default MetricCard;