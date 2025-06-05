// frontend/components/TimelineEditor.jsx

import React, { useState, useEffect } from 'react';

const TimelineEditor = ({ videoRef, captions, setCaptions }) => {
  const [selectedCaption, setSelectedCaption] = useState(null);

  useEffect(() => {
    const handleTimeUpdate = () => {
      const currentTime = videoRef.current?.currentTime || 0;
      const activeCaption = captions.find(
        (cap) => currentTime >= cap.start && currentTime <= cap.end
      );
      setSelectedCaption(activeCaption ? activeCaption.id : null);
    };

    const video = videoRef.current;
    video?.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videoRef, captions]);

  const handleCaptionChange = (id, field, value) => {
    setCaptions((prev) =>
      prev.map((cap) =>
        cap.id === id ? { ...cap, [field]: value } : cap
      )
    );
  };

  const handleAddCaption = () => {
    const newCaption = {
      id: Date.now(),
      start: 0,
      end: 2,
      text: 'New caption',
    };
    setCaptions((prev) => [...prev, newCaption]);
  };

  const handleDeleteCaption = (id) => {
    setCaptions((prev) => prev.filter((cap) => cap.id !== id));
  };

  const handleSaveCaptions = async () => {
    try {
      const response = await fetch('/api/captions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ captions }),
      });

      if (response.ok) {
        alert('✅ Captions saved!');
      } else {
        alert('Failed to save captions');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving captions');
    }
  };

  const handleLoadCaptions = async () => {
    try {
      const response = await fetch('/api/captions');
      const data = await response.json();

      if (response.ok && data.captions) {
        setCaptions(data.captions);
        alert('✅ Captions loaded!');
      } else {
        alert('Failed to load captions');
      }
    } catch (err) {
      console.error(err);
      alert('Error loading captions');
    }
  };

  const handleAISuggest = async () => {
    try {
      const response = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ captions }),
      });

      const data = await response.json();

      if (response.ok && data.suggestedCaptions) {
        setCaptions(data.suggestedCaptions);
        alert('✅ AI suggestions applied!');
      } else {
        alert('Failed to apply AI suggestions');
      }
    } catch (err) {
      console.error(err);
      alert('Error applying AI suggestions');
    }
  };

  const handleExportCaptions = async () => {
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ captions }),
      });

      const data = await response.json();

      if (response.ok) {
        const link = document.createElement('a');
        link.href = data.file;
        link.download = 'captions_export.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert('✅ Captions exported!');
      } else {
        alert('Failed to export captions');
      }
    } catch (err) {
      console.error(err);
      alert('Error exporting captions');
    }
  };

  return (
    <div>
      <h3>🕒 Timeline Editor</h3>

      <button onClick={handleAddCaption}>➕ Add Caption</button>
      <button onClick={handleSaveCaptions}>💾 Save</button>
      <button onClick={handleLoadCaptions}>📂 Load</button>
      <button onClick={handleAISuggest}>🤖 AI Suggest</button>
      <button onClick={handleExportCaptions}>🚀 Export</button>

      <div style={{ marginTop: '10px' }}>
        {captions.map((cap) => (
          <div
            key={cap.id}
            style={{
              border: '1px solid #ccc',
              padding: '8px',
              marginBottom: '5px',
              backgroundColor: cap.id === selectedCaption ? '#def' : '#fff',
            }}
          >
            <label>
              Start:{' '}
              <input
                type="number"
                value={cap.start}
                onChange={(e) =>
                  handleCaptionChange(cap.id, 'start', parseFloat(e.target.value))
                }
                step="0.1"
              />
            </label>{' '}
            <label>
              End:{' '}
              <input
                type="number"
                value={cap.end}
                onChange={(e) =>
                  handleCaptionChange(cap.id, 'end', parseFloat(e.target.value))
                }
                step="0.1"
              />
            </label>{' '}
            <label>
              Text:{' '}
              <input
                type="text"
                value={cap.text}
                onChange={(e) =>
                  handleCaptionChange(cap.id, 'text', e.target.value)
                }
              />
            </label>{' '}
            <button onClick={() => handleDeleteCaption(cap.id)}>🗑️ Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineEditor;
