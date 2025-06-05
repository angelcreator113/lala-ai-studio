import React, { useState } from 'react';
import { autoCaption } from './api';

function TimelineEditor({ videoFile, captions, setCaptions }) {
  const handleAutoCaption = async () => {
    try {
      if (!videoFile) {
        alert('Please upload a video first.');
        return;
      }

      console.log('🚀 Sending video for AI auto-caption...');

      const newCaptions = await autoCaption(videoFile);

      console.log('🤖 Received AI captions:', newCaptions);

      setCaptions(prev => [...prev, ...newCaptions]);
    } catch (error) {
      console.error('Error auto-captioning:', error);
      alert('Failed to auto-caption.');
    }
  };

  return (
    <div>
      <h2>🕒 Timeline Editor</h2>

      <button onClick={handleAutoCaption}>🤖 Auto-Caption</button>

      <ul>
        {captions.map((cap, index) => (
          <li key={index}>
            [{cap.start} - {cap.end}] {cap.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TimelineEditor;
