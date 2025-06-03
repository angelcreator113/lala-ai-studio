import { useEffect, useState } from 'react';

function App() {
  const [apiMessage, setApiMessage] = useState('');
  const [echoInput, setEchoInput] = useState('');
  const [echoResponse, setEchoResponse] = useState('');

  // Health check
  useEffect(() => {
    fetch('http://localhost:3000/health')
      .then((res) => res.json())
      .then((data) => setApiMessage(data.message))
      .catch(() => setApiMessage('🔴 Error connecting to backend'));
  }, []);

  // Handle Echo API call
  const sendEcho = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/echo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: echoInput }),
      });
      const data = await res.json();
      setEchoResponse(data.reply);
    } catch (err) {
      setEchoResponse('🔴 Error sending message');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Lala AI Studio Frontend 🎥🚀</h1>
      <p style={{ fontSize: '1.2rem', color: 'green' }}>
        ✅ API Status: {apiMessage}
      </p>

      <hr />

      <h2>🚀 AI Echo API Demo:</h2>
      <input
        type="text"
        value={echoInput}
        onChange={(e) => setEchoInput(e.target.value)}
        placeholder="Type a message..."
        style={{ padding: '0.5rem', width: '300px' }}
      />
      <button
        onClick={sendEcho}
        style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}
      >
        Send
      </button>

      {echoResponse && (
        <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
          Response: {echoResponse}
        </p>
      )}
    </div>
  );
}

export default App;
