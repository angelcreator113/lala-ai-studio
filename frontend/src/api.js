// frontend/src/api.js

export async function generateCaptions(videoUrl) {
  try {
    const response = await fetch('http://localhost:3000/api/captions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoUrl }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate captions');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}
