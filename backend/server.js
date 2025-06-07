// server.js

import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Make sure project-data folder exists
const PROJECT_FILE = "./backend/project-data/project.json";
fs.mkdirSync("./backend/project-data", { recursive: true });

// Save project
app.post("/api/project/save", (req, res) => {
  const { projectData } = req.body;
  try {
    fs.writeFileSync(PROJECT_FILE, JSON.stringify(projectData, null, 2));
    res.json({ status: "ok", message: "Project saved!" });
  } catch (err) {
    console.error("Error saving project:", err);
    res.status(500).json({ status: "error", message: "Failed to save project." });
  }
});

// Load project
app.get("/api/project/load", (req, res) => {
  try {
    if (fs.existsSync(PROJECT_FILE)) {
      const data = JSON.parse(fs.readFileSync(PROJECT_FILE));
      res.json({ status: "ok", data, fileName: "My Project" });
    } else {
      res.status(404).json({ status: "error", message: "No project found." });
    }
  } catch (err) {
    console.error("Error loading project:", err);
    res.status(500).json({ status: "error", message: "Failed to load project." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
