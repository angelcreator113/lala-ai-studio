import React, { useState } from 'react';
import './TimelineEditor.css';

function TimelineEditor({ captions, onUpdateCaptions }) {
  const [draggedCaptionId, setDraggedCaptionId] = useState(null);

  const handleDragStart = (id) => {
    setDraggedCaptionId(id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const newStart = parseFloat(e.nativeEvent.offsetX / 5); // simple px → time mapping
    const updatedCaptions = captions.map((cap) =>
      cap.id === draggedCaptionId ? { ...cap, start: newStart } : cap
    );
    onUpdateCaptions(updatedCaptions);
    setDraggedCaptionId(null);
  };

  return (
    <div className="timeline-container">
      <div className="timeline" onDragOver={handleDragOver} onDrop={handleDrop}>
        {captions.map((caption) => (
          <div
            key={caption.id}
            className="timeline-caption"
            style={{
              left: `${caption.start * 5}px`,
              width: `${(caption.end - caption.start) * 5}px`,
            }}
            draggable
            onDragStart={() => handleDragStart(caption.id)}
          >
            {caption.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimelineEditor;
