import React, { useState } from 'react';
import TimelineEditor from './TimelineEditor';
import VideoPlayer from './VideoPlayer';
import { saveCaptions, exportCaptions } from './api';

function App() {
  const [captions, setCaptions] = useState([]);

  const handleSave = async () => {
    await saveCaptions(captions);
    alert('Captions saved! 🚀');
  };

  const handleExport = () => {
    exportCaptions();
  };

  return (
    <div className="app-container">
      <h1>Lala AI Studio 🚀 Phase 11</h1>
      <VideoPlayer captions={captions} />
      <TimelineEditor captions={captions} setCaptions={setCaptions} />
      <button onClick={handleSave}>💾 Save Captions</button>
      <button onClick={handleExport}>📤 Export Captions</button>
    </div>
  );
}

export default App;
