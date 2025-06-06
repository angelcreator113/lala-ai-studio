import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 3000;
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is healthy 🚀" });
});

app.post("/api/captions/align", (req, res) => {
  const projectData = req.body;
  console.log("AI Align requested", projectData);
  // Mock: shift captions by +0.5 sec
  const aligned = projectData.captions.map((cap) => ({
    ...cap,
    start: cap.start + 0.5,
    end: cap.end + 0.5,
  }));
  res.json({ captions: aligned });
});

app.post("/api/captions/split-merge", (req, res) => {
  const projectData = req.body;
  console.log("AI Split/Merge requested", projectData);
  // Mock: no-op for now
  res.json({ captions: projectData.captions });
});

app.post("/api/captions/import", upload.single("file"), (req, res) => {
  console.log("Import captions file", req.file);
  // Mock: return sample captions
  const imported = [
    { start: 0, end: 2, text: "Imported caption 1" },
    { start: 3, end: 5, text: "Imported caption 2" },
  ];
  res.json({ captions: imported });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
