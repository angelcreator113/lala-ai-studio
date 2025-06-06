import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import TimelineEditor from './TimelineEditor';
import { refineCaptionsAPI, exportCaptionsAPI } from './api';
import './App.css';

function App() {
  const [captions, setCaptions] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');

  const handleAddCaption = () => {
    const newCaption = { start: 0, end: 2, text: 'New caption', color: '#FFD700' };
    setCaptions([...captions, newCaption]);
  };

  const handleEditCaption = (index) => {
    const text = prompt('Edit caption:', captions[index].text);
    if (text !== null) {
      const updated = [...captions];
      updated[index].text = text;
      setCaptions(updated);
    }
  };

  const handleRefineCaptions = async () => {
    const refined = await refineCaptionsAPI(captions);
    setCaptions(refined);
  };

  const handleExportCaptions = async () => {
    await exportCaptionsAPI(captions);
    alert('Captions exported!');
  };

  return (
    <div className="app-container">
      <h1>🎬 Lala AI Studio — Phase 14 🚀</h1>
      <input
        type="text"
        placeholder="Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        style={{ width: '300px' }}
      />
      <VideoPlayer videoUrl={videoUrl} captions={captions} />
      <button onClick={handleAddCaption}>➕ Add Caption</button>
      <button onClick={handleRefineCaptions}>🤖 Refine Captions</button>
      <button onClick={handleExportCaptions}>💾 Export Captions</button>
      <TimelineEditor
        captions={captions}
        onUpdateCaptions={setCaptions}
        onEditCaption={handleEditCaption}
      />
    </div>
  );
}

export default App;
