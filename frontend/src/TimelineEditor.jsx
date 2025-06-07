import React, { useState, useEffect, useRef } from "react";
import "./TimelineEditor.css";

function TimelineEditor() {
  const [videoFile, setVideoFile] = useState(null);
  const [captions, setCaptions] = useState([
    { id: 1, start: 0, end: 2, text: "Hello world!" },
    { id: 2, start: 2, end: 4, text: "This is a test caption." },
  ]);
  const [currentTime, setCurrentTime] = useState(0);

  const videoRef = useRef(null);

  const handleVideoUpload = (e) => {
    setVideoFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleCaptionDrag = (id, newStart) => {
    setCaptions((prev) =>
      prev.map((cap) =>
        cap.id === id ? { ...cap, start: newStart, end: newStart + (cap.end - cap.start) } : cap
      )
    );
  };

  const handleSeekToCaption = (time) => {
    videoRef.current.currentTime = time;
    videoRef.current.play();
  };

  return (
    <div className="timeline-editor">
      <h1>🎬 Lala AI Studio 🚀</h1>

      <input type="file" accept="video/*" onChange={handleVideoUpload} />
      {videoFile && (
        <>
          <video
            src={videoFile}
            controls
            ref={videoRef}
            onTimeUpdate={handleTimeUpdate}
            style={{ width: "600px", marginTop: "1rem" }}
          />

          <div className="timeline">
            {captions.map((cap) => {
              const width = (cap.end - cap.start) * 50; // scale for demo
              const left = cap.start * 50;
              const isActive = currentTime >= cap.start && currentTime <= cap.end;

              return (
                <div
                  key={cap.id}
                  className={`caption-block ${isActive ? "active" : ""}`}
                  style={{ left, width }}
                  draggable
                  onDragEnd={(e) => {
                    const newLeft = e.clientX - 100; // adjust this offset as needed
                    const newStart = Math.max(0, newLeft / 50);
                    handleCaptionDrag(cap.id, newStart);
                  }}
                  onClick={() => handleSeekToCaption(cap.start)}
                >
                  {cap.text}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default TimelineEditor;
