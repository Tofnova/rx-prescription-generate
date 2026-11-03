import { useCallback, useEffect, useState } from "react";
import api from "../../api/api.json";

// Dashboard er jonno ek shathe sob table load kore (apnar useRestApi er same API/URL)
const TABLES = ["users", "patient_records", "medicine", "category"];
const url = (t) =>
  `${api.request}://${api.server}${api.getPath}?${new URLSearchParams({ key: api.apikey, get: t })}`;
const arr = (x) => (Array.isArray(x) ? x : []);

export function useClinicData() {
  const [state, setState] = useState({ loading: true, error: null, data: null });

  const load = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await Promise.all(
        TABLES.map(async (t) => {
          const r = await fetch(url(t));
          if (!r.ok) throw new Error(`${t}: HTTP ${r.status}`);
          return arr(await r.json());
        })
      );
      const [users, records, medicine, category] = res;
      setState({ loading: false, error: null, data: { users, records, medicine, category } });
    } catch (e) {
      setState({ loading: false, error: e.message, data: null });
    }
  }, []);

  useEffect(() => { load(); }, [load]);
  return { ...state, reload: load };
}
