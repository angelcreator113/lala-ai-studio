// src/App.jsx
import React, { useState } from 'react';
import { sendEcho } from './api';
import './App.css'; // your styles

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);

    const handleSend = async () => {
        const data = await sendEcho(input);
        setResponse(data);
    };

    return (
        <div className="app-container">
            <h1>Frontend ↔️ Backend Connector 🚀</h1>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={handleSend}>Send to Backend</button>

            {response && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Backend Response:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
