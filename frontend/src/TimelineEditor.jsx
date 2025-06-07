import React, { useState, useEffect, useRef } from "react";
import "./TimelineEditor.css";

function TimelineEditor() {
  const [videoFile, setVideoFile] = useState(null);
  const [captions, setCaptions] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef(null);

  // Handle video upload
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  // Play/Pause toggle
  const handlePlayPause = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Seek to time
  const handleTimelineClick = (e) => {
    const timeline = e.target;
    const rect = timeline.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Video time update
  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  // Spacebar keyboard shortcut
  const handleKeyDown = (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      handlePlayPause();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  // Render
  return (
    <div className="timeline-editor">
      <h1>🎬 Lala AI Studio 🚀</h1>

      {/* Video upload */}
      <input type="file" accept="video/*" onChange={handleVideoUpload} />

      {/* Video preview */}
      {videoFile && (
        <div className="video-preview">
          <video
            ref={videoRef}
            src={URL.createObjectURL(videoFile)}
            controls={false}
            onTimeUpdate={handleTimeUpdate}
          ></video>

          {/* Playback controls */}
          <div className="controls">
            <button onClick={handlePlayPause}>
              {isPlaying ? "⏸ Pause" : "▶️ Play"}
            </button>
          </div>

          {/* Timeline */}
          <div className="timeline" onClick={handleTimelineClick}>
            <div
              className="timeline-progress"
              style={{
                width: `${
                  videoRef.current
                    ? (currentTime / videoRef.current.duration) * 100
                    : 0
                }%`,
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimelineEditor;
