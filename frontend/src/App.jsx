// src/App.jsx

import React, { useState } from "react";
import TimelineEditor from "./TimelineEditor";
import { saveProject, loadProject } from "./api";
import "./App.css";

function App() {
  const [projectData, setProjectData] = useState({
    videoFile: "",
    captions: [],
  });
  const [loadedFileName, setLoadedFileName] = useState("");

  const handleSave = async () => {
    try {
      await saveProject(projectData);
      alert("✅ Project saved!");
    } catch (error) {
      alert("❌ Failed to save project.");
    }
  };

  const handleLoad = async () => {
    try {
      const loaded = await loadProject();
      setProjectData(loaded.data);
      setLoadedFileName(loaded.fileName || "Unnamed Project");
      alert("✅ Project loaded!");
    } catch (error) {
      alert("❌ Failed to load project.");
    }
  };

  return (
    <div className="App">
      <h1>🎬 Lala AI Studio — Project Save + Load</h1>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handleSave}>💾 Save Project</button>
        <button onClick={handleLoad} style={{ marginLeft: "10px" }}>
          📂 Load Project
        </button>
        {loadedFileName && <p>Loaded: {loadedFileName}</p>}
      </div>

      <TimelineEditor
        projectData={projectData}
        onProjectDataChange={setProjectData}
      />
    </div>
  );
}

export default App;
