import React from 'react';

function TimelineEditor({ captions, setCaptions }) {
  const handleChange = (index, field, value) => {
    const updated = [...captions];
    updated[index][field] = value;
    setCaptions(updated);
  };

  const handleEffectChange = (index, effect, value) => {
    const updated = [...captions];
    updated[index].effects = { ...updated[index].effects, [effect]: value };
    setCaptions(updated);
  };

  const addCaption = () => {
    setCaptions([
      ...captions,
      { start: 0, end: 1, text: 'New Caption', effects: { fade: false, color: '#ffffff', scale: 1.0 } }
    ]);
  };

  const deleteCaption = (index) => {
    const updated = captions.filter((_, i) => i !== index);
    setCaptions(updated);
  };

  return (
    <div className="timeline-editor">
      <h2>🎬 Timeline Editor (Phase 11 🚀)</h2>
      {captions.map((caption, index) => (
        <div key={index} style={{ border: '1px solid #ccc', margin: '5px', padding: '5px' }}>
          <div>
            <label>Start:</label>
            <input
              type="number"
              value={caption.start}
              step="0.1"
              onChange={(e) => handleChange(index, 'start', parseFloat(e.target.value))}
            />
            <label>End:</label>
            <input
              type="number"
              value={caption.end}
              step="0.1"
              onChange={(e) => handleChange(index, 'end', parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label>Text:</label>
            <input
              type="text"
              value={caption.text}
              onChange={(e) => handleChange(index, 'text', e.target.value)}
            />
          </div>
          <div>
            <label>Fade:</label>
            <input
              type="checkbox"
              checked={caption.effects?.fade || false}
              onChange={(e) => handleEffectChange(index, 'fade', e.target.checked)}
            />
            <label>Color:</label>
            <input
              type="color"
              value={caption.effects?.color || '#ffffff'}
              onChange={(e) => handleEffectChange(index, 'color', e.target.value)}
            />
            <label>Scale:</label>
            <input
              type="number"
              step="0.1"
              value={caption.effects?.scale || 1.0}
              onChange={(e) => handleEffectChange(index, 'scale', parseFloat(e.target.value))}
            />
          </div>
          <button onClick={() => deleteCaption(index)}>❌ Delete</button>
        </div>
      ))}
      <button onClick={addCaption}>➕ Add Caption</button>
    </div>
  );
}

export default TimelineEditor;
