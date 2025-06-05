import React, { useState, useRef, useEffect } from 'react';
import TimelineEditor from './components/TimelineEditor';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [captions, setCaptions] = useState([]);
  const [currentCaption, setCurrentCaption] = useState('');
  const videoRef = useRef(null);

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setCaptions([]); // reset captions if new video
    }
  };

  const handleUploadCaptions = (uploadedCaptions) => {
    setCaptions(uploadedCaptions);
  };

  const handleTimeUpdate = () => {
    const currentTime = videoRef.current?.currentTime || 0;
    const activeCaption = captions.find(
      (cap) => currentTime >= cap.start && currentTime <= cap.end
    );
    setCurrentCaption(activeCaption ? activeCaption.text : '');
  };

  useEffect(() => {
    // Reset currentCaption when captions change
    setCurrentCaption('');
  }, [captions]);

  return (
    <div className="app-container">
      <h1>🎬 Lala AI Studio - Timeline + Captions 🚀</h1>
      <input type="file" accept="video/*" onChange={handleVideoChange} />
      
      {videoUrl && (
        <div style={{ position: 'relative', marginTop: '1rem' }}>
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            width="640"
            height="360"
            onTimeUpdate={handleTimeUpdate}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '60px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'yellow',
              fontSize: '20px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '4px 8px',
              borderRadius: '4px',
              minWidth: '300px',
              textAlign: 'center',
            }}
          >
            {currentCaption}
          </div>
        </div>
      )}

      <TimelineEditor onUpload={handleUploadCaptions} />
    </div>
  );
}

export default App;
