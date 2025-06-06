import React, { useState } from 'react';
import TimelineEditor from './components/TimelineEditor';
import { sendEcho, saveCaptions, exportCaptions, refineCaptions } from './api';
import './App.css';

function App() {
  const [captions, setCaptions] = useState([
    { id: 1, start: 0, end: 2, text: 'Hello world' },
    { id: 2, start: 3, end: 5, text: 'This is a test' },
  ]);
  const [selectedId, setSelectedId] = useState(null);
  const [echoResponse, setEchoResponse] = useState('');

  const handleEcho = async () => {
    const response = await sendEcho('Hello from frontend!');
    setEchoResponse(response);
  };

  const handleSave = async () => {
    const result = await saveCaptions(captions);
    alert('Captions saved! 🚀');
    console.log(result);
  };

  const handleExport = async () => {
    await exportCaptions();
    alert('Captions exported! 🚀');
  };

  const handleRefine = async () => {
    const refined = await refineCaptions(captions);
    setCaptions(refined);
    alert('Captions refined with AI! 🤖✨');
  };

  return (
    <div className="app-container">
      <h1>Lala AI Studio 🎬🚀</h1>
      <button onClick={handleEcho}>Send Echo 🚀</button>
      <button onClick={handleSave}>💾 Save Captions</button>
      <button onClick={handleExport}>📤 Export Captions</button>
      <button onClick={handleRefine}>🤖 AI Refine Captions</button>
      <p>Backend says: {echoResponse}</p>

      <TimelineEditor
        captions={captions}
        onUpdateCaptions={setCaptions}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
}

export default App;
