// src/components/ui/SeverityBadge.jsx

const SeverityBadge = ({ level }) => {
  const styles = {
    critical: { bg: "#FCEBEB", color: "#A32D2D", border: "#F7C1C1" },
    high:     { bg: "#FAEEDA", color: "#854F0B", border: "#FAC775" },
    medium:   { bg: "#E6F1FB", color: "#185FA5", border: "#B5D4F4" },
    low:      { bg: "#EAF3DE", color: "#3B6D11", border: "#C0DD97" },
  };
  const s = styles[level] || styles.medium;
  return (
    <span style={{
      padding: "2px 8px",
      borderRadius: 4,
      fontSize: 11,
      fontWeight: 500,
      background: s.bg,
      color: s.color,
      border: `0.5px solid ${s.border}`,
      textTransform: "uppercase",
      letterSpacing: "0.04em",
    }}>
      {level}
    </span>
  );
};

export default SeverityBadge;