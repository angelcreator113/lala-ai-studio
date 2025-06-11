import React, { useRef, useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './TimelineEditor.css';

function DraggableClip({ clip, index, moveClip, removeClip, renameClip }) {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: 'clip',
    hover(item) {
      if (item.index === index) return;
      moveClip(item.index, index);
      item.index = index;
    },
  });
  const [, drag] = useDrag({
    type: 'clip',
    item: { index },
  });
  drag(drop(ref));
  return (
    <li ref={ref}>
      <span>{index + 1}.</span>
      <input
        value={clip.name}
        onChange={e => renameClip(index, e.target.value)}
      />
      <button onClick={() => removeClip(index)}>×</button>
    </li>
  );
}

const CLIP_TEMPLATES = [
  { name: 'Intro Look', file: new File([''], 'intro-look.mp4', { type: 'video/mp4' }) },
  { name: 'Style Breakdown', file: new File([''], 'style-breakdown.mp4', { type: 'video/mp4' }) },
  { name: 'Guest Segment', file: new File([''], 'guest-segment.mp4', { type: 'video/mp4' }) }
];

export default function TimelineEditor() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);
  const stitchInputRef = useRef(null);
  const importRef = useRef(null);

  const [duration, setDuration] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [tracks, setTracks] = useState([]);
  const [dragInfo, setDragInfo] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoName, setVideoName] = useState('');
  const [stitchClips, setStitchClips] = useState([]);
  const [isStitching, setIsStitching] = useState(false);
  const [hoverTime, setHoverTime] = useState(null);
  const [isDraggingPlayhead, setIsDraggingPlayhead] = useState(false);
  const [hideCaptions, setHideCaptions] = useState(false);
  const [snapGuidePos, setSnapGuidePos] = useState(null);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (containerRef.current) {
        setTrackWidth(containerRef.current.offsetWidth);
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleClipUpload = (e) => {
    const files = Array.from(e.target.files);
    const newClips = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      file
    }));
    setStitchClips(prev => [...prev, ...newClips]);
  };

  const handleTemplateInsert = (template) => {
    const newClip = {
      id: Date.now() + Math.random(),
      name: template.name,
      file: template.file
    };
    setStitchClips(prev => [...prev, newClip]);
  };

  const removeClip = (index) => {
    setStitchClips(prev => prev.filter((_, i) => i !== index));
  };

  const renameClip = (index, name) => {
    setStitchClips(prev =>
      prev.map((clip, i) => (i === index ? { ...clip, name } : clip))
    );
  };

  const handleStitchClips = async () => {
    const formData = new FormData();
    stitchClips.forEach(clip => formData.append('clips', clip.file));

    try {
      setIsStitching(true);
      const response = await fetch('http://localhost:3000/api/stitch', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (result?.url) {
        const videoURL = result.url;
        videoRef.current.src = videoURL;
        videoRef.current.load();
        setTracks([]);
        setCurrentTime(0);
        setVideoName("stitched_output.mp4");
        setStitchClips([]);
      }
    } catch (error) {
      console.error('Stitching failed', error);
    } finally {
      setIsStitching(false);
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tracks));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "timeline.json");
    dlAnchor.click();
  };

  const handleExportSRT = () => {
    const srtLines = [];
    let index = 1;
    tracks.forEach(track => {
      track.captions.forEach(caption => {
        const start = new Date(caption.time * 1000).toISOString().substr(11, 12).replace('.', ',');
        const end = new Date((caption.time + caption.duration) * 1000).toISOString().substr(11, 12).replace('.', ',');
        srtLines.push(`${index++}\n${start} --> ${end}\n${caption.text}\n`);
      });
    });
    const blob = new Blob([srtLines.join('\n')], { type: 'text/srt' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'captions.srt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setTracks(data);
      } catch (error) {
        alert('Failed to parse JSON');
      }
    };
    reader.readAsText(file);
  };

  const handleDeleteTrack = (trackId) => {
    setTracks(prev => prev.filter(track => track.id !== trackId));
  };

  const handleAddTrack = () => {
    const newTrack = {
      id: Date.now(),
      title: `Track ${tracks.length + 1}`,
      captions: []
    };
    setTracks(prev => [...prev, newTrack]);
  };

  const handleAddCaption = (trackId) => {
    if (duration === 0) return;
    const defaultText = 'New caption';
    const wordCount = defaultText.trim().split(/\s+/).length || 1;
    const defaultDuration = 0.4 * wordCount;
    setTracks(prev =>
      prev.map(track =>
        track.id === trackId
          ? {
              ...track,
              captions: [
                ...track.captions,
                {
                  id: Date.now(),
                  time: currentTime,
                  duration: defaultDuration,
                  text: defaultText
                }
              ]
            }
          : track
      )
    );
  };

  const handleDragStart = (e, trackId, captionId, resizing = false) => {
    e.stopPropagation();
    setDragInfo({ trackId, captionId, resizing });
  };

  const handleDragging = (e) => {
    if (!dragInfo || !trackWidth || !duration) return;
    const bounds = containerRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const time = Math.max(0, Math.min(1, x / trackWidth)) * duration;

    setTracks(prev =>
      prev.map(track =>
        track.id === dragInfo.trackId
          ? {
              ...track,
              captions: track.captions.map(c =>
                c.id === dragInfo.captionId
                  ? dragInfo.resizing
                    ? { ...c, duration: Math.max(0.5, time - c.time) }
                    : { ...c, time: Math.min(time, c.time + c.duration - 0.5) }
                  : c
              )
            }
          : track
      )
    );
  };

  const handleEndDrag = () => {
    setDragInfo(null);
    setIsDraggingPlayhead(false);
    setSnapGuidePos(null);
  };

  const handlePlayheadDrag = (e) => {
    if (!duration || !trackWidth) return;
    const bounds = containerRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const pct = Math.max(0, Math.min(1, x / trackWidth));
    let newTime = pct * duration;

    const snapThreshold = 0.05 * duration;
    let snapped = false;

    tracks.forEach(track => {
      track.captions.forEach(caption => {
        [caption.time, caption.time + caption.duration].forEach(edge => {
          const edgePct = edge / duration;
          const edgeX = edgePct * trackWidth;
          if (Math.abs(newTime - edge) < snapThreshold) {
            newTime = edge;
            setSnapGuidePos(edgeX);
            snapped = true;
          }
        });
      });
    });

    if (!snapped) setSnapGuidePos(null);

    setCurrentTime(newTime);
    if (videoRef.current) videoRef.current.currentTime = newTime;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="timeline-editor" onMouseMove={handleDragging} onMouseUp={handleEndDrag}>
        {snapGuidePos !== null && <div className="snap-guide" style={{ left: `${snapGuidePos}px` }} />}
        <div className="controls">
          <button onClick={() => fileInputRef.current?.click()}>🎞 Upload Video</button>
          <input type="file" accept="video/*" style={{ display: 'none' }} ref={fileInputRef} onChange={e => {
            if (e.target.files.length > 0) {
              const file = e.target.files[0];
              const videoURL = URL.createObjectURL(file);
              videoRef.current.src = videoURL;
              videoRef.current.load();
              setTracks([]);
              setCurrentTime(0);
              setVideoName(file.name);
            }
          }} />

          <label className="primary-button">
            📥 Upload Clip
            <input type="file" accept="video/*" multiple style={{ display: 'none' }} ref={stitchInputRef} onChange={handleClipUpload} />
          </label>

          {stitchClips.length > 0 && (
            <div className="stitch-queue">
              <h4>📚 Stitch Queue</h4>
              <ul>
                {stitchClips.map((clip, index) => (
                  <DraggableClip
                    key={clip.id}
                    clip={clip}
                    index={index}
                    moveClip={(from, to) => {
                      const updated = [...stitchClips];
                      const [moved] = updated.splice(from, 1);
                      updated.splice(to, 0, moved);
                      setStitchClips(updated);
                    }}
                    removeClip={removeClip}
                    renameClip={renameClip}
                  />
                ))}
              </ul>
              <button onClick={handleStitchClips} disabled={isStitching}>🔗 Merge Clips</button>
              <button onClick={() => setStitchClips([])} disabled={isStitching}>🧹 Clear Queue</button>
              <div style={{ marginTop: '10px' }}>
                {CLIP_TEMPLATES.map(template => (
                  <button key={template.name} onClick={() => handleTemplateInsert(template)}>📌 Add {template.name}</button>
                ))}
              </div>
            </div>
          )}

          <button onClick={handleExportJSON}>⬇ Export JSON</button>
          <button onClick={handleExportSRT}>⬇ Export SRT</button>
          <button onClick={() => importRef.current?.click()}>⬆ Import JSON</button>
          <input type="file" accept="application/json" ref={importRef} style={{ display: 'none' }} onChange={handleImportJSON} />
          <button onClick={() => setHideCaptions(prev => !prev)}>{hideCaptions ? '👁 Show Captions' : '🙈 Hide Captions'}</button>
          <button onClick={handleAddTrack}>➕ Add Track</button>
        </div>

        <div ref={containerRef} className="timeline-tracks">
          {tracks.map(track => (
            <div key={track.id} className="timeline-track">
              <div className="track-header">
                <span>{track.title}</span>
                <button onClick={() => handleAddCaption(track.id)}>Add Caption</button>
                <button onClick={() => handleDeleteTrack(track.id)}>🗑 Delete Track</button>
              </div>
              {!hideCaptions && track.captions.map(caption => (
                <div
                  key={caption.id}
                  className="caption-block"
                  style={{
                    left: `${(caption.time / duration) * 100}%`,
                    width: `${(caption.duration / duration) * 100}%`
                  }}
                  onMouseDown={e => handleDragStart(e, track.id, caption.id)}
                >
                  <textarea
                    value={caption.text}
                    onChange={e => {
                      const text = e.target.value;
                      const wordCount = text.trim().split(/\s+/).length || 1;
                      setTracks(prev =>
                        prev.map(t =>
                          t.id === track.id
                            ? {
                                ...t,
                                captions: t.captions.map(c =>
                                  c.id === caption.id
                                    ? {
                                        ...c,
                                        text,
                                        duration: Math.max(0.5, wordCount * 0.4)
                                      }
                                    : c
                                )
                              }
                            : t
                        )
                      );
                    }}
                  />
                  <div
                    className="resize-handle"
                    onMouseDown={e => handleDragStart(e, track.id, caption.id, true)}
                  />
                  <button onClick={() => {
                    setTracks(prev =>
                      prev.map(t =>
                        t.id === track.id
                          ? {
                              ...t,
                              captions: t.captions.filter(c => c.id !== caption.id)
                            }
                          : t
                      )
                    );
                  }}>×</button>
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
                  onMouseMove={handlePlayheadDrag}
                  onMouseUp={handleEndDrag}
                />
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <video
            ref={videoRef}
            controls
            onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
            onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
            className="main-video"
          />
        </div>
        {isStitching && (
          <div className="stitch-overlay">Merging clips...</div>
        )}
      </div>
    </DndProvider>
  );
}
