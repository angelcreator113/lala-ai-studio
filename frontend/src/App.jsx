import React, { useState } from "react";
import TimelineEditor from "./TimelineEditor";
import "./App.css";

function App() {
  const [projectData, setProjectData] = useState({
    videoFile: "",
    captions: [],
  });

  return (
    <div className="App">
      <h1>🎬 Lala AI Studio 🚀</h1>
      <TimelineEditor
        projectData={projectData}
        onProjectDataChange={setProjectData}
      />
    </div>
  );
}

export default App;
