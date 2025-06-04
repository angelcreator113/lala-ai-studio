// src/api.js

const BACKEND_URL = 'https://literate-garbanzo-r4xgxxj9ww472pq7g-3000.app.github.dev'; // your backend base URL

export async function sendEcho(message) {
    try {
        const response = await fetch(`${BACKEND_URL}/echo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('sendEcho failed:', error);
        return { error: error.message };
    }
}
