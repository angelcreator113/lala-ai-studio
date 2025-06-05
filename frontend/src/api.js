export async function fetchCaptions() {
  const res = await fetch('/api/captions');
  const data = await res.json();
  return data;
}

export async function saveCaptions(captions) {
  await fetch('/api/captions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(captions),
  });
}

export async function exportCaptions() {
  const res = await fetch('/api/export');
  const data = await res.json();
  return data.fileUrl;
}
