export async function sendEcho(message) {
  const response = await fetch('/api/echo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();
  return data;
}

export async function autoCaption(videoFile) {
  const formData = new FormData();
  formData.append('video', videoFile);

  const response = await fetch('/api/auto-caption', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to auto-caption video.');
  }

  const data = await response.json();
  return data.captions;
}
