// src/hooks/useWhatsApp.js
const BASE = "https://api.ndsql.top/wa_api/send";
const SECRET = "ILjd8SpFpUq7UW0oDLT719sNlj5bb9aB";

const api = (path, body) =>
  fetch(`${BASE}/${path}`, {
    method: body ? "POST" : "GET",
    headers: { "Content-Type": "application/json", "X-Api-Secret": SECRET },
    body: body && JSON.stringify(body),
  }).then((r) => r.json());

export const getMessages = (limit = 50, to = "") =>
  api(`messages.php?limit=${limit}&to=${to}`);

export const sendWA = ({ to, name, id, date }) =>
  api("send.php", { to, params: [name, id, date, id], button_param: id });









  