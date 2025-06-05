// frontend/src/App.jsx

import React, { useState, useRef } from 'react';
import TimelineEditor from './components/TimelineEditor';
import './index.css';

const App = () => {
  const videoRef = useRef(null);
  const [captions, setCaptions] = useState([]);

  return (
    <div className="app-container">
      <h1>🎬 Lala AI Studio — Phase 10 🚀</h1>

      {/* Video Player */}
      <video
        ref={videoRef}
        controls
        width="640"
        height="360"
        style={{ border: '1px solid #333', marginBottom: '20px' }}
      >
        <source src="/sample.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Captions Preview */}
      <div
        style={{
          marginBottom: '20px',
          minHeight: '40px',
          fontSize: '18px',
          color: '#333',
        }}
      >
        {(() => {
          const currentTime = videoRef.current?.currentTime || 0;
          const activeCaption = captions.find(
            (cap) => currentTime >= cap.start && currentTime <= cap.end
          );
          return activeCaption ? activeCaption.text : '';
        })()}
      </div>

      {/* Timeline Editor */}
      <TimelineEditor
        videoRef={videoRef}
        captions={captions}
        setCaptions={setCaptions}
      />
    </div>
  );
};

export default App;
