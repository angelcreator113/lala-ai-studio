import React, { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import TimelineEditor from './components/TimelineEditor';

const App = () => {
  const [videoUrl, setVideoUrl] = useState('https://www.w3schools.com/html/mov_bbb.mp4');

  const handleUploadCaptions = (captions) => {
    console.log('📤 Uploading captions:', captions);
    // You can add backend POST here in future!
  };

  return (
    <div className="app-container">
      <h1>🎬 Lala AI Studio — Video + Captions 🚀</h1>
      <VideoPlayer videoUrl={videoUrl} />
      <TimelineEditor onUpload={handleUploadCaptions} />
    </div>
  );
};

export default App;
