import React, { useState, useEffect } from "react";
import "./TimelineEditor.css";
import {
  alignCaptions,
  splitMergeCaptions,
  importCaptions,
} from "./api";

function TimelineEditor({ projectData, onProjectDataChange }) {
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const handleAlignClick = async () => {
    const newCaptions = await alignCaptions(projectData);
    saveState();
    onProjectDataChange({ ...projectData, captions: newCaptions });
  };

  const handleSplitMergeClick = async () => {
    const newCaptions = await splitMergeCaptions(projectData);
    saveState();
    onProjectDataChange({ ...projectData, captions: newCaptions });
  };

  const handleImport = async (file) => {
    const importedCaptions = await importCaptions(file);
    saveState();
    onProjectDataChange({ ...projectData, captions: importedCaptions });
  };

  const saveState = () => {
    setUndoStack([...undoStack, projectData]);
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const prevState = undoStack.pop();
    setRedoStack([projectData, ...redoStack]);
    onProjectDataChange(prevState);
    setUndoStack([...undoStack]);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const nextState = redoStack.shift();
    setUndoStack([...undoStack, projectData]);
    onProjectDataChange(nextState);
    setRedoStack([...redoStack]);
  };

  return (
    <div className="timeline-editor">
      <h2>🕒 Timeline Editor</h2>
      <div className="editor-toolbar">
        <button onClick={handleAlignClick}>🤖 AI Align Captions</button>
        <button onClick={handleSplitMergeClick}>✨ AI Split/Merge</button>
        <input
          type="file"
          accept=".srt"
          onChange={(e) => handleImport(e.target.files[0])}
        />
        <button onClick={handleUndo} disabled={undoStack.length === 0}>
          ↩️ Undo
        </button>
        <button onClick={handleRedo} disabled={redoStack.length === 0}>
          ↪️ Redo
        </button>
      </div>

      <div className="timeline-bars">
        {projectData.captions.map((cap, index) => (
          <div
            key={index}
            className="timeline-bar"
            style={{
              left: `${cap.start * 10}px`,
              width: `${(cap.end - cap.start) * 10}px`,
            }}
          >
            {cap.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimelineEditor;
