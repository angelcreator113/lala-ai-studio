import React, { useRef, useState, useEffect } from 'react';
import './TimelineEditor.css';

export default function TimelineEditor() {
  const videoRef = useRef(null);
  const videoWrapperRef = useRef(null);

  const [duration, setDuration] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [tracks, setTracks] = useState([]);
  const [dragInfo, setDragInfo] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [hoverTime, setHoverTime] = useState(null);
  const [isDraggingPlayhead, setIsDraggingPlayhead] = useState(false);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (videoWrapperRef.current) {
        setTrackWidth(videoWrapperRef.current.offsetWidth);
      }
    });
    if (videoWrapperRef.current) observer.observe(videoWrapperRef.current);
    return () => observer.disconnect();
  }, []);

  const handleVideoLoad = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleAddTrack = () => {
    const newIndex = tracks.length + 1;
    setTracks(prev => [...prev, { id: Date.now(), title: `Track ${newIndex}`, captions: [] }]);
  };

  const handleAddCaption = (trackId) => {
    if (duration === 0) return alert('Please upload a video first.');
    const defaultText = 'New caption';
    const defaultDuration = 0.4 * defaultText.trim().split(/\s+/).length;
    setTracks(prev =>
      prev.map(track =>
        track.id === trackId ? {
          ...track,
          captions: [...track.captions, { id: Date.now(), time: currentTime, duration: defaultDuration, text: defaultText }]
        } : track
      )
    );
    if (videoRef.current) videoRef.current.play();
  };

  const handleStartDrag = (e, trackId, captionId) => setDragInfo({ trackId, captionId, resizing: false });

  const handleDrag = (e) => {
    if (!dragInfo || !duration || !trackWidth) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const time = Math.max(0, Math.min(1, x / trackWidth)) * duration;
    setTracks(prev =>
      prev.map(track =>
        track.id === dragInfo.trackId ? {
          ...track,
          captions: track.captions.map(c =>
            c.id === dragInfo.captionId ? (
              dragInfo.resizing ? { ...c, duration: Math.max(0.5, time - c.time) } : { ...c, time: Math.min(time, c.time + c.duration - 0.5) }
            ) : c
          )
        } : track
      )
    );
  };

  const handleEndDrag = () => {
    setDragInfo(null);
    setIsDraggingPlayhead(false);
  };

  const handleRemove = (trackId, captionId) => {
    setTracks(prev => prev.map(track =>
      track.id === trackId ? { ...track, captions: track.captions.filter(c => c.id !== captionId) } : track
    ));
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(tracks, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'captions.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const formatTime = (seconds) => {
    const ms = Math.floor((seconds % 1) * 1000);
    const totalSeconds = Math.floor(seconds);
    const s = totalSeconds % 60;
    const m = Math.floor(totalSeconds / 60) % 60;
    const h = Math.floor(totalSeconds / 3600);
    return [h, m, s].map(n => String(n).padStart(2, '0')).join(':') + `,${String(ms).padStart(3, '0')}`;
  };

  const handleExportSRT = () => {
    let index = 1;
    const lines = [];
    tracks.forEach(track =>
      track.captions.forEach(caption => {
        lines.push(`${index++}`, `${formatTime(caption.time)} --> ${formatTime(caption.time + caption.duration)}`, caption.text, '');
      })
    );
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'captions.srt';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (Array.isArray(data)) setTracks(data);
        else alert('Invalid format.');
      } catch {
        alert('Failed to parse JSON.');
      }
    };
    reader.readAsText(file);
  };

  const moveTrack = (from, to) => {
    if (to < 0 || to >= tracks.length) return;
    const newTracks = [...tracks];
    const [moved] = newTracks.splice(from, 1);
    newTracks.splice(to, 0, moved);
    setTracks(newTracks);
  };

  const handlePlayheadDrag = (e) => {
    if (!duration || !trackWidth) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const pct = Math.max(0, Math.min(1, x / trackWidth));
    const newTime = pct * duration;
    setCurrentTime(newTime);
    if (videoRef.current) videoRef.current.currentTime = newTime;
  };

  return (
    <div className="timeline-editor">
      <h2>Video Caption Timeline</h2>
      <input type="file" accept="video/*" onChange={e => {
        videoRef.current.src = URL.createObjectURL(e.target.files[0]);
      }} />
      <div className="timeline-video-wrapper" ref={videoWrapperRef}>
        <video ref={videoRef} controls onLoadedMetadata={handleVideoLoad} onTimeUpdate={() => setCurrentTime(videoRef.current.currentTime)} />
      </div>

      <div
        className="markers-track"
        style={{ width: `${trackWidth}px`, position: 'relative' }}
        onMouseMove={e => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pct = (e.clientX - rect.left) / trackWidth;
          setHoverTime(Math.max(0, Math.min(1, pct)) * duration);
        }}
        onMouseLeave={() => setHoverTime(null)}
      >
        {hoverTime !== null && (
          <div className="hover-preview" style={{ left: `${(hoverTime / duration) * 100}%`, position: 'absolute', top: '0px' }}>
            {new Date(hoverTime * 1000).toISOString().substr(11, 8)}
          </div>
        )}
      </div>

      <div className="timeline-layers">
        <button onClick={handleAddTrack}>Add Track</button>
        <button onClick={handleExportJSON}>Download JSON</button>
        <button onClick={handleExportSRT}>Download SRT</button>
        <input type="file" accept=".json" onChange={handleImportJSON} />

        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="timeline-track"
            style={{ width: `${trackWidth}px`, position: 'relative' }}
            onMouseMove={handleDrag}
            onMouseUp={handleEndDrag}
            onMouseLeave={handleEndDrag}
          >
            <div className="track-header">
              <input
                value={track.title}
                onChange={e => setTracks(prev => prev.map(t => t.id === track.id ? { ...t, title: e.target.value } : t))}
                style={{ flexGrow: 1, background: 'transparent', color: '#fff', border: 'none', fontWeight: 'bold' }}
              />
              <button onClick={() => moveTrack(index, index - 1)}>↑</button>
              <button onClick={() => moveTrack(index, index + 1)}>↓</button>
              <button onClick={() => handleAddCaption(track.id)}>Add Caption</button>
            </div>
            {track.captions.map(caption => (
              <div
                key={caption.id}
                className={`caption-block${dragInfo?.captionId === caption.id ? ' active' : ''}`}
                style={{
                  left: `${(caption.time / duration) * 100}%`,
                  width: `${(caption.duration / duration) * 100}%`
                }}
                onMouseDown={e => handleStartDrag(e, track.id, caption.id)}
              >
                <input
                  value={caption.text}
                  onFocus={() => videoRef.current?.pause()}
                  onBlur={() => videoRef.current?.play()}
                  onChange={e => {
                    const text = e.target.value;
                    const wordCount = text.trim().split(/\s+/).length || 1;
                    setTracks(prev => prev.map(t =>
                      t.id === track.id ? {
                        ...t,
                        captions: t.captions.map(c => c.id === caption.id ? { ...c, text, duration: Math.max(0.5, wordCount * 0.4) } : c)
                      } : t
                    ));
                  }}
                  style={{ width: '100%', height: '100%', background: 'transparent', color: '#fff', border: 'none', textAlign: 'center' }}
                />
                <div
                  className="resize-handle"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setDragInfo({ trackId: track.id, captionId: caption.id, resizing: true });
                  }}
                />
                <button onClick={() => handleRemove(track.id, caption.id)}>×</button>
              </div>
            ))}
            <div
              className="playhead"
              style={{ left: `${(currentTime / duration) * 100}%` }}
              onMouseDown={() => setIsDraggingPlayhead(true)}
            />
            {isDraggingPlayhead && (
              <div
                className="playhead-overlay"
                style={{ width: `${trackWidth}px`, height: '100%', position: 'absolute', top: 0, left: 0 }}
                onMouseMove={handlePlayheadDrag}
                onMouseUp={handleEndDrag}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
