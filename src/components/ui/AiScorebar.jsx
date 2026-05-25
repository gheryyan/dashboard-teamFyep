
const AIScoreBar = ({ score }) => {
  const color =
    score >= 85 ? "#E24B4A" :
    score >= 70 ? "#EF9F27" :
    "#378ADD";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{
        flex: 1,
        height: 4,
        background: "#F1EFE8",
        borderRadius: 2,
        overflow: "hidden",
      }}>
        <div style={{
          width: `${score}%`,
          height: "100%",
          background: color,
          borderRadius: 2,
        }} />
      </div>
      <span style={{
        fontSize: 12,
        fontWeight: 500,
        color,
        minWidth: 28,
      }}>
        {score}
      </span>
    </div>
  );
};

export default AIScoreBar;