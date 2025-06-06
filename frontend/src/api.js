export async function refineCaptionsAPI(captions) {
  const res = await fetch('http://localhost:3000/api/refine-captions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ captions }),
  });
  const data = await res.json();
  return data.captions;
}

export async function exportCaptionsAPI(captions) {
  const res = await fetch('http://localhost:3000/api/export-captions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ captions }),
  });
  const data = await res.json();
  console.log('Export result:', data);
}
