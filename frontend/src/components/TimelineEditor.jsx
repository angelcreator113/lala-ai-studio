import React, { useState } from 'react';
import Draggable from 'react-draggable';

function TimelineEditor({ onUpload }) {
  const [captions, setCaptions] = useState([]);
  const [editingCaption, setEditingCaption] = useState(null);
  const [editText, setEditText] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setCaptions(data);
        onUpload(data);
      } catch (err) {
        console.error('Error parsing captions:', err);
      }
    };
    reader.readAsText(file);
  };

  const handleDrag = (index, e, data) => {
    const newCaptions = [...captions];
    const newStart = Math.max(0, data.x / 10); // 1px = 0.1s
    const duration = newCaptions[index].end - newCaptions[index].start;
    newCaptions[index].start = newStart;
    newCaptions[index].end = newStart + duration;
    setCaptions(newCaptions);
    onUpload(newCaptions);
  };

  const handleResize = (index, delta) => {
    const newCaptions = [...captions];
    newCaptions[index].end = Math.max(
      newCaptions[index].start + 0.1,
      newCaptions[index].end + delta
    );
    setCaptions(newCaptions);
    onUpload(newCaptions);
  };

  const handleCaptionClick = (caption, index) => {
    setEditingCaption(index);
    setEditText(caption.text);
  };

  const handleSaveEdit = () => {
    const newCaptions = [...captions];
    newCaptions[editingCaption].text = editText;
    setCaptions(newCaptions);
    onUpload(newCaptions);
    setEditingCaption(null);
  };

  const handleAiSuggest = () => {
    // Placeholder: in real flow, call API and update captions
    alert('🚀 AI Suggest placeholder!');
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>🕒 Timeline Editor</h2>
      <input type="file" accept="application/json" onChange={handleFileChange} />

      <div style={{
        marginTop: '1rem',
        position: 'relative',
        height: '60px',
        border: '1px solid #ccc',
        overflowX: 'scroll',
        whiteSpace: 'nowrap',
      }}>
        {captions.map((caption, index) => (
          <Draggable
            key={index}
            axis="x"
            bounds="parent"
            position={{ x: caption.start * 10, y: 0 }}
            onDrag={(e, data) => handleDrag(index, e, data)}
          >
            <div
              onClick={() => handleCaptionClick(caption, index)}
              style={{
                display: 'inline-block',
                width: `${(caption.end - caption.start) * 10}px`,
                height: '40px',
                backgroundColor: '#4caf50',
                color: 'white',
                textAlign: 'center',
                lineHeight: '40px',
                margin: '10px 2px',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              {caption.text}

              {/* Simple resize handle */}
              <div
                onMouseDown={(e) => {
                  e.preventDefault();
                  const startX = e.clientX;
                  const onMouseMove = (moveEvent) => {
                    const deltaPx = moveEvent.clientX - startX;
                    const deltaSec = deltaPx / 10;
                    handleResize(index, deltaSec);
                  };
                  const onMouseUp = () => {
                    window.removeEventListener('mousemove', onMouseMove);
                    window.removeEventListener('mouseup', onMouseUp);
                  };
                  window.addEventListener('mousemove', onMouseMove);
                  window.addEventListener('mouseup', onMouseUp);
                }}
                style={{
                  position: 'absolute',
                  right: '0',
                  top: '0',
                  width: '8px',
                  height: '100%',
                  backgroundColor: '#333',
                  cursor: 'ew-resize',
                }}
              />
            </div>
          </Draggable>
        ))}
      </div>

      {editingCaption !== null && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Edit Caption</h3>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows={3}
            style={{ width: '100%' }}
          />
          <br />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setEditingCaption(null)} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        </div>
      )}

      <button onClick={handleAiSuggest} style={{ marginTop: '1rem' }}>
        🤖 AI Suggest Captions 🚀
      </button>
    </div>
  );
}

export default TimelineEditor;
