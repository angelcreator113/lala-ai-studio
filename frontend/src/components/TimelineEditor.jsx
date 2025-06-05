import React, { useState } from 'react';
import { generateCaptions } from '../api';

const TimelineEditor = ({ onUpload }) => {
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddCaption = () => {
    setCaptions([...captions, { start: 0, end: 5, text: 'New Caption' }]);
  };

  const handleDeleteCaption = (index) => {
    const newCaptions = captions.filter((_, i) => i !== index);
    setCaptions(newCaptions);
  };

  const handleEditCaption = (index, field, value) => {
    const updated = captions.map((cap, i) =>
      i === index ? { ...cap, [field]: value } : cap
    );
    setCaptions(updated);
  };

  const handleUploadClick = () => {
    if (onUpload) {
      onUpload(captions);
    }
  };

  const handleGenerateCaptions = async () => {
    setLoading(true);
    try {
      const result = await generateCaptions('https://example.com/video.mp4'); // placeholder
      setCaptions(result.captions);
    } catch (error) {
      console.error('Failed to generate captions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCaptions = () => {
    const blob = new Blob([JSON.stringify(captions, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'captions.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadCaptions = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const loaded = JSON.parse(e.target.result);
        setCaptions(loaded);
      } catch (error) {
        console.error('Failed to load captions:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', marginTop: '1rem' }}>
      <h2>🕑 Timeline Editor</h2>
      <button onClick={handleAddCaption}>+ Add Caption</button>
      <button onClick={handleUploadClick} style={{ marginLeft: '1rem' }}>
        🚀 Upload Captions
      </button>
      <button onClick={handleGenerateCaptions} style={{ marginLeft: '1rem' }} disabled={loading}>
        {loading ? '🤖 Generating...' : '✨ AI Generate Captions'}
      </button>
      <button onClick={handleSaveCaptions} style={{ marginLeft: '1rem' }}>
        💾 Save Captions
      </button>
      <input type="file" accept=".json" onChange={handleLoadCaptions} style={{ marginLeft: '1rem' }} />

      <ul style={{ marginTop: '1rem' }}>
        {captions.map((cap, index) => (
          <li key={index} style={{ marginBottom: '8px' }}>
            <div>
              Start:{' '}
              <input
                type="number"
                value={cap.start}
                onChange={(e) => handleEditCaption(index, 'start', parseFloat(e.target.value))}
                style={{ width: '60px' }}
              />{' '}
              End:{' '}
              <input
                type="number"
                value={cap.end}
                onChange={(e) => handleEditCaption(index, 'end', parseFloat(e.target.value))}
                style={{ width: '60px' }}
              />{' '}
              Text:{' '}
              <input
                type="text"
                value={cap.text}
                onChange={(e) => handleEditCaption(index, 'text', e.target.value)}
                style={{ width: '300px' }}
              />{' '}
              <button onClick={() => handleDeleteCaption(index)} style={{ marginLeft: '0.5rem' }}>
                ❌ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimelineEditor;
