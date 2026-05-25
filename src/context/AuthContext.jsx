import { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin, logout as apiLogout, getMe } from "../services/api";
 
const AuthContext = createContext(null);
 
export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true); 
 
  useEffect(() => {
    const token = localStorage.getItem("arganix_token");
    if (!token) {
      setLoading(false);
      return;
    }
    getMe()
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("arganix_token");
      })
      .finally(() => setLoading(false));
  }, []);
 
  const login = async (email, password) => {
    const res = await apiLogin(email, password);
    const { token, user: userData } = res.data;
    localStorage.setItem("arganix_token", token);
    setUser(userData);
    return userData;
  };
 
  const logout = async () => {
    try {
      await apiLogout();
    } catch (_) {
    } finally {
      localStorage.removeItem("arganix_token");
      setUser(null);
    }
  };
 
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
 

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  return ctx;
};
 
export default AuthContext;