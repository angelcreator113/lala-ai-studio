import React, { useState, useEffect, useRef } from "react";
import "./TimelineEditor.css";

function TimelineEditor({ projectData, onProjectDataChange }) {
  const [videoFile, setVideoFile] = useState("");
  const [draggingCaptionIndex, setDraggingCaptionIndex] = useState(null);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onProjectDataChange({ ...projectData, videoUrl: url });
    }
  };

  const handleGenerateCaptions = async () => {
    const response = await fetch("http://localhost:3000/api/captions/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const data = await response.json();
    onProjectDataChange({ ...projectData, captions: data.captions });
  };

  const handleImproveCaptions = async () => {
    const response = await fetch("http://localhost:3000/api/captions/improve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ captions: projectData.captions }),
    });
    const data = await response.json();
    onProjectDataChange({ ...projectData, captions: data.captions });
  };

  const handleSaveProject = () => {
    localStorage.setItem("lala_project", JSON.stringify(projectData));
    alert("Project saved!");
  };

  const handleLoadProject = () => {
    const saved = localStorage.getItem("lala_project");
    if (saved) {
      onProjectDataChange(JSON.parse(saved));
    } else {
      alert("No saved project found.");
    }
  };

  const handleDragStart = (index) => {
    setDraggingCaptionIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    if (draggingCaptionIndex === null) return;
    const updatedCaptions = [...projectData.captions];
    const [movedCaption] = updatedCaptions.splice(draggingCaptionIndex, 1);
    updatedCaptions.splice(index, 0, movedCaption);
    onProjectDataChange({ ...projectData, captions: updatedCaptions });
    setDraggingCaptionIndex(null);
  };

  return (
    <div className="timeline-editor">
      <div className="controls">
        <input type="file" accept="video/*" onChange={handleVideoUpload} />
        <button onClick={handleGenerateCaptions}>Generate AI Captions 🚀</button>
        <button onClick={handleImproveCaptions}>Improve AI Captions ✨</button>
        <button onClick={handleSaveProject}>Save Project 💾</button>
        <button onClick={handleLoadProject}>Load Project 📂</button>
      </div>

      {projectData.videoUrl && (
        <div className="video-preview">
          <video src={projectData.videoUrl} controls width="640" />
          <div className="caption-overlay">
            {projectData.captions.map((cap, index) => (
              <div key={index} className="caption-text">
                {cap.text}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="timeline">
        {projectData.captions.map((cap, index) => (
          <div
            key={index}
            className="caption-bar"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
          >
            <input
              type="number"
              value={cap.start}
              step="0.1"
              onChange={(e) => {
                const updated = [...projectData.captions];
                updated[index].start = parseFloat(e.target.value);
                onProjectDataChange({ ...projectData, captions: updated });
              }}
            />
            <input
              type="number"
              value={cap.end}
              step="0.1"
              onChange={(e) => {
                const updated = [...projectData.captions];
                updated[index].end = parseFloat(e.target.value);
                onProjectDataChange({ ...projectData, captions: updated });
              }}
            />
            <input
              type="text"
              value={cap.text}
              onChange={(e) => {
                const updated = [...projectData.captions];
                updated[index].text = e.target.value;
                onProjectDataChange({ ...projectData, captions: updated });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimelineEditor;
