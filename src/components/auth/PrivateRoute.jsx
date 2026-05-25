import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
 
const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();
 
  // Masih cek token — tampilkan loading dulu, jangan langsung redirect
  if (loading) {
    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        minHeight: "100vh", background: "#F9F8F5",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: "linear-gradient(135deg, #378ADD, #1D9E75)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 700, color: "#fff", margin: "0 auto 12px",
          }}>A</div>
          <p style={{ fontSize: 13, color: "#888780", margin: 0 }}>Memuat...</p>
        </div>
      </div>
    );
  }
 
  // Belum login → ke halaman login
  if (!user) return <Navigate to="/login" replace />;
 
  // Role tidak diizinkan → ke halaman utama
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
 
  // Lulus semua pengecekan → render halaman
  return <Outlet />;
};
 
export default PrivateRoute;