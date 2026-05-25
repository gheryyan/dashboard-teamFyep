export const alertsTimelineData = [
  { time: "00:00", critical: 2, high: 5, medium: 8, low: 12 },
  { time: "02:00", critical: 1, high: 3, medium: 6, low: 9 },
  { time: "04:00", critical: 0, high: 2, medium: 4, low: 7 },
  { time: "06:00", critical: 3, high: 7, medium: 11, low: 15 },
  { time: "08:00", critical: 8, high: 14, medium: 18, low: 22 },
  { time: "10:00", critical: 12, high: 20, medium: 25, low: 30 },
  { time: "12:00", critical: 6, high: 11, medium: 16, low: 21 },
  { time: "14:00", critical: 9, high: 16, medium: 21, low: 28 },
  { time: "16:00", critical: 15, high: 24, medium: 31, low: 38 },
  { time: "18:00", critical: 11, high: 18, medium: 24, low: 29 },
  { time: "20:00", critical: 7, high: 13, medium: 19, low: 24 },
  { time: "22:00", critical: 4, high: 8, medium: 14, low: 18 },
];
 
export const topAttackers = [
  { ip: "192.168.45.201", country: "CN", attacks: 847, type: "Brute Force", risk: "critical" },
  { ip: "10.0.0.254", country: "RU", attacks: 612, type: "Port Scan", risk: "high" },
  { ip: "172.16.8.100", country: "KP", attacks: 431, type: "SQL Injection", risk: "high" },
  { ip: "203.0.113.42", country: "IR", attacks: 289, type: "XSS Attack", risk: "medium" },
  { ip: "198.51.100.7", country: "BR", attacks: 174, type: "DDoS", risk: "medium" },
];
 
export const recentAlerts = [
  { id: "ALT-0892", time: "16:42:11", type: "Brute Force", source: "192.168.45.201", severity: "critical", status: "blocked", aiScore: 96 },
  { id: "ALT-0891", time: "16:38:44", type: "Suspicious Login", source: "10.0.12.55", severity: "high", status: "monitoring", aiScore: 78 },
  { id: "ALT-0890", time: "16:31:09", type: "Port Scan", source: "172.16.8.100", severity: "high", status: "blocked", aiScore: 82 },
  { id: "ALT-0889", time: "16:24:33", type: "Privilege Escalation", source: "10.0.0.88", severity: "critical", status: "investigating", aiScore: 91 },
  { id: "ALT-0888", time: "16:17:55", type: "Lateral Movement", source: "10.0.0.92", severity: "critical", status: "blocked", aiScore: 94 },
  { id: "ALT-0887", time: "16:10:22", type: "Anomalous Traffic", source: "192.168.1.77", severity: "medium", status: "alert-only", aiScore: 55 },
  { id: "ALT-0886", time: "16:02:41", type: "Failed Auth x50", source: "203.0.113.42", severity: "high", status: "blocked", aiScore: 87 },
];
 
export const severityDist = [
  { name: "Critical", value: 23, color: "#E24B4A" },
  { name: "High", value: 41, color: "#EF9F27" },
  { name: "Medium", value: 89, color: "#378ADD" },
  { name: "Low", value: 134, color: "#1D9E75" },
];
 
export const endpointActivity = [
  { name: "SRV-01", alerts: 34 },
  { name: "SRV-02", alerts: 12 },
  { name: "WS-014", alerts: 28 },
  { name: "WS-022", alerts: 7 },
  { name: "SRV-03", alerts: 45 },
  { name: "DB-01", alerts: 19 },
  { name: "FW-01", alerts: 8 },
];
 
export const activeResponses = [
  { time: "16:42", action: "IP Blocked", target: "192.168.45.201", trigger: "Brute Force", status: "success" },
  { time: "16:38", action: "Monitor Mode", target: "10.0.12.55", trigger: "Suspicious Login", status: "active" },
  { time: "16:31", action: "IP Blocked", target: "172.16.8.100", trigger: "Port Scan", status: "success" },
  { time: "16:24", action: "IP Blocked", target: "10.0.0.88", trigger: "Privilege Escalation", status: "success" },
];
 
export const endpoints = [
  { name: "SRV-01", ip: "10.0.0.10", os: "Ubuntu 22.04", status: "online", alerts: 34, agent: "4.8.0", lastSeen: "Just now" },
  { name: "SRV-02", ip: "10.0.0.11", os: "CentOS 8", status: "online", alerts: 12, agent: "4.8.0", lastSeen: "2m ago" },
  { name: "SRV-03", ip: "10.0.0.12", os: "Debian 11", status: "warning", alerts: 45, agent: "4.7.2", lastSeen: "5m ago" },
  { name: "DB-01", ip: "10.0.0.20", os: "Ubuntu 22.04", status: "online", alerts: 19, agent: "4.8.0", lastSeen: "1m ago" },
  { name: "WS-014", ip: "192.168.1.14", os: "Windows 11", status: "online", alerts: 28, agent: "4.8.0", lastSeen: "Just now" },
  { name: "WS-022", ip: "192.168.1.22", os: "Windows 10", status: "offline", alerts: 7, agent: "4.6.0", lastSeen: "1h ago" },
  { name: "FW-01", ip: "10.0.0.1", os: "pfSense 2.7", status: "online", alerts: 8, agent: "4.8.0", lastSeen: "Just now" },
];
 
export const incidents = [
  { id: "INC-0041", title: "Brute Force Attack on SRV-01", severity: "critical", status: "investigating", created: "16:42", analyst: "SA" },
  { id: "INC-0040", title: "Lateral Movement Detected", severity: "critical", status: "open", created: "16:17", analyst: "-" },
  { id: "INC-0039", title: "Privilege Escalation - deploy user", severity: "high", status: "resolved", created: "14:55", analyst: "SA" },
  { id: "INC-0038", title: "Suspicious Login from Unknown IP", severity: "high", status: "open", created: "13:30", analyst: "-" },
  { id: "INC-0037", title: "Port Scan Wave", severity: "medium", status: "closed", created: "11:10", analyst: "SA" },
];
 