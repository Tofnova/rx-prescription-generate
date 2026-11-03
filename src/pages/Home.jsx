import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaNotesMedical } from "react-icons/fa6";
import { LiaFilePrescriptionSolid } from "react-icons/lia";
import { GiMedicinePills } from "react-icons/gi";
import SiteName from "../hooks/SiteName";
import { useClinicData } from "../hooks/getjson/useClinicData";
import { Stat, Bars, Donut } from "../components/dashboard/Charts";
import Weather from "../components/wathear/Weather";
import NamazTimes from "../components/islam/NamazTimes";

const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const two = (n) => String(n).padStart(2, "0");
const parseJ = (s, f) => { try { return typeof s === "string" ? JSON.parse(s) : s ?? f; } catch { return f; } };
const clean = (s) => String(s ?? "").replace(/\u00a0/g, " ").trim();
// notes kokhono array, kokhono string (apnar form e string) – dutoi cholbe
const notesOf = (n) => (Array.isArray(n) ? n : String(n || "").split("\n")).map(clean).filter(Boolean);

function tally(list) {
  const m = {}, d = {};
  list.forEach((k) => { const o = clean(k), l = o.toLowerCase(); if (!l) return; d[l] ??= o; m[l] = (m[l] || 0) + 1; });
  return Object.entries(m).sort((a, b) => b[1] - a[1]).map(([k, n]) => [d[k], n]);
}

function Now() {
  const [t, setT] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setT(new Date()), 1000); return () => clearInterval(id); }, []);
  return (
    <div className="dNow">
      <b>{t.toLocaleTimeString("en-US")}</b>
      <span>{t.toLocaleDateString("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { loading, error, data, reload } = useClinicData();

  const s = useMemo(() => {
    if (!data) return null;
    const { users, records, medicine } = data;
    const now = new Date();
    const key = (d) => `${d.getFullYear()}-${two(d.getMonth() + 1)}`;
    const mon = {}, wd = DAYS.map((d) => [d, 0]);
    const recs = records.map((r) => {
      const [d, m, y] = String(r.date || "").split("/").map(Number);
      if (d && m && y) { mon[`${y}-${two(m)}`] = (mon[`${y}-${two(m)}`] || 0) + 1; wd[new Date(y, m - 1, d).getDay()][1]++; }
      return { ...r, _m: parseJ(r.medicineData, []), _x: parseJ(r.cc_oe_avd_xry, {}) };
    });
    const visits = {};
    recs.forEach((r) => { visits[r.userNumber] = (visits[r.userNumber] || 0) + 1; });
    const byNum = Object.fromEntries(users.map((u) => [u.number, u]));
    const today = `${two(now.getDate())}/${two(now.getMonth() + 1)}/${now.getFullYear()}`;
    const cur = mon[key(now)] || 0;
    const prev = mon[key(new Date(now.getFullYear(), now.getMonth() - 1, 1))] || 0;
    const ages = { "0–12": 0, "13–19": 0, "20–39": 0, "40–59": 0, "60+": 0 };
    users.forEach((u) => { const a = +u.age; ages[a <= 12 ? "0–12" : a <= 19 ? "13–19" : a <= 39 ? "20–39" : a <= 59 ? "40–59" : "60+"]++; });
    const g = (id) => users.filter((u) => String(u.sex) === id).length;
    return {
      patients: users.length, records: recs.length, medicines: medicine.length,
      today: recs.filter((r) => r.date === today).length, cur, prev,
      ret: users.length ? Math.round((Object.keys(visits).filter((n) => visits[n] > 1).length / users.length) * 100) : 0,
      avg: recs.length ? (recs.reduce((a, r) => a + r._m.length, 0) / recs.length).toFixed(1) : "0",
      gender: [
        { label: "Male", value: g("1"), color: "var(--blue)" },
        { label: "Female", value: g("2"), color: "var(--pink)" },
        { label: "Other", value: g("3"), color: "var(--amber)" },
      ].filter((p) => p.value > 0),
      ages: Object.entries(ages), wd,
      months: Object.entries(mon).sort().slice(-8).map(([k, n]) => { const [y, mo] = k.split("-"); return [`${MON[+mo - 1]} ${y}`, n]; }),
      meds: tally(recs.flatMap((r) => r._m.map((m) => m.medicine))).slice(0, 6),
      treat: tally(recs.flatMap((r) => notesOf(r._x?.avd?.notes))).slice(0, 6),
      recent: [...recs].sort((a, b) => b.id - a.id).slice(0, 6).map((r) => ({
        id: r.id, date: r.date, num: r.userNumber, name: byNum[r.userNumber]?.name || "—",
        cc: notesOf(r._x?.cc?.notes)[0] || "", rx: r._m.length,
      })),
    };
  }, [data]);

  const delta = s && s.prev ? `${s.cur >= s.prev ? "▲" : "▼"} ${Math.abs(Math.round(((s.cur - s.prev) / s.prev) * 100))}% vs last month` : "";
  const actions = [
    ["New prescription", "/prescription", <LiaFilePrescriptionSolid />],
    ["Add patient", "/insert/users", <FaUserPlus />],
    ["Records", "/insert/records", <FaNotesMedical />],
    ["Medicine", "/insert/medicine", <GiMedicinePills />],
  ];

  return (
    <div className="dash">
      <header className="dHead">
        <div>
          <h1><SiteName /></h1>
          <p>Dashboard</p>
        </div>
        <Now />
      </header>

      <div className="dActions">
        {actions.map(([l, to, ic]) => (
          <button key={to} onClick={() => navigate(to)}>{ic}<span>{l}</span></button>
        ))}
      </div>

      {error && (
        <div className="dCard dErr">
          <b>Data load hoy nai.</b> <span>{error}</span>
          <button onClick={reload}>Retry</button>
        </div>
      )}
      {loading && !s && <p className="dHint dCenter">Loading…</p>}

      {s && (
        <>
          <div className="dStats">
            <Stat value={s.patients} label="Patients" />
            <Stat value={s.records} label="Records" />
            <Stat value={s.today} label="Today" />
            <Stat value={s.cur} label="This month" sub={delta} />
            <Stat value={`${s.ret}%`} label="Returning patients" />
            <Stat value={s.avg} label="Avg medicines / Rx" />
          </div>

          <div className="dGrid">
            <div className="dCard"><h2>Gender</h2><Donut parts={s.gender} /></div>
            <div className="dCard"><h2>Age groups</h2><Bars items={s.ages} /></div>
            <div className="dCard"><h2>Records per month</h2><Bars items={s.months} /></div>
            <div className="dCard"><h2>Busiest weekdays</h2><Bars items={s.wd} /></div>
            <div className="dCard"><h2>Top medicines</h2><Bars items={s.meds} /></div>
            <div className="dCard"><h2>Common treatments (A/D)</h2><Bars items={s.treat} /></div>
          </div>

          <div className="dGrid two">
            <div className="dCard">
              <h2>Recent records</h2>
              {s.recent.length ? (
                <table className="dTable">
                  <thead><tr><th>Date</th><th>Patient</th><th>Complaint</th><th>Rx</th></tr></thead>
                  <tbody>
                    {s.recent.map((r) => (
                      <tr key={r.id} onClick={() => navigate("/insert/records")}>
                        <td>{r.date}</td><td>{r.name}<small>{r.num}</small></td><td>{r.cc}</td>
                        <td><span className="dPill">{r.rx}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : <p className="dHint">Kono record nai.</p>}
            </div>
            <div className="dCard"><h2>Weather</h2><Weather /></div>
          </div>
          <div className="dCard w100">
            <NamazTimes />
          </div>
          <p className="dFoot">Software Developed by NDSQL — www.ndsql.top</p>
        </>
      )}
    </div>
  );
}
