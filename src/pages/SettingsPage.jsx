import { useState } from "react";


const SectionCard = ({ title, sub, children }) => (
  <div style={{ background: "#fff", border: "0.5px solid #E8E6DF", borderRadius: 12, overflow: "hidden" }}>
    <div style={{ padding: "16px 24px", borderBottom: "0.5px solid #F1EFE8" }}>
      <p style={{ fontWeight: 500, fontSize: 14, color: "#2C2C2A", margin: 0 }}>{title}</p>
      {sub && <p style={{ fontSize: 12, color: "#888780", margin: "3px 0 0" }}>{sub}</p>}
    </div>
    <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
      {children}
    </div>
  </div>
);

const Field = ({ label, hint, children }) => (
  <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 16, alignItems: "start" }}>
    <div>
      <p style={{ fontSize: 13, fontWeight: 500, color: "#2C2C2A", margin: 0 }}>{label}</p>
      {hint && <p style={{ fontSize: 11, color: "#888780", margin: "3px 0 0", lineHeight: 1.5 }}>{hint}</p>}
    </div>
    <div>{children}</div>
  </div>
);

const TextInput = ({ value, onChange, placeholder, mono = false, disabled = false }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    style={{
      width: "100%",
      padding: "8px 12px",
      fontSize: 13,
      border: "0.5px solid #E8E6DF",
      borderRadius: 8,
      outline: "none",
      color: disabled ? "#888780" : "#2C2C2A",
      background: disabled ? "#F9F8F5" : "#fff",
      fontFamily: mono ? "monospace" : "inherit",
      boxSizing: "border-box",
    }}
  />
);

const Toggle = ({ enabled, onToggle, label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <div
      onClick={onToggle}
      style={{
        width: 36, height: 20, borderRadius: 10,
        background: enabled ? "#378ADD" : "#E8E6DF",
        position: "relative", cursor: "pointer",
        transition: "background 0.2s",
        flexShrink: 0,
      }}
    >
      <div style={{
        width: 14, height: 14, borderRadius: "50%", background: "#fff",
        position: "absolute", top: 3,
        left: enabled ? 19 : 3,
        transition: "left 0.2s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />
    </div>
    {label && <span style={{ fontSize: 13, color: "#2C2C2A" }}>{label}</span>}
  </div>
);

const SaveButton = ({ onClick }) => (
  <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 4 }}>
    <button
      onClick={onClick}
      style={{
        padding: "8px 24px", fontSize: 13, fontWeight: 500,
        background: "#378ADD", color: "#fff",
        border: "none", borderRadius: 8, cursor: "pointer",
      }}
    >
      Simpan
    </button>
  </div>
);

// ── Main Page ──────────────────────────────────────────────────────────────────
const SettingsPage = () => {
  // Wazuh
  const [wazuhUrl,   setWazuhUrl]   = useState("https://wazuh.internal:55000");
  const [wazuhUser,  setWazuhUser]  = useState("wazuh-admin");
  const [wazuhPass,  setWazuhPass]  = useState("");
  const [wazuhStatus, setWazuhStatus] = useState("connected"); // connected | error | testing

  // Notification
  const [emailNotif,   setEmailNotif]   = useState(true);
  const [slackNotif,   setSlackNotif]   = useState(false);
  const [slackWebhook, setSlackWebhook] = useState("");
  const [notifEmail,   setNotifEmail]   = useState("soc@arganix.id");

  // AI
  const [aiEnabled,    setAiEnabled]    = useState(true);
  const [aiAutoBlock,  setAiAutoBlock]  = useState(true);
  const [aiThreshold,  setAiThreshold]  = useState("80");
  const [aiModel,      setAiModel]      = useState("gemma-4-9b");

  // General
  const [orgName,      setOrgName]      = useState("ARGANIX Security Team");
  const [timezone,     setTimezone]     = useState("Asia/Jakarta");
  const [sessionTTL,   setSessionTTL]   = useState("480");

  const handleTestWazuh = () => {
    setWazuhStatus("testing");
    setTimeout(() => setWazuhStatus("connected"), 1500);
  };

  const handleSave = (section) => {
    alert(`Pengaturan ${section} disimpan.\n\nIntegrasikan dengan: PUT /api/settings/${section.toLowerCase()}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 860 }}>

      {/* ── Wazuh Integration ── */}
      <SectionCard
        title="Integrasi Wazuh SIEM"
        sub="Koneksi ke Wazuh manager untuk menerima alert dan mengirim active response"
      >
        <Field label="Wazuh API URL" hint="URL endpoint Wazuh REST API">
          <TextInput value={wazuhUrl} onChange={(e) => setWazuhUrl(e.target.value)} mono />
        </Field>
        <Field label="Username">
          <TextInput value={wazuhUser} onChange={(e) => setWazuhUser(e.target.value)} />
        </Field>
        <Field label="Password">
          <input
            type="password"
            value={wazuhPass}
            onChange={(e) => setWazuhPass(e.target.value)}
            placeholder="••••••••"
            style={{ width: "100%", padding: "8px 12px", fontSize: 13, border: "0.5px solid #E8E6DF", borderRadius: 8, outline: "none", boxSizing: "border-box" }}
          />
        </Field>

        {/* Connection status */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: wazuhStatus === "connected" ? "#1D9E75" : wazuhStatus === "error" ? "#E24B4A" : "#EF9F27",
              boxShadow: wazuhStatus === "connected" ? "0 0 6px #1D9E75" : "none",
            }} />
            <span style={{ fontSize: 12, color: "#5F5E5A" }}>
              {wazuhStatus === "connected" ? "Connected" : wazuhStatus === "error" ? "Connection Error" : "Testing..."}
            </span>
          </div>
          <button
            onClick={handleTestWazuh}
            style={{ padding: "5px 14px", fontSize: 11, border: "0.5px solid #E8E6DF", borderRadius: 6, background: "#F9F8F5", cursor: "pointer", color: "#5F5E5A" }}
          >
            Test Connection
          </button>
        </div>

        <SaveButton onClick={() => handleSave("Wazuh")} />
      </SectionCard>

      {/* ── AI Engine ── */}
      <SectionCard
        title="AI Analysis Engine"
        sub="Konfigurasi Gemma 4 untuk deteksi dan analisis ancaman otomatis"
      >
        <Field label="AI Engine" hint="Aktifkan analisis AI untuk setiap alert masuk">
          <Toggle enabled={aiEnabled} onToggle={() => setAiEnabled(!aiEnabled)} label={aiEnabled ? "Aktif" : "Nonaktif"} />
        </Field>
        <Field label="Model" hint="Model AI yang digunakan untuk analisis">
          <select
            value={aiModel}
            onChange={(e) => setAiModel(e.target.value)}
            style={{ padding: "8px 12px", fontSize: 13, border: "0.5px solid #E8E6DF", borderRadius: 8, outline: "none", background: "#fff", color: "#2C2C2A" }}
          >
            <option value="gemma-4-9b">Gemma 4 9B (Default)</option>
            <option value="gemma-4-27b">Gemma 4 27B (Accurate)</option>
            <option value="gemma-3-12b">Gemma 3 12B (Fast)</option>
          </select>
        </Field>
        <Field label="Auto Block Threshold" hint="Blokir IP otomatis jika risk score AI ≥ nilai ini (0–100)">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Toggle enabled={aiAutoBlock} onToggle={() => setAiAutoBlock(!aiAutoBlock)} />
            <TextInput value={aiThreshold} onChange={(e) => setAiThreshold(e.target.value)} placeholder="80" />
          </div>
        </Field>

        <SaveButton onClick={() => handleSave("AI")} />
      </SectionCard>

      {/* ── Notifications ── */}
      <SectionCard
        title="Notifikasi"
        sub="Atur channel notifikasi untuk alert critical dan high"
      >
        <Field label="Email Notifikasi">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Toggle enabled={emailNotif} onToggle={() => setEmailNotif(!emailNotif)} label={emailNotif ? "Aktif" : "Nonaktif"} />
            {emailNotif && (
              <TextInput value={notifEmail} onChange={(e) => setNotifEmail(e.target.value)} placeholder="soc@company.id" />
            )}
          </div>
        </Field>
        <Field label="Slack Webhook">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Toggle enabled={slackNotif} onToggle={() => setSlackNotif(!slackNotif)} label={slackNotif ? "Aktif" : "Nonaktif"} />
            {slackNotif && (
              <TextInput value={slackWebhook} onChange={(e) => setSlackWebhook(e.target.value)} placeholder="https://hooks.slack.com/services/..." mono />
            )}
          </div>
        </Field>

        <SaveButton onClick={() => handleSave("Notifikasi")} />
      </SectionCard>

      {/* ── General ── */}
      <SectionCard title="Pengaturan Umum">
        <Field label="Nama Organisasi">
          <TextInput value={orgName} onChange={(e) => setOrgName(e.target.value)} />
        </Field>
        <Field label="Timezone">
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            style={{ padding: "8px 12px", fontSize: 13, border: "0.5px solid #E8E6DF", borderRadius: 8, outline: "none", background: "#fff", color: "#2C2C2A" }}
          >
            <option value="Asia/Jakarta">Asia/Jakarta (WIB, UTC+7)</option>
            <option value="Asia/Makassar">Asia/Makassar (WITA, UTC+8)</option>
            <option value="Asia/Jayapura">Asia/Jayapura (WIT, UTC+9)</option>
            <option value="UTC">UTC</option>
          </select>
        </Field>
        <Field label="Session Timeout" hint="Logout otomatis setelah idle (menit)">
          <TextInput value={sessionTTL} onChange={(e) => setSessionTTL(e.target.value)} placeholder="480" />
        </Field>

        <SaveButton onClick={() => handleSave("Umum")} />
      </SectionCard>

      {/* ── Danger Zone ── */}
      <div style={{ background: "#fff", border: "0.5px solid #F7C1C1", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", borderBottom: "0.5px solid #F7C1C1", background: "#FEFAFA" }}>
          <p style={{ fontWeight: 500, fontSize: 14, color: "#A32D2D", margin: 0 }}>Danger Zone</p>
          <p style={{ fontSize: 12, color: "#C07070", margin: "3px 0 0" }}>Tindakan irreversibel — lanjutkan dengan hati-hati</p>
        </div>
        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { label: "Hapus Semua Alert",    desc: "Hapus seluruh data alert dari database. Tidak bisa dibatalkan." },
            { label: "Reset Konfigurasi",    desc: "Kembalikan semua pengaturan ke nilai default." },
            { label: "Hapus Akun",           desc: "Hapus seluruh data organisasi secara permanen." },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#FDF9F9", borderRadius: 8, border: "0.5px solid #F7C1C1" }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, color: "#2C2C2A", margin: 0 }}>{item.label}</p>
                <p style={{ fontSize: 12, color: "#888780", margin: "2px 0 0" }}>{item.desc}</p>
              </div>
              <button
                onClick={() => alert(`Konfirmasi: ${item.label}`)}
                style={{ padding: "6px 16px", fontSize: 12, fontWeight: 500, background: "transparent", color: "#A32D2D", border: "0.5px solid #F7C1C1", borderRadius: 8, cursor: "pointer", flexShrink: 0, marginLeft: 16 }}
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SettingsPage;