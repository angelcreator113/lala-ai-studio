import React, { useState } from "react";
import "./TimelineEditor.css";

function TimelineEditor({ projectData, onProjectDataChange }) {
  const [loading, setLoading] = useState(false);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      onProjectDataChange({
        ...projectData,
        videoFile: file.name,
      });
    }
  };

  const handleGenerateCaptions = async () => {
    if (!projectData.videoFile) {
      alert("Please upload a video first!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/captions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoFile: projectData.videoFile }),
      });

      const data = await response.json();

      if (response.ok) {
        onProjectDataChange({
          ...projectData,
          captions: data.captions,
        });
      } else {
        alert("Failed to generate captions.");
        console.error("API error:", data);
      }
    } catch (error) {
      console.error("Error generating captions:", error);
      alert("Error generating captions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="timeline-editor">
      <h2>🎞️ Timeline Editor</h2>

      <div>
        <label>
          Upload Video:
          <input type="file" accept="video/*" onChange={handleVideoUpload} />
        </label>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleGenerateCaptions}
          disabled={loading}
          className="generate-button"
        >
          🤖 {loading ? "Generating..." : "Generate AI Captions"}
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>🎬 Captions:</h3>
        {projectData.captions.length === 0 ? (
          <p>No captions yet.</p>
        ) : (
          <ul>
            {projectData.captions.map((caption, index) => (
              <li key={index}>
                [{caption.start}s - {caption.end}s]: {caption.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TimelineEditor;
