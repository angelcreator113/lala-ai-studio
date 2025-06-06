export async function generateCaptions(videoUrl) {
  const response = await fetch('/api/ai/generate-captions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ videoUrl }),
  });
  const data = await response.json();
  return data;
}

export async function refineCaptions(videoUrl) {
  const response = await fetch('/api/ai/refine-captions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ videoUrl }),
  });
  const data = await response.json();
  return data;
}
