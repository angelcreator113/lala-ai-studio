import React, { useState } from 'react';
import { generateCaptions } from '../api';

const TimelineEditor = ({ onUpload }) => {
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddCaption = () => {
    setCaptions([...captions, { start: 0, end: 5, text: 'New Caption' }]);
  };

  const handleUploadClick = () => {
    if (onUpload) {
      onUpload(captions);
    }
  };

  const handleGenerateCaptions = async () => {
    setLoading(true);
    try {
      const result = await generateCaptions('https://example.com/video.mp4'); // Placeholder URL
      setCaptions(result.captions);
    } catch (error) {
      console.error('Failed to generate captions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>🕑 Timeline Editor</h2>
      <button onClick={handleAddCaption}>+ Add Caption</button>
      <button onClick={handleUploadClick} style={{ marginLeft: '1rem' }}>
        🚀 Upload Captions
      </button>
      <button onClick={handleGenerateCaptions} style={{ marginLeft: '1rem' }} disabled={loading}>
        {loading ? '🤖 Generating...' : '✨ AI Generate Captions'}
      </button>

      <ul style={{ marginTop: '1rem' }}>
        {captions.map((cap, index) => (
          <li key={index}>
            [{cap.start}s - {cap.end}s]: {cap.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimelineEditor;
