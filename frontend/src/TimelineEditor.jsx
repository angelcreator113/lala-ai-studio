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
      <h2>🕒 Timeline Editor + Tracks</h2>
      <input type="file" accept="video/*" onChange={handleVideoChange} />
      {projectData.videoFile && (
        <video
          src={projectData.videoFile}
          controls
          style={{ width: "100%", marginTop: "10px" }}
        />
      )}

      <button onClick={addTrack} style={{ marginTop: "1rem" }}>
        ➕ Add Track
      </button>

      <div className="timeline-layers">
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
