// src/services/api.js
// Satu file ini = semua komunikasi ke Laravel backend
// Kalau URL API berubah, cukup edit VITE_API_BASE_URL di .env

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://webgws-two.my.id/api",
  withCredentials: true, // wajib untuk Sanctum
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ── Interceptor: otomatis sisipkan token dari localStorage ──────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("arganix_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Interceptor: tangkap 401 → redirect ke login ───────────────────────────
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("arganix_token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// =========================================================
// AUTH
// =========================================================
export const login = (email, password) =>
  api.post("/auth/login", { email, password });

export const logout = () =>
  api.post("/auth/logout");

export const getMe = () =>
  api.get("/auth/me");

// =========================================================
// ALERTS
// =========================================================
// GET /api/alerts?severity=critical&page=1
export const getAlerts = (params = {}) =>
  api.get("/alerts", { params });

// GET /api/alerts/:id
export const getAlertById = (id) =>
  api.get(`/alerts/${id}`);

// GET /api/alerts/stats — untuk metric cards di dashboard
export const getAlertStats = () =>
  api.get("/alerts/stats");

// GET /api/alerts/timeline — data chart 24 jam
export const getAlertTimeline = () =>
  api.get("/alerts/timeline");

// =========================================================
// INCIDENTS
// =========================================================
export const getIncidents = (params = {}) =>
  api.get("/incidents", { params });

export const getIncidentById = (id) =>
  api.get(`/incidents/${id}`);

export const createIncident = (data) =>
  api.post("/incidents", data);

export const updateIncident = (id, data) =>
  api.put(`/incidents/${id}`, data);

// PATCH /api/incidents/:id/assign — assign ke user login
export const assignIncident = (id) =>
  api.patch(`/incidents/${id}/assign`);

// PATCH /api/incidents/:id/resolve
export const resolveIncident = (id) =>
  api.patch(`/incidents/${id}/resolve`);

// =========================================================
// ACTIVE RESPONSE
// =========================================================
export const getActiveResponses = (params = {}) =>
  api.get("/active-responses", { params });

// POST /api/block-ip — trigger Wazuh active response
export const blockIp = (ip, reason = "") =>
  api.post("/block-ip", { ip, reason });

// POST /api/unblock-ip
export const unblockIp = (ip) =>
  api.post("/unblock-ip", { ip });

// =========================================================
// ENDPOINTS (Wazuh agents)
// =========================================================
export const getEndpoints = () =>
  api.get("/endpoints");

export const getEndpointById = (id) =>
  api.get(`/endpoints/${id}`);

// =========================================================
// AI ANALYSIS
// =========================================================
// POST /api/ai/analyze — Laravel yang call Anthropic API (API key aman di backend)
export const analyzeAlert = (alertText) =>
  api.post("/ai/analyze", { alert: alertText });

export const getAnalysisHistory = (params = {}) =>
  api.get("/ai/history", { params });

// =========================================================
// REPORTS
// =========================================================
export const getReports = () =>
  api.get("/reports");

export const generateReport = (type, period) =>
  api.post("/reports/generate", { type, period });

// GET /api/reports/:id/download → return file URL atau blob
export const downloadReport = (id) =>
  api.get(`/reports/${id}/download`, { responseType: "blob" });

// =========================================================
// SETTINGS
// =========================================================
export const getSettings = () =>
  api.get("/settings");

export const updateSettings = (section, data) =>
  api.put(`/settings/${section}`, data);

export const testWazuhConnection = (url, username, password) =>
  api.post("/settings/wazuh/test", { url, username, password });

export default api;