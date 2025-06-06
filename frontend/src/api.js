export async function sendEcho(message) {
  const response = await fetch('http://localhost:3000/api/echo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  const data = await response.json();
  return data.response;
}

export async function saveCaptions(captions) {
  const response = await fetch('http://localhost:3000/api/save-captions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ captions }),
  });
  const data = await response.json();
  return data;
}

export async function exportCaptions() {
  const response = await fetch('http://localhost:3000/api/export-captions');
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'captions.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export async function refineCaptions(captions) {
  const response = await fetch('http://localhost:3000/api/ai-refine', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ captions }),
  });
  const data = await response.json();
  return data.captions;
}
