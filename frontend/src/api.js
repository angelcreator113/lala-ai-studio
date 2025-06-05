const API_URL = 'http://localhost:3000/api';

export async function saveCaptions(captions) {
  const response = await fetch(`${API_URL}/captions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ captions })
  });
  return response.json();
}

export async function exportCaptions() {
  window.open(`${API_URL}/export`);
}
