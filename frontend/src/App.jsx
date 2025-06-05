import React, { useState } from 'react';
import TimelineEditor from './TimelineEditor';

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [captions, setCaptions] = useState([]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      console.log('🎥 Video selected:', file.name);
    }
  };

  return (
    <div className="app-container">
      <h1>🎬 Lala AI Studio - Phase 12 🚀</h1>

      <input type="file" accept="video/*" onChange={handleVideoChange} />

      {videoFile && (
        <video controls width="600" style={{ marginTop: '20px' }}>
          <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <TimelineEditor
        videoFile={videoFile}
        captions={captions}
        setCaptions={setCaptions}
      />
    </div>
  );
}

export default App;
