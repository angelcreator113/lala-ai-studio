// src/App.jsx

import React, { useState, useEffect } from "react";
import TimelineEditor from "./TimelineEditor";
import {
  saveProject,
  loadProject,
  listProjectVersions,
  loadProjectVersion,
} from "./api";
import "./App.css";

function App() {
  const [projectData, setProjectData] = useState({
    videoFile: "",
    captions: [],
    markers: [
      { time: 2 },
      { time: 5 },
      { time: 7.5 },
    ],
    tracks: [
      {
        id: 1,
        name: "Track 1",
        type: "captions",
        items: [
          { text: "Hello", start: 1, end: 3 },
          { text: "World", start: 4, end: 6 },
        ],
      },
    ],
  });

  const [loadedFileName, setLoadedFileName] = useState("");
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState("");

  const handleSave = async () => {
    try {
      await saveProject(projectData);
      alert("✅ Project saved!");
      await fetchVersions(); // Refresh version list
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

  const fetchVersions = async () => {
    try {
      const result = await listProjectVersions();
      setVersions(result.versions);
    } catch (error) {
      console.error("Failed to fetch versions:", error);
    }
  };

  const handleLoadVersion = async () => {
    if (!selectedVersion) return;
    try {
      const loaded = await loadProjectVersion(selectedVersion);
      setProjectData(loaded.data);
      setLoadedFileName(`Version: ${selectedVersion}`);
      alert(`✅ Loaded version: ${selectedVersion}`);
    } catch (error) {
      alert("❌ Failed to load version.");
    }
  };

  useEffect(() => {
    fetchVersions();
  }, []);

  return (
    <div className="App">
      <h1>
        🎬 Lala AI Studio — Phase 30 Save + Load + Markers + Tracks 🚀
      </h1>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handleSave}>💾 Save Project</button>
        <button onClick={handleLoad} style={{ marginLeft: "10px" }}>
          📂 Load Latest Project
        </button>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Select Version:</label>{" "}
        <select
          value={selectedVersion}
          onChange={(e) => setSelectedVersion(e.target.value)}
        >
          <option value="">-- Select a version --</option>
          {versions.map((v) => (
            <option key={v.file} value={v.file}>
              {v.file}
            </option>
          ))}
        </select>
        <button
          onClick={handleLoadVersion}
          disabled={!selectedVersion}
          style={{ marginLeft: "10px" }}
        >
          ⏪ Load Selected Version
        </button>
      </div>

      {loadedFileName && <p>Loaded: {loadedFileName}</p>}

      <TimelineEditor
        projectData={projectData}
        onProjectDataChange={setProjectData}
      />
    </div>
  );
}

export default App;
