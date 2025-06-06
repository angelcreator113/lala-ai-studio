import React from 'react';
import { generateCaptions, refineCaptions } from './api';

function AssistantPanel({ videoUrl, setCaptions, aiStatus, setAIStatus }) {
  const handleGenerateCaptions = async () => {
    if (!videoUrl) return;
    setAIStatus('Generating captions... ⏳');
    const result = await generateCaptions(videoUrl);
    setCaptions(result);
    setAIStatus('Captions generated ✅');
  };

  const handleRefineCaptions = async () => {
    if (!videoUrl) return;
    setAIStatus('Refining captions... ⏳');
    const result = await refineCaptions(videoUrl);
    setCaptions(result);
    setAIStatus('Captions refined ✅');
  };

  return (
    <div className="assistant-panel">
      <h2>AI Assistants 🤖</h2>
      <button onClick={handleGenerateCaptions}>Auto-Generate Captions</button>
      <button onClick={handleRefineCaptions}>Smart Suggestions</button>
      <p>Status: {aiStatus}</p>
    </div>
  );
}

export default AssistantPanel;
