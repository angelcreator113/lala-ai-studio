import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend running 🚀" });
});

// Save Project
app.post("/api/project/save", (req, res) => {
  const projectData = req.body;
  const filePath = path.join("backend/project-data/project.json");

  fs.writeFileSync(filePath, JSON.stringify(projectData, null, 2));
  res.json({ status: "success", message: "Project saved!" });
});

// Load Project
app.get("/api/project/load", (req, res) => {
  const filePath = path.join("backend/project-data/project.json");

  if (fs.existsSync(filePath)) {
    const project = JSON.parse(fs.readFileSync(filePath));
    res.json(project);
  } else {
    res.json({ videoFile: "", captions: [] });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
