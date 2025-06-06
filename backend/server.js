import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running 🚀" });
});

app.post("/api/captions/generate", (req, res) => {
  const mockCaptions = [
    { start: 0, end: 2, text: "Welcome to Lala AI Studio!" },
    { start: 2, end: 4, text: "Your AI caption generator." },
  ];
  res.json({ captions: mockCaptions });
});

app.post("/api/captions/effects", (req, res) => {
  const { captions } = req.body;
  const effected = captions.map((cap) => ({
    ...cap,
    text: cap.text.toUpperCase(),
  }));
  res.json({ captions: effected });
});

app.post("/api/captions/save", (req, res) => {
  console.log("Saving project:", req.body);
  res.json({ success: true });
});

app.get("/api/captions/export", (req, res) => {
  const captions = [
    { start: 0, end: 2, text: "Exported Caption 1" },
    { start: 2, end: 4, text: "Exported Caption 2" },
  ];
  res.setHeader("Content-Disposition", "attachment; filename=captions.json");
  res.json(captions);
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
