import React from "react";
import "./TimelineEditor.css";

function TimelineEditor({ projectData, onProjectDataChange }) {
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      onProjectDataChange({
        ...projectData,
        videoFile: videoUrl,
      });
    }
  };

  return (
    <div className="timeline-editor">
      <h2>🕒 Timeline Editor</h2>
      <input type="file" accept="video/*" onChange={handleVideoChange} />
      {projectData.videoFile && (
        <video
          src={projectData.videoFile}
          controls
          style={{ width: "100%", marginTop: "10px" }}
        />
      )}
      {/* You can add captions editor here */}
    </div>
  );
}

export default TimelineEditor;
