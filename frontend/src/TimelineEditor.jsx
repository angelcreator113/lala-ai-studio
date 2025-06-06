// src/TimelineEditor.jsx
import React, { useState } from "react";
import "./TimelineEditor.css";

function TimelineEditor({ projectData, onProjectDataChange }) {
  const { videoFile, captions } = projectData;

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      onProjectDataChange({ ...projectData, videoFile: URL.createObjectURL(file) });
    }
  };

  const handleGenerateCaptions = async () => {
    const res = await fetch("http://localhost:3000/api/captions/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoFile }),
    });
    const data = await res.json();
    onProjectDataChange({ ...projectData, captions: data.captions });
  };

  const handleRefineCaptions = async () => {
    const res = await fetch("http://localhost:3000/api/captions/refine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ captions }),
    });
    const data = await res.json();
    onProjectDataChange({ ...projectData, captions: data.captions });
  };

  const handleSaveProject = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projectData));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "project.json");
    dlAnchor.click();
  };

  const handleExportSRT = () => {
    const srt = captions.map((cap, i) => {
      return `${i + 1}\n${cap.start} --> ${cap.end}\n${cap.text}\n`;
    }).join("\n");
    const blob = new Blob([srt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", url);
    dlAnchor.setAttribute("download", "captions.srt");
    dlAnchor.click();
  };

  return (
    <div>
      <h2>🎞️ Timeline Editor</h2>
      <div>
        <label>
          Upload Video:
          <input type="file" onChange={handleVideoUpload} />
        </label>
      </div>

      {videoFile && (
        <div>
          <video src={videoFile} controls width="600" />
        </div>
      )}

      <h3>📝 Captions:</h3>
      <ul>
        {captions.map((cap, index) => (
          <li key={index}>
            [{cap.start} - {cap.end}] {cap.text}
          </li>
        ))}
      </ul>

      <div>
        <button onClick={handleGenerateCaptions}>✨ Generate Captions</button>
        <button onClick={handleRefineCaptions}>🔍 Refine Captions</button>
        <button onClick={handleSaveProject}>💾 Save Project (JSON)</button>
        <button onClick={handleExportSRT}>📄 Export SRT</button>
      </div>
    </div>
  );
}

export default TimelineEditor;
