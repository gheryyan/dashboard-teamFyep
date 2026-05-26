import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate("/", { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.errors?.email?.[0] ||
        err.response?.data?.message ||
        "Login gagal. Periksa kembali email dan password.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F9F8F5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', system-ui, sans-serif",
        padding: "24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 360 }}>
        {" "}
  
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "linear-gradient(135deg, #378ADD 0%, #1D9E75 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 700,
              color: "#fff",
              margin: "0 auto 16px",
            }}
          >
            A
          </div>
          <h1
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#0F1117",
              margin: "0 0 4px",
              letterSpacing: "-0.5px",
            }}
          >
            ARGANIX
          </h1>
          <p
            style={{
              fontSize: 12,
              color: "#888780",
              margin: 0,
              letterSpacing: "0.5px",
            }}
          >
            SECURITY OPERATIONS CENTER
          </p>
        </div>
        {/* Form Container (Cardless Style) */}
        <div style={{ padding: "0 8px" }}>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 18 }}
          >
            {/* Email Field */}
            <div>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#5F5E5A",
                  display: "block",
                  marginBottom: 6,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  fontSize: 13,
                  border: "1px solid #E8E6DF",
                  borderRadius: 8,
                  outline: "none",
                  color: "#2C2C2A",
                  background: "#fff",
                  boxSizing: "border-box",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#378ADD";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(55, 138, 221, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E8E6DF";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#5F5E5A",
                  display: "block",
                  marginBottom: 6,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  style={{
                    width: "100%",
                    padding: "10px 40px 10px 14px",
                    fontSize: 13,
                    border: "1px solid #E8E6DF",
                    borderRadius: 8,
                    outline: "none",
                    color: "#2C2C2A",
                    background: "#fff", 
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#378ADD";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(55, 138, 221, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#E8E6DF";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {showPass ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#888780"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#888780"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div
                style={{
                  padding: "10px 14px",
                  background: "#FCEBEB",
                  border: "1px solid #F7C1C1",
                  borderRadius: 8,
                  fontSize: 12,
                  color: "#A32D2D",
                  lineHeight: "1.4",
                }}
              >
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "11px",
                fontSize: 13,
                fontWeight: 550,
                background: loading ? "#B5D4F4" : "#378ADD",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: 6,
                transition: "background 0.15s ease",
                boxShadow: "0 2px 4px rgba(55, 138, 221, 0.15)",
              }}
            >
              {loading ? "Memproses..." : "Masuk ke Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
