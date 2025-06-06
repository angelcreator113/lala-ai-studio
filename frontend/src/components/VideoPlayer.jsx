import React from 'react';

function VideoPlayer({ videoUrl, captions }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <video controls width="640" src={videoUrl} style={{ border: '1px solid #ccc' }} />
      <div style={{ marginTop: '10px', textAlign: 'left' }}>
        <h3>Caption Preview:</h3>
        <ul>
          {captions.map((cap, index) => (
            <li key={index}>
              [{cap.start.toFixed(1)} - {cap.end.toFixed(1)}] {cap.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default VideoPlayer;
