import React, { useState, useEffect } from "react";
import "./TimelineEditor.css";

function TimelineEditor() {
  const [videoFile, setVideoFile] = useState(null);
  const [captions, setCaptions] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(URL.createObjectURL(file));
    }
  };

  const generateAICaptions = async () => {
    try {
      const response = await fetch("/api/captions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ video: "mock" }), // Replace with actual payload if needed
      });
      const data = await response.json();
      setCaptions(data.captions);
    } catch (error) {
      console.error("Error generating captions:", error);
      alert("Failed to generate captions.");
    }
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const updatedCaptions = [...captions];
    const [draggedItem] = updatedCaptions.splice(draggedIndex, 1);
    updatedCaptions.splice(index, 0, draggedItem);
    setDraggedIndex(index);
    setCaptions(updatedCaptions);
  };

  const saveProject = () => {
    const projectData = {
      captions,
      videoFile,
    };
    console.log("Saving project:", projectData);
    alert("Project saved (mock) 🚀");
  };

  return (
    <div className="timeline-editor">
      <h1>🎬 Lala AI Studio 🚀</h1>

      <div>
        <label>Upload Video: </label>
        <input type="file" accept="video/*" onChange={handleVideoUpload} />
      </div>

      {videoFile && (
        <video
          src={videoFile}
          controls
          width="600"
          style={{ margin: "20px 0" }}
        />
      )}

      <button onClick={generateAICaptions} className="btn-primary">
        🤖 Generate AI Captions
      </button>

      <h3>📝 Captions (Drag to Reorder):</h3>
      <ul className="captions-list">
        {captions.map((caption, index) => (
          <li
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => {
              e.preventDefault();
              handleDragOver(index);
            }}
            className="caption-item"
          >
            <strong>[{caption.start} - {caption.end}]</strong> {caption.text}
          </li>
        ))}
      </ul>

      <button onClick={saveProject} className="btn-secondary">
        💾 Save Project
      </button>
    </div>
  );
}

export default TimelineEditor;
