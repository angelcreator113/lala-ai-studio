// backend/server.js

import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Project storage paths
const PROJECT_DIR = "./backend/project-data";
const PROJECT_FILE = path.join(PROJECT_DIR, "project.json");
const VERSIONS_DIR = path.join(PROJECT_DIR, "versions");

// Ensure folders exist
if (!fs.existsSync(PROJECT_DIR)) {
  fs.mkdirSync(PROJECT_DIR, { recursive: true });
}
if (!fs.existsSync(VERSIONS_DIR)) {
  fs.mkdirSync(VERSIONS_DIR, { recursive: true });
}

// ✅ Save project
app.post("/api/project/save", (req, res) => {
  const { projectData } = req.body;
  try {
    fs.writeFileSync(PROJECT_FILE, JSON.stringify(projectData, null, 2));

    // Also save versioned backup
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const versionFile = path.join(VERSIONS_DIR, `project-${timestamp}.json`);
    fs.writeFileSync(versionFile, JSON.stringify(projectData, null, 2));

    res.json({ status: "ok", message: "Project saved!" });
  } catch (error) {
    console.error("Error saving project:", error);
    res.status(500).json({ status: "error", message: "Failed to save project." });
  }
});

// ✅ Load project
app.get("/api/project/load", (req, res) => {
  try {
    if (fs.existsSync(PROJECT_FILE)) {
      const data = JSON.parse(fs.readFileSync(PROJECT_FILE, "utf-8"));
      res.json({ status: "ok", data, fileName: "My Project" });
    } else {
      res.status(404).json({ status: "error", message: "No project found." });
    }
  } catch (error) {
    console.error("Error loading project:", error);
    res.status(500).json({ status: "error", message: "Failed to load project." });
  }
});

// ✅ List available project versions
app.get("/api/project/versions", (req, res) => {
  try {
    const files = fs.readdirSync(VERSIONS_DIR).filter(file => file.endsWith(".json"));
    const versions = files.map(file => ({
      file,
      date: file.replace("project-", "").replace(".json", "").replace(/-/g, ":")
    }));
    res.json({ status: "ok", versions });
  } catch (error) {
    console.error("Error listing versions:", error);
    res.status(500).json({ status: "error", message: "Failed to list versions." });
  }
});

// ✅ Load specific version
app.get("/api/project/version/:fileName", (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(VERSIONS_DIR, fileName);
  try {
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      res.json({ status: "ok", data, fileName });
    } else {
      res.status(404).json({ status: "error", message: "Version not found." });
    }
  } catch (error) {
    console.error("Error loading version:", error);
    res.status(500).json({ status: "error", message: "Failed to load version." });
  }
});

// Start server 🚀
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
  res.send("<h1>🎬 Lala AI Studio Backend API</h1><p>Use /api/project/... endpoints.</p>");
});
