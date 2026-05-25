

export const LoadingState = ({ message = "Memuat data..." }) => (
  <div style={{
    background: "var(--color-background-primary, #fff)",
    border: "0.5px solid #E8E6DF",
    borderRadius: 12,
    padding: "48px 24px",
    textAlign: "center",
  }}>
    <div style={{ fontSize: 28, marginBottom: 12, opacity: 0.4 }}>⏳</div>
    <p style={{ fontSize: 14, color: "#888780", margin: 0 }}>{message}</p>
  </div>
);

export const ErrorState = ({ message, onRetry }) => (
  <div style={{
    background: "#FEFAFA",
    border: "0.5px solid #F7C1C1",
    borderRadius: 12,
    padding: "32px 24px",
    textAlign: "center",
  }}>
    <div style={{ fontSize: 28, marginBottom: 12 }}>⚠</div>
    <p style={{ fontSize: 14, color: "#A32D2D", margin: "0 0 16px" }}>{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        style={{
          padding: "6px 20px", fontSize: 12, fontWeight: 500,
          background: "#fff", color: "#185FA5",
          border: "0.5px solid #B5D4F4", borderRadius: 8, cursor: "pointer",
        }}
      >
        Coba Lagi
      </button>
    )}
  </div>
);

export const EmptyState = ({ message = "Tidak ada data." }) => (
  <div style={{
    background: "#fff",
    border: "0.5px solid #E8E6DF",
    borderRadius: 12,
    padding: "48px 24px",
    textAlign: "center",
  }}>
    <div style={{ fontSize: 28, marginBottom: 12, opacity: 0.3 }}>📭</div>
    <p style={{ fontSize: 14, color: "#888780", margin: 0 }}>{message}</p>
  </div>
);