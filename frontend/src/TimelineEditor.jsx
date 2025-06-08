// src/TimelineEditor.jsx

import React, { useRef, useState } from "react";
import "./TimelineEditor.css";

const SNAP_THRESHOLD = 0.1; // seconds

function TimelineEditor({ projectData, onProjectDataChange }) {
  const videoRef = useRef(null);
  const [videoDuration, setVideoDuration] = useState(10); // fallback 10s

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

  const handleDrag = (trackId, itemIndex, newStart) => {
    let snappedStart = newStart;

    for (const marker of projectData.markers) {
      if (Math.abs(marker.time - newStart) <= SNAP_THRESHOLD) {
        snappedStart = marker.time;
        break;
      }
    }

    const updatedTracks = projectData.tracks.map((track) => {
      if (track.id !== trackId) return track;
      const updatedItems = [...track.items];
      const item = updatedItems[itemIndex];
      const duration = item.end - item.start;

      updatedItems[itemIndex] = {
        ...item,
        start: snappedStart,
        end: snappedStart + duration,
      };

      return { ...track, items: updatedItems };
    });

    onProjectDataChange({ ...projectData, tracks: updatedTracks });
  };

  const handleAddMarker = () => {
    const newMarkerTime = Math.random() * videoDuration;
    const newMarkers = [...projectData.markers, { time: newMarkerTime }];
    onProjectDataChange({ ...projectData, markers: newMarkers });
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

  const timelineWidth = videoDuration * 100; // 100px per second

  return (
    <div className="timeline-editor">
      <h2>🕒 Timeline Editor + Snap + Markers + Sizing Fix 🚀</h2>

      <input type="file" accept="video/*" onChange={handleVideoChange} />
      {projectData.videoFile && (
        <video
          ref={videoRef}
          src={projectData.videoFile}
          controls
          style={{ width: "80%", marginTop: "10px" }}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setVideoDuration(videoRef.current.duration);
            }
          }}
        />
      )}

      <div style={{ marginTop: "1rem" }}>
        <button onClick={addTrack}>➕ Add Track</button>
        <button onClick={handleAddMarker} style={{ marginLeft: "10px" }}>
          ➕ Add Marker
        </button>
      </div>

      <div className="markers-track" style={{ width: `${timelineWidth}px` }}>
        {projectData.markers.map((marker, index) => (
          <div
            key={index}
            className="marker"
            style={{
              left: `${(marker.time / videoDuration) * timelineWidth}px`,
            }}
          ></div>
        ))}
      </div>

      <div className="timeline-layers">
        {projectData.tracks.map((track) => (
          <div
            key={track.id}
            className="timeline-track"
            style={{ width: `${timelineWidth}px` }}
          >
            <div className="track-header">{track.name}</div>
            {track.items.map((item, index) => (
              <div
                key={index}
                className="caption-block"
                style={{
                  left: `${(item.start / videoDuration) * timelineWidth}px`,
                  width: `${((item.end - item.start) / videoDuration) * timelineWidth}px`,
                }}
                draggable
                onDragEnd={(e) => {
                  const newLeft = e.clientX - 200; // adjust offset
                  const newStart = (newLeft / timelineWidth) * videoDuration;
                  handleDrag(track.id, index, Math.max(0, newStart));
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
