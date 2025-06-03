// frontend/src/App.jsx
import { useState } from 'react';
import './App.css'; // optional, if you want to style it

function App() {
  const [message, setMessage] = useState('');

  const pingApi = async () => {
    try {
      const response = await fetch('http://localhost:3000/health');
      const data = await response.text();
      setMessage(data);
    } catch (error) {
      console.error('Error pinging API:', error);
      setMessage('Error connecting to backend.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Lala AI Studio 🚀</h1>
      <button onClick={pingApi} style={{ padding: '1rem', fontSize: '1rem' }}>
        Ping Backend API
      </button>
      {message && (
        <p style={{ marginTop: '1rem', fontSize: '1.1rem', color: 'green' }}>
          Response: {message}
        </p>
      )}
    </div>
  );
}

export default App;
