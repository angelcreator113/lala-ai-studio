import React, { useState } from "react";
import TimelineEditor from "./TimelineEditor";
import AssistantPanel from "./components/AssistantPanel";
import "./App.css";

function App() {
  const [projectData, setProjectData] = useState({
    videoFile: "",
    captions: [],
  });

  const handleProjectDataChange = (newData) => {
    setProjectData(newData);
  };

  return (
    <div className="app-container">
      <h1>🎬 Lala AI Studio — Phase 17 🚀</h1>
      <AssistantPanel
        projectData={projectData}
        onProjectDataChange={handleProjectDataChange}
      />
      <TimelineEditor
        projectData={projectData}
        onProjectDataChange={handleProjectDataChange}
      />
    </div>
  );
}

export default App;
