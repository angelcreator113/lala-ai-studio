// src/TimelineEditor.jsx

import React from "react";
import "./TimelineEditor.css";

const SNAP_THRESHOLD = 0.1; // seconds

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

  const handleCaptionDrag = (index, newStart) => {
    let snappedStart = newStart;

    // Find nearest marker within SNAP_THRESHOLD
    for (const marker of projectData.markers || []) {
      if (Math.abs(marker.time - newStart) <= SNAP_THRESHOLD) {
        snappedStart = marker.time;
        break;
      }
    }

    const updatedCaptions = [...projectData.captions];
    const duration = updatedCaptions[index].end - updatedCaptions[index].start;

    updatedCaptions[index].start = snappedStart;
    updatedCaptions[index].end = snappedStart + duration;

    onProjectDataChange({ ...projectData, captions: updatedCaptions });
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

      <div className="timeline-track">
        {projectData.markers?.map((marker, index) => (
          <div
            key={index}
            className="marker"
            style={{ left: `${marker.time * 50}px` }} // Example scaling: 50px per second
          ></div>
        ))}

        {projectData.captions?.map((caption, index) => (
          <div
            key={index}
            className="caption-block"
            style={{
              left: `${caption.start * 50}px`,
              width: `${(caption.end - caption.start) * 50}px`,
            }}
            draggable
            onDrag={(e) => {
              const timelineRect = e.target.parentElement.getBoundingClientRect();
              const newLeft = e.clientX - timelineRect.left;
              const newStart = newLeft / 50; // scale factor
              handleCaptionDrag(index, newStart);
            }}
          >
            {caption.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimelineEditor;
