// Echo test API
export async function sendEcho(message) {
  const response = await fetch('/api/echo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error('Echo API call failed');
  }

  return await response.json();
}

// Generate captions API
export async function generateCaptions(videoUrl) {
  const response = await fetch('/api/generate-captions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ videoUrl }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate captions');
  }

  return await response.json();
}
