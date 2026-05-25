// src/components/ui/StatusBadge.jsx

const StatusBadge = ({ status }) => {
  const map = {
    blocked:       { label: "Blocked",       bg: "#EAF3DE", color: "#3B6D11" },
    monitoring:    { label: "Monitoring",    bg: "#E6F1FB", color: "#185FA5" },
    investigating: { label: "Investigating", bg: "#FAEEDA", color: "#854F0B" },
    "alert-only":  { label: "Alert Only",    bg: "#F1EFE8", color: "#5F5E5A" },
    success:       { label: "Success",       bg: "#EAF3DE", color: "#3B6D11" },
    active:        { label: "Active",        bg: "#E6F1FB", color: "#185FA5" },
    open:          { label: "Open",          bg: "#FCEBEB", color: "#A32D2D" },
    resolved:      { label: "Resolved",      bg: "#EAF3DE", color: "#3B6D11" },
    closed:        { label: "Closed",        bg: "#F1EFE8", color: "#5F5E5A" },
  };
  const s = map[status] || map["alert-only"];
  return (
    <span style={{
      padding: "2px 8px",
      borderRadius: 4,
      fontSize: 11,
      fontWeight: 500,
      background: s.bg,
      color: s.color,
    }}>
      {s.label}
    </span>
  );
};

export default StatusBadge;