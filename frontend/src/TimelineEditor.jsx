import React, { useState } from "react";
import "./TimelineEditor.css";

function TimelineEditor() {
  const [videoFile, setVideoFile] = useState(null);
  const [captions, setCaptions] = useState([]);

  const handleVideoUpload = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleGenerateCaptions = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/captions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ video: "mock-video" }),
      });
      const data = await response.json();
      setCaptions(data.captions);
    } catch (error) {
      console.error("Error generating captions:", error);
    }
  };

  const handleCaptionChange = (index, field, value) => {
    const updated = [...captions];
    updated[index][field] = value;
    setCaptions(updated);
  };

  const handleAddCaption = () => {
    setCaptions([
      ...captions,
      { id: Date.now(), start: 0, end: 1, text: "New Caption" },
    ]);
  };

  const handleDeleteCaption = (index) => {
    const updated = [...captions];
    updated.splice(index, 1);
    setCaptions(updated);
  };

  const handleSaveProject = () => {
    localStorage.setItem("lala_project", JSON.stringify(captions));
    alert("Project saved!");
  };

  const handleLoadProject = () => {
    const saved = localStorage.getItem("lala_project");
    if (saved) {
      setCaptions(JSON.parse(saved));
    } else {
      alert("No saved project found.");
    }
  };

  return (
    <div className="timeline-editor">
      <h1>🎬 Lala AI Studio 🚀</h1>

      <h2>🎞️ Timeline Editor</h2>

      <input type="file" onChange={handleVideoUpload} />
      {videoFile && (
        <video controls src={URL.createObjectURL(videoFile)} style={{ maxWidth: "80%", margin: "1rem 0" }} />
      )}

      <button onClick={handleGenerateCaptions}>🧠 Generate AI Captions</button>
      <button onClick={handleSaveProject}>💾 Save Project</button>
      <button onClick={handleLoadProject}>📂 Load Project</button>

      <h3>📝 Captions:</h3>
      <button onClick={handleAddCaption}>➕ Add Caption</button>

      {captions.map((caption, index) => (
        <div key={caption.id} className="caption-row">
          <input
            type="number"
            value={caption.start}
            onChange={(e) => handleCaptionChange(index, "start", e.target.value)}
            step="0.1"
          />
          <input
            type="number"
            value={caption.end}
            onChange={(e) => handleCaptionChange(index, "end", e.target.value)}
            step="0.1"
          />
          <input
            type="text"
            value={caption.text}
            onChange={(e) => handleCaptionChange(index, "text", e.target.value)}
          />
          <button onClick={() => handleDeleteCaption(index)}>❌ Delete</button>
        </div>
      ))}
    </div>
  );
}

export default TimelineEditor;
