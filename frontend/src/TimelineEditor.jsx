import React, { useState } from "react";
import "./TimelineEditor.css";

function TimelineEditor() {
  const [videoFile, setVideoFile] = useState(null);
  const [captions, setCaptions] = useState([]);

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleGenerateCaptions = async () => {
    if (!videoFile) {
      alert("Please upload a video first!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/captions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoName: videoFile.name }),
      });

      const data = await response.json();
      setCaptions(data.captions);
    } catch (error) {
      console.error("Failed to generate captions:", error);
      alert("Failed to generate captions.");
    }
  };

  const handleSaveCaptions = () => {
    console.log("Saving captions...", captions);
    alert("Captions saved locally (mock).");
  };

  const handleExportCaptions = () => {
    const exportText = captions.map(
      (cap, idx) => `${idx + 1}\n${cap.start} --> ${cap.end}\n${cap.text}\n`
    ).join("\n");

    const blob = new Blob([exportText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "captions.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <h1>Lala AI Studio 🎬 🚀</h1>

      <input type="file" accept="video/*" onChange={handleVideoChange} />

      {videoFile && (
        <video controls>
          <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <div className="button-row">
        <button onClick={handleGenerateCaptions}>🚀 Generate AI Captions</button>
        <button onClick={handleSaveCaptions}>💾 Save Captions</button>
        <button onClick={handleExportCaptions}>📥 Export Captions</button>
      </div>

      <div className="captions-list">
        <h3>📝 Captions:</h3>
        {captions.length === 0 && <p>No captions yet.</p>}
        <ul>
          {captions.map((cap, idx) => (
            <li key={idx}>
              [{cap.start}s - {cap.end}s] {cap.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TimelineEditor;
