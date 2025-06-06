import React from 'react';

function TimelineEditor({ captions, onUpdateCaptions, selectedId, setSelectedId }) {
  return (
    <div style={{ border: '1px solid gray', padding: '10px', height: '100px', overflowX: 'auto', whiteSpace: 'nowrap', position: 'relative' }}>
      {captions.map((cap) => (
        <div
          key={cap.id}
          className={`caption-bar ${selectedId === cap.id ? 'selected' : ''}`}
          style={{
            display: 'inline-block',
            position: 'absolute',
            left: `${cap.start * 10}px`,
            width: `${(cap.end - cap.start) * 10}px`,
            height: '40px',
            background: selectedId === cap.id ? 'orange' : 'skyblue',
            border: '1px solid #333',
            cursor: 'pointer',
            padding: '2px',
          }}
          onClick={() => setSelectedId(cap.id)}
        >
          <input
            type="text"
            value={cap.text}
            onChange={(e) =>
              onUpdateCaptions(
                captions.map(c =>
                  c.id === cap.id ? { ...c, text: e.target.value } : c
                )
              )
            }
            style={{
              width: '100%',
              border: 'none',
              background: 'transparent',
              color: '#000',
              fontSize: '12px',
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default TimelineEditor;
