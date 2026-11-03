// src/WhatsApp.jsx
import { useEffect, useState } from "react";
import { getMessages } from "../../hooks/useWhatsApp";
import UiModiul from "../ui/UiModiul";

const fmt = (t) =>
  new Date(t.replace(" ", "T") + "Z").toLocaleString("en-GB", { timeZone: "Asia/Dhaka" });

export default function WhatsApp() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const j = await getMessages(50);
      j.success ? setRows(j.data) : setError(j.error || "Load hoyni");
    } catch (e) {
       setError(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <UiModiul>
    <div className="wa">
      <style>{css}</style>

      <div className="wa-head">
        <h2>WhatsApp Messages <span>{rows.length}</span></h2>
        <button onClick={load} disabled={loading}>
          {loading ? "Loading..." : "↻ Refresh"}
        </button>
      </div>

      {error && <div className="wa-err">{error}</div>}

      <div className="wa-card">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>To</th><th>Name</th><th>Ref</th>
              <th>Status</th><th>Error</th><th>Time</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.id}>
                <td>#{m.id}</td>
                <td>{m.to_number}</td>
                <td>{m.params?.[0]}</td>
                <td>{m.params?.[1]}</td>
                <td><b className={`badge ${m.status}`}>{m.status}</b></td>
                <td className="errx">{m.error}</td>
                <td>{fmt(m.created_at)}</td>
              </tr>
            ))}
            {!loading && !rows.length && (
              <tr><td colSpan="7" className="empty">Kono message nai</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </UiModiul>
  );
}

const css = `
.wa{max-width:1000px;margin:24px auto;padding:0 14px;font-family:system-ui,sans-serif;color:#1f2937}
.wa-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.wa-head h2{margin:0;font-size:20px;display:flex;align-items:center;gap:8px}
.wa-head h2 span{background:#e5f7ec;color:#128c3e;font-size:13px;padding:2px 10px;border-radius:99px}
.wa-head button{background:#25d366;color:#fff;border:0;padding:8px 16px;border-radius:8px;font-weight:600;cursor:pointer}
.wa-head button:disabled{opacity:.6;cursor:wait}
.wa-err{background:#fee2e2;color:#b91c1c;padding:10px 14px;border-radius:8px;margin-bottom:12px}
.wa-card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;overflow-x:auto;box-shadow:0 1px 3px rgba(0,0,0,.05)}
.wa table{width:100%;border-collapse:collapse;font-size:14px}
.wa th{background:#f9fafb;text-align:left;padding:12px;font-weight:600;color:#6b7280;white-space:nowrap}
.wa td{padding:12px;border-top:1px solid #f1f5f9;white-space:nowrap}
.wa tbody tr:hover{background:#f9fafb}
.badge{padding:3px 10px;border-radius:99px;font-size:12px;text-transform:capitalize}
.badge.sent{background:#dcfce7;color:#15803d}
.badge.failed{background:#fee2e2;color:#b91c1c}
.wa .errx{color:#b91c1c;max-width:260px;overflow:hidden;text-overflow:ellipsis}
.wa .empty{text-align:center;color:#9ca3af;padding:30px}
`;