import React, { useState } from 'react';
import './TimelineEditor.css';

function TimelineEditor({ captions, onUpdateCaptions, onEditCaption }) {
  const handleDrag = (index, newStart) => {
    const updated = [...captions];
    updated[index].start = Math.max(0, newStart);
    onUpdateCaptions(updated);
  };

  const handleResize = (index, newEnd) => {
    const updated = [...captions];
    updated[index].end = Math.max(updated[index].start + 0.1, newEnd);
    onUpdateCaptions(updated);
  };

  return (
    <div className="timeline-editor">
      {captions.map((caption, index) => (
        <div
          key={index}
          className="timeline-bar"
          style={{
            left: `${caption.start * 10}px`,
            width: `${(caption.end - caption.start) * 10}px`,
            backgroundColor: caption.color || '#4CAF50',
          }}
          draggable
          onDragEnd={(e) =>
            handleDrag(index, e.clientX / 10)
          }
          onDoubleClick={() => onEditCaption(index)}
        >
          {caption.text}
          <div
            className="resize-handle"
            onMouseDown={(e) => {
              const startX = e.clientX;
              const onMouseMove = (moveEvent) => {
                handleResize(index, caption.end + (moveEvent.clientX - startX) / 10);
              };
              const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
              };
              document.addEventListener('mousemove', onMouseMove);
              document.addEventListener('mouseup', onMouseUp);
            }}
          ></div>
        </div>
      ))}
    </div>
  );
}

export default TimelineEditor;
