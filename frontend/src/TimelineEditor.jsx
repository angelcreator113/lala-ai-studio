import React, { useState, useEffect } from "react";
import "./TimelineEditor.css";

function TimelineEditor({ projectData, onProjectDataChange }) {
  const [videoFile, setVideoFile] = useState(projectData.videoFile);
  const [captions, setCaptions] = useState(projectData.captions);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoFile(videoURL);
      onProjectDataChange({ ...projectData, videoFile: videoURL });
    }
  };

  const generateCaptions = async () => {
    const res = await fetch("http://localhost:3000/api/captions/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ video: videoFile }),
    });
    const data = await res.json();
    setCaptions(data.captions);
    onProjectDataChange({ ...projectData, captions: data.captions });
  };

  const applyEffects = async () => {
    const res = await fetch("http://localhost:3000/api/captions/effects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ captions }),
    });
    const data = await res.json();
    setCaptions(data.captions);
    onProjectDataChange({ ...projectData, captions: data.captions });
  };

  const previewCaptions = () => {
    const video = document.getElementById("video-player");
    const captionOverlay = document.getElementById("caption-overlay");

    video.ontimeupdate = () => {
      const currentTime = video.currentTime;
      const activeCaption = captions.find(
        (cap) => currentTime >= cap.start && currentTime <= cap.end
      );
      captionOverlay.innerText = activeCaption ? activeCaption.text : "";
    };
  };

  const saveProject = async () => {
    await fetch("http://localhost:3000/api/captions/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ video: videoFile, captions }),
    });
    alert("Project saved! ✅");
  };

  const exportCaptions = async () => {
    const res = await fetch("http://localhost:3000/api/captions/export");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "captions.json";
    a.click();
  };

  return (
    <div className="timeline-editor">
      <div className="controls">
        <input type="file" accept="video/*" onChange={handleVideoUpload} />
        <button onClick={generateCaptions}>AI Generate Captions</button>
        <button onClick={applyEffects}>AI Effects ✨</button>
        <button onClick={previewCaptions}>Preview Captions</button>
        <button onClick={saveProject}>Save Project</button>
        <button onClick={exportCaptions}>Export Captions</button>
      </div>

      {videoFile && (
        <div className="video-preview">
          <video
            id="video-player"
            src={videoFile}
            controls
            width="600"
            onPlay={previewCaptions}
          ></video>
          <div id="caption-overlay" className="caption-overlay"></div>
        </div>
      )}
    </div>
  );
}

export default TimelineEditor;
