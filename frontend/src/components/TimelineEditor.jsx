import React, { useState } from 'react';

const TimelineEditor = () => {
  const [captions, setCaptions] = useState([]);

  const handleAddCaption = () => {
    setCaptions([...captions, { start: 0, end: 5, text: 'New Caption' }]);
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>🕑 Timeline Editor</h2>
      <button onClick={handleAddCaption}>+ Add Caption</button>
      <ul>
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
