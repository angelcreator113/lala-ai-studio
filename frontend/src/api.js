export async function uploadCaptions(captions) {
  const response = await fetch('/api/upload-captions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ captions }),
  });

  if (!response.ok) {
    throw new Error('Failed to upload captions');
  }

  return await response.json();
}
