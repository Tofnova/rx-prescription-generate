import React from "react";

export function Stat({ value, label, sub, tone }) {
  return (
    <div className={`dCard dStat ${tone || ""}`}>
      <b>{value}</b>
      <span>{label}</span>
      {sub ? <small>{sub}</small> : null}
    </div>
  );
}

// items: [[label, number], ...]
export function Bars({ items, empty = "No data" }) {
  if (!items.length) return <p className="dHint">{empty}</p>;
  const max = Math.max(1, ...items.map((i) => i[1]));
  return items.map(([l, n]) => (
    <div className="dBar" key={l}>
      <em title={l}>{l}</em>
      <div><i style={{ width: `${(n / max) * 100}%` }} /></div>
      <u>{n}</u>
    </div>
  ));
}

// parts: [{label, value, color}]
export function Donut({ parts, size = 150 }) {
  const total = parts.reduce((a, p) => a + p.value, 0);
  const r = 52, c = 2 * Math.PI * r;
  let off = 0;
  return (
    <div className="dDonut">
      <svg width={size} height={size} viewBox="0 0 140 140" role="img" aria-label="Chart">
        <circle cx="70" cy="70" r={r} fill="none" stroke="var(--tint)" strokeWidth="18" />
        {total > 0 && parts.map((p) => {
          const len = (p.value / total) * c;
          const el = (
            <circle key={p.label} cx="70" cy="70" r={r} fill="none" stroke={p.color} strokeWidth="18"
              strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-off} transform="rotate(-90 70 70)" />
          );
          off += len;
          return el;
        })}
        <text x="70" y="68" textAnchor="middle" className="dDonutNum">{total}</text>
        <text x="70" y="86" textAnchor="middle" className="dDonutLbl">Patients</text>
      </svg>
      <ul>
        {parts.map((p) => (
          <li key={p.label}><i style={{ background: p.color }} />{p.label}<b>{p.value}</b></li>
        ))}
      </ul>
    </div>
  );
}
