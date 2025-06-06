import React, { useState } from "react";
import TimelineEditor from "./TimelineEditor";
import "./App.css";

function App() {
  const [projectData, setProjectData] = useState({
    videoFile: "",
    captions: [],
  });

  return (
    <div className="app-container">
      <h1>Lala AI Studio 🎬 Phase 19 🚀</h1>
      <TimelineEditor
        projectData={projectData}
        onProjectDataChange={setProjectData}
      />
    </div>
  );
}

export default App;
