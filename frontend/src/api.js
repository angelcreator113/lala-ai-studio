const API_BASE = "http://localhost:3000/api";

export async function generateCaptions() {
  const res = await fetch(`${API_BASE}/captions/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  const data = await res.json();
  return data.captions || [];
}

export async function saveCaptions(captions) {
  await fetch(`${API_BASE}/captions/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ captions }),
  });
}

export async function exportCaptions(captions) {
  const res = await fetch(`${API_BASE}/captions/export`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ captions }),
  });
  const data = await res.json();
  return data.url;
}
