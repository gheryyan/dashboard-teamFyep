// src/pages/AIAnalysisPage.jsx
import { useState } from "react";
import MetricCard from "../components/ui/MetricCard";
import SeverityBadge from "../components/ui/SeverityBadge";

const SAMPLE_ALERTS = [
  "Multiple failed SSH logins from 192.168.45.201 (50 attempts in 2 min)",
  "Unusual outbound traffic to 203.0.113.42:4444 from SRV-01",
  "Privilege escalation detected on user 'deploy' at 16:24 WIB",
];


const analysisHistory = [
  { id: "AI-0041", time: "16:42", input: "Brute Force on SSH", classification: "critical", riskScore: 96, mitre: "T1110" },
  { id: "AI-0040", time: "16:31", input: "Port Scan from 172.16.8.100", classification: "high", riskScore: 82, mitre: "T1046" },
  { id: "AI-0039", time: "15:58", input: "Anomalous outbound traffic", classification: "high", riskScore: 77, mitre: "T1071" },
  { id: "AI-0038", time: "15:20", input: "Failed Auth x50", classification: "high", riskScore: 87, mitre: "T1110" },
];

const AIAnalysisPage = () => {
  const [input, setInput] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (text) => {
    const prompt = text || input;
    if (!prompt.trim()) return;

    setAnalyzing(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `You are ARGANIX AI Security Analyst. Analyze this security alert and respond ONLY in valid JSON with no extra text or markdown.

Alert: ${prompt}

JSON format:
{
  "classification": "critical|high|medium|low",
  "mitre": "TXXXX - Technique Name",
  "riskScore": 0-100,
  "summary": "2-3 sentence incident summary",
  "recommendation": "specific actionable response",
  "confidence": 0-100,
  "indicators": ["ioc1", "ioc2", "ioc3"]
}`,
            },
          ],
        }),
      });

      const data = await response.json();
      const raw = data.content?.[0]?.text || "{}";
      const clean = raw.replace(/```json|```/g, "").trim();
      setResult(JSON.parse(clean));
    } catch (e) {
      setResult({
        classification: "high",
        mitre: "T1110 - Brute Force",
        riskScore: 78,
        summary:
          "Multiple failed authentication attempts detected suggesting a coordinated brute force attack. Pattern is consistent with automated tooling such as Hydra or Medusa targeting the SSH service on port 22.",
        recommendation:
          "Immediately block the source IP via Wazuh active response. Enable fail2ban with a threshold of 5 attempts per minute. Notify the SOC team and open a new incident.",
        confidence: 82,
        indicators: ["192.168.45.201", "port 22", "50 attempts/2min"],
      });
      setError("Menggunakan hasil fallback — pastikan API key sudah dikonfigurasi di backend.");
    }

    setAnalyzing(false);
  };

  const handleSample = (sample) => {
    setInput(sample);
    handleAnalyze(sample);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/*Metric Cards*/}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <MetricCard label="Analyses Today"   value="1,204"   color="#378ADD" />
        <MetricCard label="Avg Risk Score"   value="73.4"   color="#EF9F27" sub="High confidence" />
        <MetricCard label="Critical Threats" value="23"     color="#E24B4A" trend="up" sub="+5 from yesterday" />
        <MetricCard label="MITRE Techniques" value="8"      color="#1D9E75" sub="detected today" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16, alignItems: "start" }}>

        {/*Left Input Result*/}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/*Input Panel*/}
          <div style={{ background: "#fff", border: "0.5px solid #E8E6DF", borderRadius: 12, padding: "20px 24px" }}>
            <p style={{ fontWeight: 500, fontSize: 14, color: "#2C2C2A", margin: "0 0 2px" }}>
              Gemma 4 AI Analysis Engine
            </p>
            <p style={{ fontSize: 12, color: "#888780", margin: "0 0 16px" }}>
              Paste alert log atau deskripsi event untuk analisis AI
            </p>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Contoh: Multiple failed SSH logins from 192.168.45.201 (50 attempts in 2 minutes)..."
              style={{
                width: "100%",
                minHeight: 90,
                padding: "10px 14px",
                fontSize: 13,
                border: "0.5px solid #E8E6DF",
                borderRadius: 8,
                resize: "vertical",
                fontFamily: "monospace",
                color: "#2C2C2A",
                background: "#F9F8F5",
                boxSizing: "border-box",
                outline: "none",
              }}
            />

            {/* Sample buttons + Analyze */}
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#888780" }}>Contoh:</span>
              {SAMPLE_ALERTS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSample(s)}
                  style={{
                    padding: "5px 12px", fontSize: 11,
                    border: "0.5px solid #B5D4F4", borderRadius: 6,
                    background: "#E6F1FB", color: "#185FA5", cursor: "pointer",
                  }}
                >
                  Sample {i + 1}
                </button>
              ))}
              <div style={{ flex: 1 }} />
              <button
                onClick={() => handleAnalyze()}
                disabled={!input.trim() || analyzing}
                style={{
                  padding: "8px 20px", fontSize: 12, fontWeight: 500,
                  background: !input.trim() || analyzing ? "#C8D8EA" : "#378ADD",
                  color: "#fff", border: "none", borderRadius: 8,
                  cursor: !input.trim() || analyzing ? "not-allowed" : "pointer",
                  transition: "background 0.2s",
                }}
              >
                {analyzing ? "Analyzing..." : "✦ Analyze"}
              </button>
            </div>
          </div>

          {/* Loading */}
          {analyzing && (
            <div style={{
              background: "#fff", border: "0.5px solid #E8E6DF", borderRadius: 12,
              padding: "32px", textAlign: "center",
            }}>
              <div style={{ fontSize: 28, marginBottom: 10, animation: "spin 2s linear infinite" }}>✦</div>
              <p style={{ color: "#888780", fontSize: 14, margin: 0 }}>Gemma 4 menganalisis threat pattern...</p>
              <p style={{ color: "#B4B2A9", fontSize: 12, marginTop: 4 }}>MITRE ATT&CK mapping · Risk scoring · IOC extraction</p>
            </div>
          )}

          {/* Error notice */}
          {error && !analyzing && (
            <div style={{ background: "#FAEEDA", border: "0.5px solid #FAC775", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#854F0B" }}>
              ⚠ {error}
            </div>
          )}

          {/* Result */}
          {result && !analyzing && (
            <div style={{ background: "#fff", border: "0.5px solid #E8E6DF", borderRadius: 12, padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span>✦</span>
                <p style={{ fontWeight: 500, fontSize: 14, color: "#2C2C2A", margin: 0 }}>Hasil Analisis AI</p>
                <SeverityBadge level={result.classification?.toLowerCase() || "high"} />
              </div>

              {/* Score grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
                <div style={{ background: "#F9F8F5", borderRadius: 8, padding: "12px 16px" }}>
                  <p style={{ fontSize: 11, color: "#888780", margin: "0 0 4px" }}>Risk Score</p>
                  <p style={{ fontSize: 26, fontWeight: 600, color: "#E24B4A", margin: 0 }}>{result.riskScore}</p>
                  <div style={{ height: 4, background: "#E8E6DF", borderRadius: 2, marginTop: 8 }}>
                    <div style={{ width: `${result.riskScore}%`, height: "100%", background: "#E24B4A", borderRadius: 2 }} />
                  </div>
                </div>
                <div style={{ background: "#F9F8F5", borderRadius: 8, padding: "12px 16px" }}>
                  <p style={{ fontSize: 11, color: "#888780", margin: "0 0 6px" }}>MITRE Technique</p>
                  <p style={{ fontSize: 13, fontWeight: 500, color: "#2C2C2A", margin: 0, fontFamily: "monospace" }}>{result.mitre}</p>
                </div>
                <div style={{ background: "#F9F8F5", borderRadius: 8, padding: "12px 16px" }}>
                  <p style={{ fontSize: 11, color: "#888780", margin: "0 0 4px" }}>Confidence</p>
                  <p style={{ fontSize: 26, fontWeight: 600, color: "#1D9E75", margin: 0 }}>{result.confidence}%</p>
                </div>
              </div>

              {/* Summary */}
              <div style={{ marginBottom: 12 }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: "#5F5E5A", margin: "0 0 6px" }}>Incident Summary</p>
                <p style={{
                  fontSize: 13, color: "#2C2C2A", background: "#F9F8F5",
                  padding: "12px 14px", borderRadius: 8, margin: 0, lineHeight: 1.7,
                }}>
                  {result.summary}
                </p>
              </div>

              {/* IOC */}
              {result.indicators?.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: 12, fontWeight: 500, color: "#5F5E5A", margin: "0 0 6px" }}>Indicators of Compromise (IOC)</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {result.indicators.map((ioc, i) => (
                      <span key={i} style={{
                        padding: "3px 10px", borderRadius: 4, fontSize: 11,
                        background: "#F1EFE8", color: "#2C2C2A", fontFamily: "monospace",
                        border: "0.5px solid #E8E6DF",
                      }}>
                        {ioc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendation */}
              <div style={{ background: "#EAF3DE", border: "0.5px solid #C0DD97", borderRadius: 8, padding: "12px 14px" }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: "#3B6D11", margin: "0 0 4px" }}>⚡ Recommended Response</p>
                <p style={{ fontSize: 13, color: "#27500A", margin: 0, lineHeight: 1.7 }}>{result.recommendation}</p>
              </div>
            </div>
          )}
        </div>

        {/* ── Right: History ── */}
        <div style={{ background: "#fff", border: "0.5px solid #E8E6DF", borderRadius: 12, padding: "20px 24px" }}>
          <p style={{ fontWeight: 500, fontSize: 14, color: "#2C2C2A", margin: "0 0 16px" }}>Riwayat Analisis</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {analysisHistory.map((h) => (
              <div key={h.id} style={{
                padding: "12px", background: "#F9F8F5", borderRadius: 8,
                border: "0.5px solid #F1EFE8",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontFamily: "monospace", fontSize: 11, color: "#185FA5" }}>{h.id}</span>
                  <SeverityBadge level={h.classification} />
                </div>
                <p style={{ fontSize: 12, color: "#2C2C2A", margin: "0 0 4px", fontWeight: 500 }}>{h.input}</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, color: "#888780", fontFamily: "monospace" }}>{h.mitre}</span>
                  <span style={{ fontSize: 11, color: "#888780" }}>Score: {h.riskScore} · {h.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIAnalysisPage;