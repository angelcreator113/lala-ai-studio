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

  const addTrack = () => {
    const newTrack = {
      id: Date.now(),
      name: `Track ${projectData.tracks.length + 1}`,
      type: "captions",
      items: [],
    };
    onProjectDataChange({
      ...projectData,
      tracks: [...projectData.tracks, newTrack],
    });
  };

  return (
    <div className="timeline-editor">
      <h2>🕒 Timeline Editor — Phase 30 🚀</h2>

      <input type="file" accept="video/*" onChange={handleVideoChange} />

      {projectData.videoFile && (
        <video
          src={projectData.videoFile}
          controls
          style={{
            width: "100%",
            maxWidth: "720px",
            maxHeight: "400px", // limit tall videos
            objectFit: "contain",
            marginTop: "10px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          }}
        />
      )}

      <button onClick={addTrack} style={{ marginTop: "1rem" }}>
        ➕ Add Track
      </button>

      <div className="timeline-layers">
        {/* Markers Track */}
        <div className="markers-track">
          {projectData.markers.map((marker, index) => (
            <div
              key={index}
              className="marker"
              style={{ left: `${marker.time * 50}px` }}
            />
          ))}
        </div>

        {/* Tracks */}
        {projectData.tracks.map((track) => (
          <div key={track.id} className="timeline-track">
            <div className="track-header">{track.name}</div>
            {track.items.map((item, index) => (
              <div
                key={index}
                className="caption-block"
                style={{
                  left: `${item.start * 50}px`,
                  width: `${(item.end - item.start) * 50}px`,
                }}
              >
                {item.text}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimelineEditor;
