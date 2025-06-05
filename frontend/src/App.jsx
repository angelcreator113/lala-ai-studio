import React, { useState } from 'react';
import TimelineEditor from './components/TimelineEditor';
import { uploadCaptions } from './api';

function App() {
  const [uploadResult, setUploadResult] = useState(null);

  const handleUpload = async (captions) => {
    const result = await uploadCaptions(captions);
    setUploadResult(result);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎬 Lala AI Studio</h1>

      {/* Timeline Editor */}
      <TimelineEditor onUpload={handleUpload} />

      {/* Upload result */}
      {uploadResult && (
        <div style={{ marginTop: '1rem', color: 'green' }}>
          ✅ Upload Result: {uploadResult.message} (Count: {uploadResult.count})
        </div>
      )}
    </div>
  );
}

export default App;
